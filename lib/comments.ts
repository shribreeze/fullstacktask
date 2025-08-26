export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  parentId?: string;
  replies: Comment[];
}

const comments: Comment[] = [
  {
    id: '1',
    author: 'Sam Gautam',
    content: 'This is a great article! Thanks for sharing.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    replies: [
      {
        id: '2',
        author: 'Sammy',
        content: 'I totally agree! Very informative.',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        parentId: '1',
        replies: [
          {
            id: '3',
            author: 'Sameer',
            content: 'Yes, especially the part about nested comments!',
            timestamp: new Date(Date.now() - 2400000).toISOString(),
            parentId: '2',
            replies: []
          }
        ]
      }
    ]
  }
];

export function getComments(): Comment[] {
  return comments;
}

export function addComment(author: string, content: string, parentId?: string): Comment {
  const newComment: Comment = {
    id: Date.now().toString(),
    author,
    content,
    timestamp: new Date().toISOString(),
    parentId,
    replies: []
  };

  if (parentId) {
    addReplyToComment(comments, parentId, newComment);
  } else {
    comments.push(newComment);
  }

  return newComment;
}

function addReplyToComment(commentList: Comment[], parentId: string, reply: Comment): boolean {
  for (const comment of commentList) {
    if (comment.id === parentId) {
      comment.replies.push(reply);
      return true;
    }
    if (addReplyToComment(comment.replies, parentId, reply)) {
      return true;
    }
  }
  return false;
}