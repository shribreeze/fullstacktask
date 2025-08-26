interface RateLimitData {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const data = rateLimitMap.get(ip);

  if (!data || now > data.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });
    return { success: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  if (data.count >= limit) {
    return { success: false, remaining: 0, resetTime: data.resetTime };
  }

  data.count++;
  return { success: true, remaining: limit - data.count, resetTime: data.resetTime };
}

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60000);