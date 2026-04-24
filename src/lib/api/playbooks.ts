const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

function authToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || localStorage.getItem('boostme_token');
}

export interface PlaybookSummary {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  price: string | number;
  original_price: string | number | null;
  rating: string | number | null;
  total_students: number | null;
  content_type: 'playbook';
}

export interface PlaybookDetail {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  price: string | number;
  original_price: string | number | null;
  content_type: 'playbook';
  user_has_paid_access: boolean;
  lesson: {
    id: string;
    title: string;
    /** Only present when user_has_paid_access === true */
    html_content: string | null;
  } | null;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Public list of published playbooks.
 */
export async function fetchPlaybooks(): Promise<PlaybookSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/playbooks`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiEnvelope<PlaybookSummary[]>;
    return data.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Playbooks the authenticated user has paid for. Auth required.
 */
export interface OwnedPlaybook {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  content_type: 'playbook';
}

export async function fetchMyPlaybooks(): Promise<OwnedPlaybook[]> {
  const token = authToken();
  if (!token) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/playbooks/my`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiEnvelope<OwnedPlaybook[]>;
    return data.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Single playbook with gating. Sends Bearer token when available so the API
 * can return html_content to paid users.
 */
export async function fetchPlaybook(id: string): Promise<PlaybookDetail | null> {
  const token = authToken();
  try {
    const res = await fetch(`${API_BASE_URL}/playbooks/${encodeURIComponent(id)}`, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ApiEnvelope<PlaybookDetail>;
    return data.data ?? null;
  } catch {
    return null;
  }
}
