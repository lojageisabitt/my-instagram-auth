import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const inputToken = searchParams.get('input_token');
  const appAccessToken = process.env.FACEBOOK_APP_ACCESS_TOKEN;

  if (!inputToken) {
    return NextResponse.json({ status: 400, error: 'Input token is required' });
  }

  try {
    const response = await axios.get(
      `https://graph.facebook.com/debug_token`,
      {
        params: {
          input_token: inputToken,
          access_token: appAccessToken
        }
      }
    );

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: any) {
    console.error('Erro ao decodificar o token de acesso:', error.response?.data || error.message);
    return NextResponse.json({ status: 500, error: 'Erro ao decodificar o token de acesso' });
  }
}
