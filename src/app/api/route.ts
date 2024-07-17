import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    // Trocar o código pelo token de acesso
    const tokenResponse = await axios.post(`https://api.instagram.com/oauth/access_token`, null, {
      params: {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;

    // Obter dados do usuário
    const userResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
      params: {
        fields: 'id,username,account_type,media_count',
        access_token: accessToken,
      },
    });

    res.status(200).json(userResponse.data);
  } catch (error) {
    console.error('Erro na autenticação do Instagram:', error);
    res.status(500).json({ error: 'Erro na autenticação do Instagram' });
  }
};

export default handler;
