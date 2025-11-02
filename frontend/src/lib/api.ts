// src/lib/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Log the backend URL to confirm the environment variable is working
console.log("✅ Backend API Base URL:", API_BASE_URL);

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error ${response.status}: ${text}`);
  }

  return response.json();
}
