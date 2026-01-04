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
  return window.__env?.API_URL || 'http://localhost:3000';
}

export function isMockMode(): boolean {
  return window.__env?.MOCK === true;
}
