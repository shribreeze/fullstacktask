import { NextRequest, NextResponse } from 'next/server';
import { getComments, addComment } from '@/lib/comments';

export async function GET() {
  const comments = getComments();
  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  try {
    const { author, content, parentId } = await request.json();
    
    if (!author || !content) {
      return NextResponse.json(
        { error: 'Author and content are required' },
        { status: 400 }
      );
    }

    const newComment = addComment(author, content, parentId);
    return NextResponse.json(newComment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}