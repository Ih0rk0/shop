"use client"
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


const ProductView = ({ params }: {
  params: { id: string }
}) => {

  const product = useSelector((state: RootState) =>
    state.products.products.find((prod:any) => prod.id.toString() === params.id)
  );
  const pod = useSelector((state: RootState) => state.products.products)
  console.log(pod)
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    
    <div>
      <h1>{product.name}</h1>
      <p>Count: {product.count}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductView;
