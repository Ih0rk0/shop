"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../products/productSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Product {
  id: number;
  name: string;
  count: number;
  price: number;
  description: string;
}

const EditProductModal: React.FC<{ product: Product }> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [count, setCount] = useState(product.count);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProduct = () => {
    if (name && count > 0 && price > 0) {
      // Normally, we'd dispatch an updateProduct action here
      handleClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
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
          <Button onClick={handleEditProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProductModal;
