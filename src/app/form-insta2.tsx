"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  username: string;
}

export default function InstagramAuth2() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  const AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await axios.post("/api/post", { code });
      console.log(response.data);
      setAccessToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Erro ao obter o token de acesso:", error);
      return null;
    }
  };

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get("/api/getUser", {
        params: { accessToken },
      });
      console.log("resposta", response);
      console.log("perfiil do usuario", response.data.data);
      return setUserData(response.data.data);
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
      {!userData ? (
        <>
          <h1>Instagram Auth</h1>
          <a href={AUTH_URL}>Login with Instagram</a>
        </>
      ) : (
        <div>
          <h2>Bem Vindo</h2>
          <p>{userData.id}</p>
          <p>{userData.username}</p>
        </div>
      )}
    </div>
  );
}
