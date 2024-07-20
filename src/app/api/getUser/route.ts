import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ status: 400, error: 'Access token is required' });
  }
  const URL_Destino = `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`
  console.log(URL_Destino)

  try {
    const response = await axios.get(URL_Destino)
    console.log(response.data)
    return NextResponse.json({ status: 200, data: response });
  } catch (error: any) {
    console.error('Erro ao obter os dados do usuário:', error);
    return NextResponse.json({ status: 500, error: 'Erro ao obter os dados do usuário', errorMessage: error });
  }
}