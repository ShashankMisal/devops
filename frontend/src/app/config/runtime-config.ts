type EnvConfig = {
  API_URL?: string;
  MOCK?: boolean;
};

declare global {
  interface Window {
    __env?: EnvConfig;
  }
}

export function getApiUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://localhost:3000';
  }
  const apiUrl = window.__env?.API_URL?.trim();
  return apiUrl || '/api';
}

export function isMockMode(): boolean {
  return window.__env?.MOCK === true;
}
