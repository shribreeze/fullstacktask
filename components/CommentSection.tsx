'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/lib/comments';

interface CommentFormProps {
  onSubmit: (author: string, content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

function CommentForm({ onSubmit, placeholder = "Write a comment...", buttonText = "Post Comment" }: CommentFormProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      onSubmit(author.trim(), content.trim());
      setAuthor('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
}

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, author: string, content: string) => void;
  depth?: number;
}

function CommentItem({ comment, onReply, depth = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (author: string, content: string) => {
    onReply(comment.id, author, content);
    setShowReplyForm(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-600 pl-4' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{comment.author}</h4>
          <span className="text-sm text-gray-500">
            {new Date(comment.timestamp).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-800 dark:text-gray-200 mb-3">{comment.content}</p>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-blue-500 hover:underline"
        >
          Reply
        </button>
        
        {showReplyForm && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-md">
            <CommentForm
              onSubmit={handleReply}
              placeholder="Write a reply..."
              buttonText="Post Reply"
            />
          </div>
        )}
      </div>
      
      {comment.replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onReply={onReply}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (author: string, content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content })
      });
      
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const addReply = async (parentId: string, author: string, content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content, parentId })
      });
      
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
        <CommentForm onSubmit={addComment} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={addReply}
            />
          ))
        )}
      </div>
    </div>
  );
}