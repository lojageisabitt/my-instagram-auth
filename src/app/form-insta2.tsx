"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InstagramAuth2() {
  const [userData, setUserData] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  const AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await axios.post(
        `https://api.instagram.com/oauth/access_token`,
        new URLSearchParams({
          client_id: CLIENT_ID!,
          client_secret: CLIENT_SECRET!,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI!,
          code: code,
        })
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Erro ao obter o token de acesso:", error);
      return null;
    }
  };

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get(`https://graph.instagram.com/me`, {
        params: {
          fields: "id,username,account_type,media_count,profile_picture_url",
          access_token: accessToken,
        },
      });
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao obter os dados do usuário:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetchAccessToken(code).then((accessToken) => {
        if (accessToken) {
          fetchUserData(accessToken);
        }
      });
    }
  }, []);

  return (
    <div>
      <h1>Instagram Auth</h1>
      {!userData ? (
        <a href={AUTH_URL}>Login with Instagram</a>
      ) : (
        <div>
          <h2>Welcome</h2>
          <p>{JSON.stringify(userData)}</p>
          <img src={"userData!.profile_picture_url"} alt="Profile Picture" />
        </div>
      )}
    </div>
  );
}
