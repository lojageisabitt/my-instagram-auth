"use client";

import React from "react";

const InstagramAuth = () => {
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&scope=user_profile&response_type=code&version=${process.env.INSTAGRAM_API_VERSION}`;

  return (
    <div>
      <h1>Instagram Auth</h1>
      <a href={instagramAuthUrl}>Login with Instagram</a>
    </div>
  );
};

export default InstagramAuth;
