import { NextResponse } from 'next/server';

let products: any[] = [];

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();

  const index = products.findIndex(p => p.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  products[index] = { ...body, id };
  return NextResponse.json(products[index]);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  products = products.filter(p => p.id !== id);
  return NextResponse.json({ id });
}
