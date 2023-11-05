import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const tasks = await kv.hgetall('tasks');
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { tasks } = await request.json();
  await kv.hset('tasks', tasks );
  return NextResponse.json({ tasks });
}