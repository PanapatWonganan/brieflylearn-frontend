'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPaymentStatus, type PaymentStatusResponse } from '@/lib/api/payments';

export default function PaymentFailedPage() {
  const params = useSearchParams();
  const orderNo = params?.get('order_no') ?? '';
  const reason = params?.get('reason') ?? '';

  const [data, setData] = useState<PaymentStatusResponse | null>(null);

  useEffect(() => {
    if (!orderNo) return;
    let cancelled = false;
    (async () => {
      const res = await getPaymentStatus(orderNo);
      if (!cancelled) setData(res);
    })();
    return () => {
      cancelled = true;
    };
  }, [orderNo]);

  const courseId = data?.enrollment?.course_id ?? data?.enrollment?.course?.id;

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
