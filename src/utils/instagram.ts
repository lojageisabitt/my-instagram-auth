import axios from 'axios';

interface UserProfile {
  id: string;
  username: string;
  profile_picture_url: string;
}

export const getUserProfile = async (accessToken: string): Promise<UserProfile> => {
  const fields = 'id,username,account_type,media_count,profile_picture_url';
  const url = `https://graph.instagram.com/me?fields=${fields}&access_token=${accessToken}`;
  try {
    const response = await axios.get<UserProfile>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    throw error;
  }
};