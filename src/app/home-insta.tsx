"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/instagram";

interface UserProfile {
  id: string;
  username: string;
  profile_picture_url: string;
}

export default function HomeInsta() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
        if (accessToken) {
          const userProfile = await getUserProfile(accessToken);
          setProfile(userProfile);
        } else {
          setError("Access token is not set");
        }
      } catch (error) {
        setError("Failed to fetch Instagram profile.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Instagram Profile</h1>
      <p>ID: {profile.id}</p>
      <p>Username: {profile.username}</p>
      <p>Username: {profile.profile_picture_url}</p>
    </div>
  );
}
