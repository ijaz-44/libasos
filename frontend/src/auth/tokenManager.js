const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

let accessToken = null;
let refreshPromise = null;
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener(accessToken);
    } catch {
      // Ignore subscriber errors
    }
  });
}

export const tokenManager = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token) {
    accessToken = token || null;
    notifyListeners();
  },

  clearAccessToken() {
    accessToken = null;
    notifyListeners();
  },

  hasAccessToken() {
    return Boolean(accessToken);
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  async refreshAccessToken() {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          this.clearAccessToken();
          return null;
        }

        const data = await res.json();
        const nextToken = data?.accessToken || data?.data?.accessToken || null;
        this.setAccessToken(nextToken);
        return nextToken;
      } catch {
        this.clearAccessToken();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  },
};