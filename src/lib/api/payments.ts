const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

function authToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || localStorage.getItem('boostme_token');
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
  enrollment?: {
    id: string;
    course_id: string;
    payment_status: string;
    order_no?: string;
  };
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
 */
export async function startPaysolutionsCheckout(courseId: string): Promise<CheckoutResponse> {
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
      body: JSON.stringify({ course_id: courseId }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'ไม่สามารถเริ่มการชำระเงินได้' };
    }
    return data as CheckoutResponse;
  } catch (e) {
    return { success: false, message: 'Network error' };
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
