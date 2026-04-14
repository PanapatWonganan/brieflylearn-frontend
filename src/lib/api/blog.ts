const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  category: string;
  tags: string[];
  published_at: string;
  views_count: number;
  read_time_minutes?: number;
  featured?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export async function fetchBlogPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<BlogPost[]>> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${API_BASE}/blog/posts${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.posts || Array.isArray(result)) {
      return { data: result.posts || result };
    } else {
      return { error: 'No blog posts data received' };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts'
    };
  }
}

export async function fetchBlogPost(slug: string): Promise<ApiResponse<BlogPost>> {
  try {
    const response = await fetch(`${API_BASE}/blog/posts/${slug}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch blog post'
    };
  }
}

export async function fetchBlogCategories(): Promise<ApiResponse<{ id: string; name: string; count: number }[]>> {
  try {
    const response = await fetch(`${API_BASE}/blog/categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.categories || Array.isArray(result)) {
      return { data: result.categories || result };
    } else {
      return { error: 'No categories data received' };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch blog categories'
    };
  }
}
