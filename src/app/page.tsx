export default function Home() {
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&scope=user_profile&response_type=code`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Instagram Auth</h1>
        <a href={instagramAuthUrl}>Login with Instagram</a>
      </div>
    </main>
  );
}
