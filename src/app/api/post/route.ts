import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    console.log('CODE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', code , '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,')

    const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
    const AUTHORIZATION_CODE = process.env.INSTAGRAM_AUTHORIZATION_CODE;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
    const response = await axios.post(
      `https://api.instagram.com/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=${AUTHORIZATION_CODE}&redirect_uri=${REDIRECT_URI}&code=${code}`
    );
    console.log('Response >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response)

    return NextResponse.json({ status: 200, response });
  } catch (error: any) {
    console.error('Erro ao obter o token de acesso:', error);
    return NextResponse.json({ status: 500, error: 'Erro ao obter o token de acesso' });
  }
}
