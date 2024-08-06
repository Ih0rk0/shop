"use client"
import ProductView from './[id]/page';
import { Provider } from 'react-redux';
import { store } from './store';
import AddProductModal from "@/components/AddProductModal";
import ProductList from "@/components/ProductList";
import CommentSection from "@/components/CommentSection";
import EditProductModal from "@/components/EditProductModal";
export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProductList></ProductList>
        <CommentSection></CommentSection>

      </main>
    </Provider>
  );
}
