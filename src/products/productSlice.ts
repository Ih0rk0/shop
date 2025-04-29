import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типи
interface Product {
  id: number;
  name: string;
  count: number;
  price: number;
  description: string;
}

interface Comment {
  id: number;
  productId: number;
  content: string;
}

interface ProductsState {
  products: Product[];
  comments: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Початковий стейт
const initialState: ProductsState = {
  products: [],
  comments: [],
  status: 'idle',
  error: null,
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Додавання продукту
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    // Редагування продукту
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Видалення продукту
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },

    // Додавання коментаря
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    // Видалення коментаря
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },

    // (опційно) Ініціалізація продуктів локально
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.status = 'succeeded';
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  addComment,
  deleteComment,
  setProducts,
} = productSlice.actions;

export default productSlice.reducer;
