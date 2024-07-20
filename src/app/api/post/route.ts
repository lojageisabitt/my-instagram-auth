import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    console.log('CODE >>>>>>>>>>>>>>>>>>>>>>', code);

    const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;

    const response = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI!,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Response >>>>>>>>>>>>>>>>>>>>>>', response.data);

    return NextResponse.json({ status: 200, access_token: response.data.access_token });
  } catch (error: any) {
    console.error('Erro ao obter o token de acesso:', error.response?.data || error.message);
    return NextResponse.json({ status: 500, error: 'Erro ao obter o token de acesso' });
  }
}
