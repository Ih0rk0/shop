"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addProduct } from '../products/productSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const AddProductModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    if (name && count > 0 && price > 0) {
      dispatch(addProduct({ id: Date.now().toString(), name, count, price, description }));
      handleClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Count"
            type="number"
            fullWidth
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductModal;
