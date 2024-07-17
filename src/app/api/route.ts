import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Trocar o código pelo token de acesso
    const tokenResponse = await axios.post(`https://api.instagram.com/${process.env.INSTAGRAM_API_VERSION}/oauth/IGQWRORzc4T3BKelMyZAUYxTEcxMHhfZAE9mZAnJBaUhFNUlWblVrZADdpcXlVbzkxa3ZAyVXgzZAEo5amxlTWZA1QUFCc25LSG10RVdlVjhDTEU5am9LSkg1Y09kbGJ0WlRTdEdxLVZAfcHhOb0dvaWxWMExWWE54RnJUM0kZD`, null, {
        params: {
          client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
          grant_type: 'IGQWRORzc4T3BKelMyZAUYxTEcxMHhfZAE9mZAnJBaUhFNUlWblVrZADdpcXlVbzkxa3ZAyVXgzZAEo5amxlTWZA1QUFCc25LSG10RVdlVjhDTEU5am9LSkg1Y09kbGJ0WlRTdEdxLVZAfcHhOb0dvaWxWMExWWE54RnJUM0kZD',
          redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
          code,
        },
      });

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;

    // Obter dados do usuário
    const userResponse = await axios.get(`https://graph.instagram.com/${process.env.INSTAGRAM_API_VERSION}/${userId}`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken,
        },
      });

    return NextResponse.json(userResponse.data);
  } catch (error) {
    console.error('Erro na autenticação do Instagram:', error);
    return NextResponse.json({ error: 'Erro na autenticação do Instagram' }, { status: 500 });
  }
}
