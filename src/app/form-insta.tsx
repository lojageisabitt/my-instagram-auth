"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InstagramAuth() {
  const [userData, setUserData] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  const AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

  const fetchAccessToken = async (code: any) => {
    try {
      const response = await axios.post("/api", { code });
      console.log("fetchAccessToken response try:", response);

      if (response.status === 200) {
        console.log("fetchAccessToken response if 200:", response);
        return response.data.access_token;
      } else {
        throw new Error("Erro inesperado na resposta do servidor");
      }
    } catch (error) {
      console.error("Erro ao obter o token de acesso:", error);
      return null;
    }
  };

  const fetchUserData = async (accessToken: any) => {
    try {
      const response = await axios.get(`https://graph.instagram.com/v20.0/me`, {
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
          <img src={"userData.profile_picture_url"} alt="Profile Picture" />
        </div>
      )}
    </div>
  );
}
