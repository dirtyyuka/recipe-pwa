import User from '@/app/models/user';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await dbConnect();

  //authenticate user
  const token = req.headers.get('Authorization')?.split(' ')[1];

  const response = await fetch('http://localhost:3000/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = await response.json();
  const { decoded } = data;

  if (!decoded || typeof decoded !== 'object') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }

  const { userId } = decoded;

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const recipeIds = user.savedPosts;

  if (!recipeIds || !recipeIds.length) {
    return NextResponse.json({ message: 'No recipes found' }, { status: 404 });
  }

  return NextResponse.json({ recipeIds });
}
