const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  GITHUB: "github",
};

export function getOAuthLoginUrl(provider = OAUTH_PROVIDERS.GOOGLE) {
  const safeProvider = Object.values(OAUTH_PROVIDERS).includes(provider)
    ? provider
    : OAUTH_PROVIDERS.GOOGLE;

  return `${API_BASE_URL}/auth/oauth/${safeProvider}`;
}

export async function handleOAuthCallbackExchange(searchParams) {
  const code = searchParams?.get("code");
  const state = searchParams?.get("state");
  const error = searchParams?.get("error");

  if (error) {
    throw new Error(`OAuth authentication error: ${error}`);
  }

  if (!code) {
    throw new Error("Missing OAuth authorization code in callback URL.");
  }

  const response = await fetch(`${API_BASE_URL}/auth/oauth/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code, state }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to exchange OAuth callback code.");
  }

  return payload?.data || payload;
}