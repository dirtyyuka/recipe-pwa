import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Named export for the POST request method
export async function POST(req: NextRequest) {
  await dbConnect(); // Establish connection to the database

  const { email, password } = await req.json(); // Parse the JSON body

  // Validate the request body
  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
    );

    // Return success response
    return NextResponse.json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
