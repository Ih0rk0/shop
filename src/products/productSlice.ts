import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your Product and Comment types
interface Product {
  id: string;
  name: string;
  count: number;
  price: number;
  description: string;
}

interface Comment {
  id: string;
  productId: number;
  content: string;
}

// Define the initial state
interface ProductsState {
  products: Product[];
  comments: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  comments: [],
  status: 'idle',
  error: null,
};

// Create async thunks for CRUD operations
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
  const response = await axios.post('http://localhost:5000/products', product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await axios.delete(`http://localhost:5000/products/${id}`);
  return id;
});

export const addComment = createAsyncThunk('products/addComment', async (comment: Comment) => {
  const response = await axios.post('http://localhost:5000/comments', comment);
  return response.data;
});

export const deleteComment = createAsyncThunk('products/deleteComment', async (id: string) => {
  await axios.delete(`http://localhost:5000/comments/${id}`);
  return id;
});

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
