'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPaymentStatus, type PaymentStatusResponse } from '@/lib/api/payments';

type StashedCheckout = {
  order_no?: string;
  course_id?: string;
  ts?: number;
};

function readStashedCheckout(): StashedCheckout | null {
  try {
    const raw = localStorage.getItem('pending_checkout');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StashedCheckout;
    // Drop entries older than 60 minutes to avoid stale auto-redirects.
    if (parsed.ts && Date.now() - parsed.ts > 60 * 60 * 1000) {
      localStorage.removeItem('pending_checkout');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function PaymentFailedInner() {
  const router = useRouter();
  const params = useSearchParams();
  const queryOrderNo = params?.get('order_no') ?? '';
  const reason = params?.get('reason') ?? '';

  const [resolvedOrderNo, setResolvedOrderNo] = useState<string>(queryOrderNo);
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [checking, setChecking] = useState<boolean>(true);

  // Fallback: if Paysolutions redirected here with no order_no, use the value
  // we stashed in localStorage at checkout time so we can still look up the
  // authoritative backend status.
  useEffect(() => {
    if (queryOrderNo) {
      setResolvedOrderNo(queryOrderNo);
      return;
    }
    const stash = readStashedCheckout();
    if (stash?.order_no) {
      setResolvedOrderNo(stash.order_no);
    } else {
      setChecking(false);
    }
  }, [queryOrderNo]);

  // Poll the backend (short window) and auto-redirect to /payments/success
  // once the enrollment is actually completed. This covers the case where the
  // hosted page redirected to /failed but the server-to-server postback did
  // in fact mark the payment as paid.
  useEffect(() => {
    if (!resolvedOrderNo) return;
    let cancelled = false;
    setChecking(true);
    async function poll(attempt = 0) {
      const res = await getPaymentStatus(resolvedOrderNo);
      if (cancelled) return;
      setData(res);
      if (res.enrollment?.payment_status === 'completed') {
        try {
          localStorage.removeItem('pending_checkout');
        } catch {
          // ignore
        }
        router.replace(`/payments/success?order_no=${encodeURIComponent(resolvedOrderNo)}`);
        return;
      }
      if (attempt >= 4) {
        setChecking(false);
        return;
      }
      setTimeout(() => poll(attempt + 1), 2500);
    }
    poll();
    return () => {
      cancelled = true;
    };
  }, [resolvedOrderNo, router]);

  const courseId = data?.enrollment?.course_id ?? data?.enrollment?.course?.id;
  const orderNo = resolvedOrderNo;

  // While we're still verifying with the backend, render a neutral
  // "กำลังตรวจสอบสถานะ" state instead of telling the user the payment failed —
  // the postback may still be in flight and we don't want to panic the user.
  if (checking && resolvedOrderNo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
        <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <h1 className="text-heading font-semibold text-ink mb-2">กำลังตรวจสอบสถานะการชำระเงิน</h1>
          <p className="text-sm text-ink-muted">กรุณารอสักครู่ ระบบกำลังยืนยันกับธนาคาร...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
      <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-light flex items-center justify-center">
          <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-heading font-semibold text-ink mb-2">การชำระเงินไม่สำเร็จ</h1>
        <p className="text-sm text-ink-muted mb-6">
          ขออภัย เราไม่สามารถดำเนินการชำระเงินของคุณได้ กรุณาลองอีกครั้ง
        </p>

        <div className="text-left bg-sand-50 rounded-sm p-4 mb-6 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-ink-muted">หมายเลขคำสั่งซื้อ</span>
            <span className="font-mono">{orderNo || '-'}</span>
          </div>
          {reason && (
            <div className="flex justify-between py-1">
              <span className="text-ink-muted">เหตุผล</span>
              <span>{reason}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {courseId && (
            <Link href={`/courses/${courseId}/checkout`} className="btn-primary inline-block w-full">
              ลองชำระอีกครั้ง
            </Link>
          )}
          <Link href="/courses" className="btn-secondary inline-block w-full">
            กลับไปหน้าคอร์ส
          </Link>
        </div>
      </div>
    </div>
  );
}

function PaymentFailedFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
      <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
        <p className="text-sm text-ink-muted">กำลังโหลด...</p>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedFallback />}>
      <PaymentFailedInner />
    </Suspense>
  );
}
