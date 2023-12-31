import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const tasks = await kv.hgetall('tasks');
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  await kv.hset('tasks', body );
  return NextResponse.json({ body });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log(body);
  await kv.hdel('tasks', body.id );
  return NextResponse.json({ body });
}