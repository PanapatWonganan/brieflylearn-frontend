'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
    if (parsed.ts && Date.now() - parsed.ts > 60 * 60 * 1000) {
      localStorage.removeItem('pending_checkout');
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function PaymentSuccessInner() {
  const params = useSearchParams();
  const queryOrderNo = params?.get('order_no') ?? '';

  const [orderNo, setOrderNo] = useState<string>(queryOrderNo);
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback to stashed checkout if the hosted page dropped the refno.
  useEffect(() => {
    if (queryOrderNo) {
      setOrderNo(queryOrderNo);
      return;
    }
    const stash = readStashedCheckout();
    if (stash?.order_no) {
      setOrderNo(stash.order_no);
    } else {
      setLoading(false);
    }
  }, [queryOrderNo]);

  useEffect(() => {
    if (!orderNo) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function poll(attempt = 0) {
      const res = await getPaymentStatus(orderNo);
      if (cancelled) return;
      setData(res);

      const status = res.enrollment?.payment_status;
      if (status === 'completed') {
        try {
          localStorage.removeItem('pending_checkout');
        } catch {
          // ignore
        }
        setLoading(false);
        return;
      }
      if (attempt >= 6) {
        setLoading(false);
        return;
      }
      setTimeout(() => poll(attempt + 1), 2000);
    }
    poll();
    return () => {
      cancelled = true;
    };
  }, [orderNo]);

  const enrollment = data?.enrollment;
  const courseId = enrollment?.course_id ?? enrollment?.course?.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
      <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-heading font-semibold text-ink mb-2">ชำระเงินสำเร็จ</h1>
        <p className="text-sm text-ink-muted mb-6">
          ขอบคุณที่ร่วมเรียนกับ BrieflyLearn! คุณสามารถเริ่มเรียนได้ทันที
        </p>

        <div className="text-left bg-sand-50 rounded-sm p-4 mb-6 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-ink-muted">หมายเลขคำสั่งซื้อ</span>
            <span className="font-mono">{orderNo || '-'}</span>
          </div>
          {enrollment?.course?.title && (
            <div className="flex justify-between py-1">
              <span className="text-ink-muted">คอร์ส</span>
              <span>{enrollment.course.title}</span>
            </div>
          )}
          {enrollment?.amount_paid && (
            <div className="flex justify-between py-1">
              <span className="text-ink-muted">ยอดที่ชำระ</span>
              <span>฿{Number(enrollment.amount_paid).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-ink-muted">สถานะ</span>
            <span className={enrollment?.payment_status === 'completed' ? 'text-brand-700' : 'text-warning'}>
              {loading
                ? 'กำลังตรวจสอบ...'
                : enrollment?.payment_status === 'completed'
                ? 'ชำระแล้ว'
                : enrollment?.payment_status ?? 'ไม่ทราบ'}
            </span>
          </div>
        </div>

        {courseId ? (
          <Link href={`/courses/${courseId}`} className="btn-primary inline-block w-full">
            เริ่มเรียนเลย
          </Link>
        ) : (
          <Link href="/dashboard" className="btn-primary inline-block w-full">
            ไปยังแดชบอร์ด
          </Link>
        )}
      </div>
    </div>
  );
}

function PaymentSuccessFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
      <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
        <p className="text-sm text-ink-muted">กำลังตรวจสอบการชำระเงิน...</p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
