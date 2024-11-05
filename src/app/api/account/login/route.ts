import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/app/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  // connect to db
  await dbConnect();

  // parse the JSON body
  const { email, password } = await req.json();

  // validate the request body
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' });
  }

  // check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User does not exist' });
  }

  // check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ message: 'Invalid credentials' });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ message: 'JWT secret not found' });
  }

  // generate a JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );

  // return the token
  return NextResponse.json({ token });
}
