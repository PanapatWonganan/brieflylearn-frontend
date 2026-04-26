const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

function authToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || localStorage.getItem('boostme_token');
}

export interface GroupSummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  type: 'coaching' | 'community' | 'cohort';
}

export interface GroupResource {
  label: string;
  url: string;
}

export interface GroupDetail {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  type: 'coaching' | 'community' | 'cohort';
  zoom_link: string | null;
  meeting_schedule: string | null;
  resources: GroupResource[];
  max_members: number | null;
  members_count: number;
  membership: {
    role: 'member' | 'admin';
    joined_at: string | null;
  };
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Groups the authenticated user is an active member of.
 */
export async function fetchMyGroups(): Promise<GroupSummary[]> {
  const token = authToken();
  if (!token) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/groups/my`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiEnvelope<GroupSummary[]>;
    return data.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Single group by slug. Returns null on 403 (not a member) / 404 (no such group).
 */
export async function fetchGroup(slug: string): Promise<GroupDetail | null> {
  const token = authToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/groups/${encodeURIComponent(slug)}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ApiEnvelope<GroupDetail>;
    return data.data ?? null;
  } catch {
    return null;
  }
}
