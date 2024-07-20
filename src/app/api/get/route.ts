import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ status: 400, error: 'Access token is required' });
  }

  try {
    const response = await axios.get('https://graph.instagram.com/me', {
      params: {
        fields: 'id,username,account_type,media_count,profile_picture_url',
        access_token: accessToken,
      },
    });
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error: any) {
    console.error('Erro ao obter os dados do usuário:', error);
    return NextResponse.json({ status: 500, error: 'Erro ao obter os dados do usuário' });
  }
}