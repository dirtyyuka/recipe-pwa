import User from '@/app/models/user';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // connect to db
  await dbConnect();

  // extract the recipe ID
  const { id } = await req.json();

  // handle missing recipe ID
  if (!id) {
    return NextResponse.json(
      { message: 'Recipe ID is required' },
      { status: 400 },
    );
  }

  // authenticate user
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // extract userId
  const response = await fetch('http://localhost:3000/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 },
    );
  }

  const data = await response.json();
  const { decoded } = data;

  if (!decoded || typeof decoded !== 'object') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { userId } = decoded;

  // save recipe
  const result = await User.updateOne(
    { _id: userId },
    { $push: { savedPosts: id } },
  );

  if (!result.acknowledged) {
    return NextResponse.json(
      { message: 'Failed to save recipe' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Recipe saved' }, { status: 200 });
}
