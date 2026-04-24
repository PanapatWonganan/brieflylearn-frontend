'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { startPaysolutionsCheckout } from '@/lib/api/payments';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

/**
 * Playbook checkout — reuses the generic course payment flow. A playbook is
 * just a Course with content_type='playbook' on the backend, so course_id in
 * the payment API = playbook id here.
 */
export default function PlaybookCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const playbookId = String(params?.id ?? '');

  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error' | 'already'>('loading');
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formAction, setFormAction] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!playbookId) return;
      const res = await startPaysolutionsCheckout(playbookId);
      if (cancelled) return;

      if (!res.success) {
        setError(res.message || 'ไม่สามารถเริ่มการชำระเงินได้');
        setStatus('error');
        return;
      }

      if (res.already_paid) {
        setStatus('already');
        setTimeout(() => router.replace(`/playbooks/${playbookId}`), 1500);
        return;
      }

      if (res.free && res.redirect_url) {
        router.replace(res.redirect_url);
        return;
      }

      if (res.url && res.fields) {
        try {
          localStorage.setItem(
            'pending_checkout',
            JSON.stringify({
              order_no: res.order_no ?? res.fields.refno ?? '',
              course_id: playbookId,
              content_type: 'playbook',
              ts: Date.now(),
            })
          );
        } catch {
          // storage disabled — fallback still works via query string
        }
        trackInitiateCheckout(playbookId, Number(res.fields?.total ?? 0));
        setFormAction(res.url);
        setFormFields(res.fields);
        setStatus('redirecting');
      } else {
        setError('ไม่ได้รับข้อมูลช่องทางชำระเงิน');
        setStatus('error');
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [playbookId, router]);

  useEffect(() => {
    if (status === 'redirecting' && formRef.current) {
      formRef.current.submit();
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
      <div className="max-w-md w-full bg-white rounded-sm shadow-card p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-10 h-10 mx-auto mb-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
            <h1 className="text-heading font-semibold text-ink mb-2">
              กำลังเตรียมการชำระเงิน
            </h1>
            <p className="text-sm text-ink-muted">กรุณารอสักครู่...</p>
          </>
        )}

        {status === 'redirecting' && (
          <>
            <div className="w-10 h-10 mx-auto mb-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
            <h1 className="text-heading font-semibold text-ink mb-2">
              กำลังพาไปยังหน้าชำระเงิน
            </h1>
            <p className="text-sm text-ink-muted mb-4">
              ระบบจะเปิดหน้าชำระเงินของ Pay Solutions ให้อัตโนมัติ
            </p>
            {formAction && (
              <form ref={formRef} method="POST" action={formAction}>
                {Object.entries(formFields).map(([k, v]) => (
                  <input key={k} type="hidden" name={k} value={String(v)} />
                ))}
                <button type="submit" className="btn-primary w-full mt-2">
                  ไปยังหน้าชำระเงิน
                </button>
              </form>
            )}
          </>
        )}

        {status === 'already' && (
          <>
            <h1 className="text-heading font-semibold text-ink mb-2">
              คุณซื้อ Playbook นี้แล้ว
            </h1>
            <p className="text-sm text-ink-muted">กำลังพาคุณกลับไปยังหน้า Playbook...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-heading font-semibold text-error mb-2">เกิดข้อผิดพลาด</h1>
            <p className="text-sm text-ink-muted mb-6">{error}</p>
            <Link
              href={`/playbooks/${playbookId}`}
              className="btn-secondary inline-block"
            >
              กลับไปหน้า Playbook
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
