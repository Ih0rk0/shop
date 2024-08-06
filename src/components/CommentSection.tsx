"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addComment, deleteComment } from '../products/productSlice';
import { AppDispatch } from '../app/store';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Comment {
  id: number;
  productId: number;
  content: string;
}

const CommentSection: React.FC<{ productId: number }> = ({ productId }) => {
  const comments = useSelector((state: RootState) =>
    state.products.comments.filter((c) => c.productId === productId)
  );
  const [commentText, setCommentText] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      dispatch(addComment({ id: Date.now(), productId, content: commentText }));
      setCommentText('');
    }
  };

  const handleDeleteComment = (id: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(id));
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.content} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add a comment"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button onClick={handleAddComment} variant="contained" color="primary" style={{ marginTop: '1em' }}>
        Add Comment
      </Button>
    </div>
  );
};

export default CommentSection;
