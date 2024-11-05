import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: 'Token not found' }, { status: 400 });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'JWT secret not found' },
      { status: 400 },
    );
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded !== 'object') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }
    return NextResponse.json(
      { valid: true, expired: false, decoded },
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ valid: false, expired: true });
    }
    return NextResponse.json({ valid: false, expired: false });
  }
}
