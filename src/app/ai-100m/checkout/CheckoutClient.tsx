'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startPaysolutionsCheckout } from '@/lib/api/payments';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

// Shared constants with the sales letter
const PRODUCT_NAME = 'AI ฿100M Blueprint';
const BASE_PRICE = 19900;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
const COURSE_ID_FROM_ENV = process.env.NEXT_PUBLIC_AI100M_COURSE_ID || '';

const PREFILL_KEY = 'ai100m_checkout_prefill';

type BumpKey = 'press' | 'dwy';

/** UI key → backend slug. Backend resolves price + name from the slug. */
const BUMP_META: Record<BumpKey, { label: string; price: number; slug: string }> = {
  press: { label: 'The PRESS Method™ Playbook', price: 1990, slug: 'press-method-playbook' },
  dwy: { label: 'Done-With-You Upgrade', price: 4900, slug: 'dwy-upgrade' },
};

interface Prefill {
  name?: string;
  email?: string;
  phone?: string;
  bumps?: Partial<Record<BumpKey, boolean>>;
}

async function guestSignup(payload: { full_name: string; email: string; phone?: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/guest-signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, source: 'ai-100m' }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.success) {
    return { success: false as const, message: data?.message || 'ไม่สามารถสร้างบัญชีได้' };
  }
  return {
    success: true as const,
    token: data.token as string,
    isNew: !!data.is_new_user,
    user: data.user,
  };
}

