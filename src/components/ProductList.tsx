"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchProducts, deleteProduct } from '../products/productSlice';
import { Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import CommentSection from './CommentSection';
import { AppDispatch } from '../app/store';
import Link from 'next/link';
const ProductList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const productStatus = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <AddProductModal />
      {productStatus === 'loading' && <div>Loading...</div>}
      {productStatus === 'failed' && <div>{error}</div>}
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            
            <ListItemText
              primary={product.name}
              secondary={`Count: ${product.count} - Price: $${product.price}`}
            />
            <EditProductModal product={product} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product.id)}>
              <DeleteIcon />
            </IconButton>
            <Link href= {`/${product.id}`} style={{margin:'0px 0px 0px 15px'}} >see more</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProductList;
