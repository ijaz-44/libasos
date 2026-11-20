export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  GITHUB: "github",
};

export const getOAuthLoginUrl = (provider) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return `${baseUrl}/auth/oauth/${provider}`;
};

export const handleOAuthCallbackExchange = async (searchParams) => {
  const code = searchParams.get("code");
  const provider = searchParams.get("provider") || "google";

  if (!code) throw new Error("Missing authorization code");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/oauth/${provider}/callback?code=${code}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("OAuth callback verification failed");
  }

  return await response.json();
};