async function lookupCourseIdByTitle(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/courses`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    const match = list.find(
      (c: { id: string; title: string }) =>
        c?.title?.includes('AI ฿100M Blueprint') || c?.title?.includes('100M')
    );
    return match?.id ?? null;
  } catch {
    return null;
  }
}

export default function CheckoutClient() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bumps, setBumps] = useState<Record<BumpKey, boolean>>({ press: true, dwy: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [formAction, setFormAction] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<Record<string, string>>({});

  const bumpTotal = useMemo(
    () => (bumps.press ? BUMP_META.press.price : 0) + (bumps.dwy ? BUMP_META.dwy.price : 0),
    [bumps]
  );
  const grandTotal = BASE_PRICE + bumpTotal;

  // Pre-fill from sale page
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFILL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Prefill;
        if (parsed.name || parsed.email || parsed.phone) {
          setForm((f) => ({
            name: parsed.name ?? f.name,
            email: parsed.email ?? f.email,
            phone: parsed.phone ?? f.phone,
          }));
        }
        if (parsed.bumps) {
          setBumps((b) => ({
            press: parsed.bumps?.press ?? b.press,
            dwy: parsed.bumps?.dwy ?? b.dwy,
          }));
        }
      }
    } catch {
      // ignore malformed prefill
    }
  }, []);

  // Auto-submit hidden form to Pay Solutions when we have the fields
  useEffect(() => {
    if (formAction && formRef.current) {
      formRef.current.submit();
    }
  }, [formAction]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      setError('กรุณากรอกชื่อและอีเมล');
      return;
    }
    // Minimal email shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    setSubmitting(true);
    try {
      // Step 1: Ensure we have an auth token (guest signup if needed)
      let token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || localStorage.getItem('boostme_token')
          : null;

      if (!token) {
        const signup = await guestSignup({
          full_name: name,
          email,
          phone: form.phone.trim() || undefined,
        });
        if (!signup.success) {
          setError(signup.message);
          setSubmitting(false);
          return;
        }
        token = signup.token;
        try {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('boostme_token', token);
        } catch {
          // storage disabled — payments helper won't find the token, bail
          setError('เบราว์เซอร์ไม่รองรับการเก็บข้อมูล กรุณาเปิดใช้ localStorage');
          setSubmitting(false);
          return;
        }
      }

      // Step 2: Resolve course id
      let courseId = COURSE_ID_FROM_ENV;
      if (!courseId) {
        const found = await lookupCourseIdByTitle();
        if (!found) {
          setError(
            'ไม่พบคอร์สในระบบ กรุณาติดต่อทีมงาน (admin ต้องรัน AI100MBlueprintSeeder)'
          );
          setSubmitting(false);
          return;
        }
        courseId = found;
      }

      // Step 3: Start Pay Solutions checkout — pass selected bump slugs so
      // the backend snapshots them as OrderItems and adds them to the total.
      const selectedBumpSlugs = (Object.keys(bumps) as BumpKey[])
        .filter((k) => bumps[k])
        .map((k) => BUMP_META[k].slug);
      const res = await startPaysolutionsCheckout(courseId, selectedBumpSlugs);
      if (!res.success) {
        setError(res.message || 'ไม่สามารถเริ่มการชำระเงินได้');
        setSubmitting(false);
        return;
      }
      if (res.already_paid) {
        router.replace(`/courses/${courseId}`);
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
              course_id: courseId,
              ts: Date.now(),
            })
          );
        } catch {
          // best-effort
        }
        trackInitiateCheckout(courseId, Number(res.fields.total ?? grandTotal));
        setFormAction(res.url);
        setFormFields(res.fields);
        // keep submitting=true; page is about to redirect
        return;
      }
      setError('ไม่ได้รับข้อมูลช่องทางชำระเงิน');
      setSubmitting(false);
    } catch {
      setError('เกิดข้อผิดพลาด — กรุณาลองใหม่');
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      {/* LETTERHEAD */}
      <div className="letterhead">
        <div className="brand">— ยืนยันคำสั่งซื้อ —</div>
        <div className="label">
          <Link href="/ai-100m" style={{ color: 'inherit' }}>
            ← กลับไปหน้าจดหมาย
          </Link>
        </div>
      </div>

      <h1 style={{ fontSize: 32, textAlign: 'center', marginBottom: 8, lineHeight: 1.2 }}>
        อีกเพียง <span className="accent">ขั้นตอนเดียว</span> ก่อนเริ่มเรียน
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: 15,
          opacity: 0.75,
          margin: '0 0 18px',
        }}
      >
        กรอกข้อมูลด้านล่าง แล้วระบบจะพาคุณไปยังหน้าชำระเงิน Pay Solutions ปลอดภัย 100%
      </p>

      {/* ORDER FORM (same markup as sale page) */}
      <form className="order" onSubmit={handleSubmit} noValidate>
        <div className="step-head">
          <div className="num">1</div>
          <div>ข้อมูลติดต่อ · Contact</div>
          <div className="secure">🔒 ปลอดภัย</div>
        </div>
        <div className="fields">
          <div className="field">
            <label htmlFor="co-name">ชื่อ-นามสกุล · FULL NAME</label>
            <input
              id="co-name"
              placeholder="สมชาย ใจดี"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="co-email">อีเมล · EMAIL</label>
            <input
              id="co-email"
              type="email"
              placeholder="founder@company.co.th"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="co-phone">เบอร์โทร (ไม่บังคับ) · PHONE</label>
            <input
              id="co-phone"
              placeholder="08 1234 5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="step-head">
          <div className="num">2</div>
          <div>ยืนยัน &amp; ชำระเงิน · Confirm</div>
        </div>
        <div className="payment-info">
          <strong>ชำระผ่าน Pay Solutions (ปลอดภัย 100%)</strong>
          กดปุ่ม &ldquo;ไปหน้าชำระเงิน&rdquo; ด้านล่าง ระบบจะพาคุณไปยังหน้า Pay Solutions ซึ่งรองรับ{' '}
          <strong>PromptPay QR</strong> และ <strong>บัตรเครดิต/เดบิต</strong> (Visa / Mastercard /
          JCB)
        </div>

        {/* ORDER BUMPS */}
        <div style={{ padding: '10px 18px 18px' }}>
          <div
            className="label"
            style={{
              textAlign: 'center',
              display: 'block',
              marginBottom: 12,
              color: '#c0392b',
            }}
          >
            ★ เดี๋ยวก่อน! ข้อเสนอพิเศษครั้งเดียว — เพิ่มเข้าออเดอร์เลย ★
          </div>

          <div className="bump featured">
            <div className="badge">ยอดนิยม · TOP PICK</div>
            <div className="bump-row">
              <input
                type="checkbox"
                checked={bumps.press}
                onChange={(e) => setBumps({ ...bumps, press: e.target.checked })}
                aria-label="เพิ่ม The PRESS Method Playbook"
              />
              <div>
                <div className="t">
                  ใช่! เพิ่ม{' '}
                  <span className="accent">&ldquo;The PRESS Method™ Playbook&rdquo;</span> เพียง{' '}
                  <strong>฿1,990</strong>{' '}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      opacity: 0.5,
                      fontSize: 15,
                    }}
                  >
                    ฿3,900
                  </span>
                </div>
                <div className="d">
                  Check list ที่ผมใช้สร้าง Framework ที่ Mobile App ในไทยโตมากกว่า 600% ในเวลาแค่ 2
                  เดือน กับตลาดที่มีการแข่งขันเข้มข้นที่สุดจนทยานขึ้นไปทำยอดดาวน์โหลดได้อันดับ 1
                </div>
                <div className="proof">🔥 87% ของคนซื้อเลือกอันนี้</div>
              </div>
            </div>
          </div>

          <div className="bump">
            <div className="bump-row">
              <input
                type="checkbox"
                checked={bumps.dwy}
                onChange={(e) => setBumps({ ...bumps, dwy: e.target.checked })}
                aria-label="อัปเกรดเป็น Done-With-You"
              />
              <div>
                <div className="t">
                  ใช่! อัปเกรดเป็น <span className="accent">&ldquo;Done-With-You&rdquo;</span>{' '}
                  เพิ่ม <strong>฿4,900</strong>{' '}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      opacity: 0.5,
                      fontSize: 15,
                    }}
                  >
                    ฿29,000
                  </span>
                </div>
                <div className="d">
                  Group Coaching 6 ครั้ง ที่ผมรีวิว Offer · Funnel · Pitch ของคุณเองโดยตรง
                  และแก้ให้สดๆ ในคลาส
                </div>
                <div className="proof" style={{ color: 'var(--ink)' }}>
                  👥 รับแค่ 12 คน/รุ่น
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <div className="label" style={{ marginBottom: 8 }}>
            สรุปคำสั่งซื้อ · YOUR ORDER
          </div>
          <div className="srow">
            <span>{PRODUCT_NAME} (หลัก)</span>
            <span>฿{BASE_PRICE.toLocaleString()}</span>
          </div>
          {bumps.press && (
            <div className="srow" style={{ color: '#c0392b' }}>
              <span>+ {BUMP_META.press.label}</span>
              <span>฿{BUMP_META.press.price.toLocaleString()}</span>
            </div>
          )}
          {bumps.dwy && (
            <div className="srow" style={{ color: '#c0392b' }}>
              <span>+ {BUMP_META.dwy.label}</span>
              <span>฿{BUMP_META.dwy.price.toLocaleString()}</span>
            </div>
          )}
          <div className="srow total">
            <span>ยอดรวมวันนี้</span>
            <span className="accent">฿{grandTotal.toLocaleString()}</span>
          </div>
          {(bumps.press || bumps.dwy) && (
            <p className="small italic" style={{ marginTop: 10, opacity: 0.7 }}>
              * ระบบจะเพิ่มโบนัสในยอดรวม และส่งมอบให้คุณอัตโนมัติหลังชำระเงินสำเร็จ
            </p>
          )}
        </div>

        <div style={{ padding: '0 18px 20px' }}>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'กำลังเชื่อมต่อ Pay Solutions…' : '🔒 ไปหน้าชำระเงิน →'}
          </button>
          {error && <div className="error-msg">{error}</div>}
          <div
            style={{
              textAlign: 'center',
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <span className="label">รับประกัน 30 วัน</span>
            <span className="label">· SSL SECURED</span>
            <span className="label">· เข้าใช้ได้ทันที</span>
          </div>
          <p
            className="small italic"
            style={{ textAlign: 'center', opacity: 0.7, marginTop: 10 }}
          >
            ชำระครั้งเดียว ฿{BASE_PRICE.toLocaleString()} ไม่มี subscription ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
        </div>
      </form>

      {/* Hidden Paysolutions redirect form */}
      {formAction && (
        <form
          ref={formRef}
          method="POST"
          action={formAction}
          style={{ display: 'none' }}
          aria-hidden
        >
          {Object.entries(formFields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={String(v)} />
          ))}
        </form>
      )}

      {/* GUARANTEE */}
      <div className="seal-wrap">
        <div className="seal">
          <svg width="110" height="110" viewBox="0 0 88 88">
            <path
              d="M44 4 L52 10 L62 8 L66 16 L76 18 L76 28 L84 34 L80 44 L84 54 L76 60 L76 70 L66 72 L62 80 L52 78 L44 84 L36 78 L26 80 L22 72 L12 70 L12 60 L4 54 L8 44 L4 34 L12 28 L12 18 L22 16 L26 8 L36 10 Z"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            <circle
              cx="44"
              cy="44"
              r="30"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          </svg>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div className="t1">30 วัน</div>
            <div className="t2">GUARANTEE</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="hand" style={{ fontSize: 24 }}>
            รับประกัน &ldquo;ไม่ถามสักคำ&rdquo;
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 14 }}>
            ถ้านี่ไม่ใช่ ฿20k ที่คุ้มที่สุดที่คุณเคยจ่าย อีเมลมาหาผมภายใน 30 วัน ผมคืนเงินเต็มจำนวน —
            และโบนัสทั้งหมดคุณเก็บไว้ได้เลย
          </p>
        </div>
      </div>
    </div>
  );
}
