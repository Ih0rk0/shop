import { NextResponse } from 'next/server';

let products: any[] =[
    {
        "id": 1745919449550,
        "name": "d",
        "count": 2,
        "price": 2,
        "description": "2"
      },
      {
        "id": 1745919667499,
        "name": "d",
        "count": 2,
        "price": 2,
        "description": "2"
      }
] ;

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newProduct = { ...body, id: Date.now() };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
