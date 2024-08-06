"use client"
import ProductView from "@/components/ProductView";
import { Provider } from "react-redux";
import store from "../store";
const Id = ({ params }: {
  params: { id: string }
}) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
    <Provider store={store}>
      <ProductView params={params}>

      </ProductView>
    </Provider>

    </div>


  );
};

export default Id;
