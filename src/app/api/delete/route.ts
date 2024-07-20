import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    await axios.delete(`https://graph.instagram.com/v20.0/me?access_token=${accessToken}`);

    return NextResponse.json({ status: 200, message: 'User data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    return NextResponse.json({ status: 500, error: 'Error deleting user data' });
  }
}