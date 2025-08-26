import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'localhost';
  
  const { success, remaining, resetTime } = rateLimit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
        }
      }
    );
  }

  return NextResponse.json(
    { 
      message: 'Request successful',
      timestamp: new Date().toISOString(),
      ip
    },
    {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString()
      }
    }
  );
}