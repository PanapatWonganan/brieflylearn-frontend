const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

function authToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || localStorage.getItem('boostme_token');
}

export interface CheckoutBumpLineItem {
  name: string;
  price: number;
}

export interface CheckoutResponse {
  success: boolean;
  already_paid?: boolean;
  free?: boolean;
  message?: string;
  redirect_url?: string;
  order_no?: string;
  url?: string;
  fields?: Record<string, string>;
  grand_total?: number | null;
  bumps?: CheckoutBumpLineItem[];
  enrollment?: {
    id: string;
    course_id: string;
    payment_status: string;
    order_no?: string;
  };
}

export interface BumpProduct {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  deliverable_type: 'playbook_course' | 'group_membership' | 'manual';
  sort_order: number;
}

export interface PaymentStatusResponse {
  success: boolean;
  message?: string;
  enrollment?: {
    id: string;
    course_id: string;
    order_no: string;
    status: string;
    payment_status: string;
    amount_paid: string | number;
    payment_date: string | null;
    course?: { id: string; title: string; price: string | number };
  };
}

/**
 * Create (or reuse) a pending enrollment and return the hosted-page fields
 * the browser must POST to Pay Solutions.
 *
 * @param courseId   UUID of the course being purchased
 * @param bumpSlugs  Optional list of bump-product slugs the buyer added on
 *                   the checkout page. Backend resolves price + name and
 *                   sums them into Pay Solutions total.
 */
export async function startPaysolutionsCheckout(
  courseId: string,
  bumpSlugs: string[] = []
): Promise<CheckoutResponse> {
  const token = authToken();
  if (!token) return { success: false, message: 'ยังไม่ได้เข้าสู่ระบบ' };

  try {
    const res = await fetch(`${API_BASE_URL}/payments/paysolutions/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        course_id: courseId,
        bump_slugs: bumpSlugs,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'ไม่สามารถเริ่มการชำระเงินได้' };
    }
    return data as CheckoutResponse;
  } catch {
    return { success: false, message: 'Network error' };
  }
}

/**
 * Public — list of order bumps that apply to the given course. Used by
 * checkout + sales pages to render the bump selection UI from real DB
 * data instead of hardcoded mock values.
 */
export async function fetchCourseBumps(courseId: string): Promise<BumpProduct[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/courses/${encodeURIComponent(courseId)}/bumps`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { success: boolean; data: BumpProduct[] };
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function getPaymentStatus(orderNo: string): Promise<PaymentStatusResponse> {
  const token = authToken();
  if (!token) return { success: false, message: 'ยังไม่ได้เข้าสู่ระบบ' };

  try {
    const res = await fetch(
      `${API_BASE_URL}/payments/paysolutions/status?order_no=${encodeURIComponent(orderNo)}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || 'ไม่พบคำสั่งซื้อ' };
    return data as PaymentStatusResponse;
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
}
