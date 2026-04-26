'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ────────────────────────────────────────────────────────────
//  Editable constants — change VIDEO_URL to your YouTube/Vimeo
//  embed URL, or leave empty to keep the dark placeholder.
// ────────────────────────────────────────────────────────────
const VIDEO_URL = ''; // e.g. 'https://www.youtube.com/embed/VIDEO_ID'
const PRODUCT_NAME = 'AI ฿100M Blueprint';
const BASE_PRICE = 19900;

const PREFILL_KEY = 'ai100m_checkout_prefill';

type BumpKey = 'press' | 'dwy';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'ต้องมีธุรกิจอยู่แล้วไหม?',
    a: 'ไม่จำเป็นครับ มีโมดูลสำหรับคนที่ยังไม่ได้เริ่มต้น คุณจะได้เฟรมเวิร์กเลือกตลาด/สินค้า/ออฟเฟอร์ก่อนลงมือ แต่ถ้ามีธุรกิจอยู่แล้ว คุณจะเห็นผลเร็วขึ้นมาก เพราะเอา AI ไปต่อยอดของเดิมได้ทันที',
  },
  {
    q: 'ใช้เวลากี่ชั่วโมงต่อสัปดาห์?',
    a: 'แนะนำ 3–5 ชั่วโมง/สัปดาห์ ดูย้อนหลังได้ทุกบทเรียน ไม่มีตารางบังคับ ทำตามจังหวะตัวเองได้เต็มที่ เน้นลงมือทำตาม playbook ทีละสเต็ป',
  },
  {
    q: 'นี่เป็นแค่ "คอร์ส AI" ทั่วไปอีกคอร์สหรือเปล่า?',
    a: 'ไม่ใช่ครับ นี่คือ blueprint การสร้างรายได้ ฿100M ด้วย AI — ไม่ได้สอนแค่เขียน prompt แต่สอนวิธีออกแบบระบบธุรกิจที่มี AI เป็นแกน ตั้งแต่ market, offer, funnel, sales, fulfillment ครบลูป',
  },
  {
    q: 'ไม่มีพื้น tech เรียนได้ไหม?',
    a: 'ได้ครับ ออกแบบมาเพื่อนักธุรกิจ/เจ้าของแบรนด์ที่ไม่ใช่สาย tech โดยเฉพาะ ทุกขั้นตอนมี playbook + ตัวอย่าง prompt + วิดีโอจอ ให้ทำตามได้ทันทีโดยไม่ต้องเขียนโค้ด',
  },
  {
    q: 'เมื่อไหร่ถึงจะได้เข้าเรียน?',
    a: 'ทันทีที่ชำระเงินเสร็จครับ ระบบปลดล็อกเนื้อหาให้อัตโนมัติ เข้าเรียนได้ตลอด 24 ชม. และดูย้อนหลังได้ไม่จำกัดเวลา',
  },
];

export default function SalesLetterClient() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bumps, setBumps] = useState<Record<BumpKey, boolean>>({ press: true, dwy: false });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate order total (base + enabled bumps)
  const bumpPrices = { press: 1990, dwy: 4900 };
  const bumpTotal =
    (bumps.press ? bumpPrices.press : 0) + (bumps.dwy ? bumpPrices.dwy : 0);
  const grandTotal = BASE_PRICE + bumpTotal;

  function handleGoToCheckout(e: React.FormEvent) {
    e.preventDefault();
    // Persist whatever the visitor typed so the checkout page can pre-fill.
    // No validation here — the checkout page is the enforcement point.
    try {
      localStorage.setItem(
        PREFILL_KEY,
        JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          bumps,
        })
      );
    } catch {
      // storage disabled — checkout will start fresh, that's fine
    }
    router.push('/ai-100m/checkout');
  }

  return (
    <div className="page">
      {/* LETTERHEAD */}
      <div className="letterhead">
        <div className="brand">— จดหมายเปิดผนึก —</div>
        <div className="label">Bangkok · เม.ย. 2026</div>
      </div>

      {/* EYEBROW */}
      <div className="label" style={{ textAlign: 'center', display: 'block', marginBottom: 12 }}>
        จากโต๊ะทำงานของอดีต SoloPreneur ที่สร้างรายได้หลักล้านมามากกว่า 10 ปี
      </div>

      {/* HEADLINE */}
      <h1 style={{ fontSize: 38, textAlign: 'center', marginBottom: 10, lineHeight: 1.2 }}>
        &ldquo;ถ้าผมต้องสร้าง<span className="accent">บริษัท 100 ล้าน</span>
        <br />
        จาก 0... AI จะเป็นประตูบานแรกที่ผมจะเปิด...&rdquo;
      </h1>

      {/* SUBHEADLINE */}
      <p
        style={{
          textAlign: 'center',
          fontSize: 17,
          fontStyle: 'italic',
          opacity: 0.75,
          margin: '0 0 10px',
        }}
      >
        …นี่คือ<u>Playbookเดียว</u>ที่ผมจะใช้ และวันนี้ผมให้คุณฟรี
      </p>

      {/* VSL */}
      <div className="vsl">
        {VIDEO_URL ? (
          <iframe
            src={VIDEO_URL}
            title="AI ฿100M Blueprint — วิดีโอแนะนำ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <div className="meta">วิดีโอแนะนำ · 00:00 / 27:14</div>
            <div className="play" />
          </>
        )}
      </div>

      {/* BODY */}
      <p className="hand" style={{ fontSize: 24, margin: '20px 0 10px' }}>
        ถึงเพื่อนผู้ก่อตั้งทุกท่าน,
      </p>

      <p>
        ขอเริ่มด้วยคำสารภาพนะครับ{' '}
        <span className="accent">เมื่อ 5 ปีก่อน ผมเลือกเดินถอยหลังให้กับ Solopreneur</span>{' '}
        ที่ผมทุ่มเวลาไปมากกว่า 10 ปี ทั้งๆ ที่มันคือแนวทางที่สร้างรายได้หลักล้านให้ผมมามากกว่า 10 ปี
        ผมเลือกที่จะถอยหลังให้กับมัน และสร้างบางสิ่งบางอย่างใหม่
      </p>

      <p>
        แล้วผมก็ค้นพบบางอย่าง — ไม่ใช่ &ldquo;ทริก&rdquo; ไม่ใช่ &ldquo;เคล็ดลับ&rdquo; แต่เป็น
        <strong>ระบบ</strong> วิธีผสม AI เข้ากับ framework ด้าน product-market ที่เฉพาะเจาะจง
        และมันได้เปลี่ยนทุกอย่างไปตลอดกาล
      </p>

      <div className="pullquote">
        &ldquo;ภายใน 14 เดือน ผมสามารถขยายสาขาธุรกิจไปมากกว่า 5 จังหวัด และสร้าง Valuation
        มากกว่า 100 ล้าน และเมื่อระบบที่ผมสร้างทำงานได้อย่างสมบูรณ์ในสาขาใหม่ สร้างยอดขาย 25 ล้านใน
        Q1 — โดยที่ผมมีแผนการระดมทุน{' '}
        <strong>ที่ทำให้นักลงทุนต้องวิ่งเข้าหาคุณเอง&rdquo;</strong>
      </div>

      {/* PROOF — Polaroids of new branches */}
      <div className="polaroid-strip" aria-label="ภาพถ่ายสาขาใหม่">
        <figure className="polaroid polaroid-tilt-l">
          <div className="polaroid-img" data-placeholder>
            <span className="polaroid-placeholder-text">[ ภาพหน้าสาขา 1 ]</span>
          </div>
          <figcaption>
            <span className="polaroid-caption hand">สาขาใหม่ #1</span>
            <span className="polaroid-label">เปิด · 2026</span>
          </figcaption>
        </figure>

        <figure className="polaroid polaroid-tilt-r">
          <div className="polaroid-img" data-placeholder>
            <span className="polaroid-placeholder-text">[ ภาพหน้าสาขา 2 ]</span>
          </div>
          <figcaption>
            <span className="polaroid-caption hand">สาขาใหม่ #2</span>
            <span className="polaroid-label">เปิด · 2026</span>
          </figcaption>
        </figure>

        <figure className="polaroid polaroid-tilt-l">
          <div className="polaroid-img" data-placeholder>
            <span className="polaroid-placeholder-text">[ ภาพหน้าสาขา 3 ]</span>
          </div>
          <figcaption>
            <span className="polaroid-caption hand">สาขาใหม่ #3</span>
            <span className="polaroid-label">เปิด · 2026</span>
          </figcaption>
        </figure>
      </div>
      <div className="polaroid-note label">
        ↑ บางส่วนของสาขาที่ขยายในช่วง 14 เดือนที่ผ่านมา
      </div>

      <p>
        คุณอาจจะสงสัยว่า: <em>มันเป็นไปได้จริงสำหรับผมเหรอ?</em>
      </p>
      <p>
        คำตอบสั้นๆ คือ <strong>ใช่ครับ</strong> — แต่ไม่ใช่ถ้าคุณยังทำแบบเดิมที่ทำอยู่
      </p>

      {/* HARD TRUTH */}
      <div className="hard-truth">
        <div className="label">ความจริงที่ไม่มีใครบอก</div>
        <h2>99.4% ของผู้ประกอบการไทย จะไม่มีวันทะลุ ฿10 ล้าน</h2>
        <p>
          ไม่ใช่เพราะขี้เกียจ ไม่ใช่เพราะไม่เก่ง แต่เพราะไม่เคยมีใครสอน <em>ระบบ</em> ที่ Top 0.6%
          เขาใช้กัน
        </p>
      </div>

      {/* BULLETS */}
      <p>
        นี่คือสิ่งที่คุณจะได้ค้นพบใน <strong>AI ฿100M Blueprint</strong>:
      </p>
      <ul style={{ paddingLeft: 22, lineHeight: 1.95 }}>
        <li>&ldquo;Wedge Method&rdquo; — วิธีหาตลาดพันล้านที่ไม่มีใครมองเห็น…</li>
        <li>SuperB Prompts ที่ผมใช้โคลนระบบการทำงานของบริษัทด้วย AI…</li>
        <li>ทำไมหลายคนหลงทางกับการเรียนรู้เครื่องมือ AI (และตัวธุรกิจจริงที่สร้าง valuation)…</li>
        <li>วิธีวางโครงสร้างบริษัทให้ VC ต้องวิ่งเข้าหาคุณเอง…</li>
        <li>&ldquo;Valuation Sprint&rdquo; 90 วัน ที่ผมรันทุกไตรมาส…</li>
        <li>
          &ldquo;Pitch Deck&rdquo; ที่ควรจะเป็น และนักลุงทุนไม่วิ่งหนีคุณไปตั้งแต่อ้าปากพูดคำแรก…
        </li>
        <li>&ldquo;AI Agent Starter Kit&rdquo; ที่ผ่านการลองผิดลองถูกแล้วสร้างขึ้นมา…</li>
      </ul>

      {/* BONUSES */}
      <div className="bonus-card">
        <h3>
          + โบนัสพิเศษ 5 ชิ้น มูลค่า <span className="accent">฿72,400</span>
        </h3>
        <ul>
          <li>① ClaudeCode Simple is perfect (฿9,900)</li>
          <li>② Sale page Prompt ที่สร้าง Conversion ได้จริง คุณแค่ Copy แล้ววาง (฿6,500)</li>
          <li>③ Live Q&amp;A สด 12 สัปดาห์ (฿19,000)</li>
          <li>④ กลุ่มปิด Founder Circle (฿12,000)</li>
          <li>⑤ Call 1:1 วางกลยุทธ์กับผมโดยตรง (฿25,000)</li>
        </ul>
      </div>

      {/* SIGN-OFF */}
      <p>เอาจริงๆ — ผมบังคับให้คุณกดปุ่มข้างล่างไม่ได้หรอกครับ</p>
      <p>
        แต่ผม<em>บอกได้อย่างเดียว</em>ว่า ทุกวันที่คุณรอ คือวันที่คู่แข่งของคุณ กำลังไปไกลขึ้นด้วย AI
        ในขณะที่คุณยัง &ldquo;คิดดูก่อน&rdquo;
      </p>
      <p style={{ marginTop: 24 }}>แล้วเจอกันครับ,</p>
      <div
        style={{
          fontFamily: 'var(--font-sig)',
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: '.5px',
          transform: 'rotate(-3deg)',
          marginTop: 4,
        }}
      >
        ~ Mentor ของคุณในวันข้างหน้า
      </div>
      <div className="label" style={{ marginTop: 4 }}>
        ผู้ก่อตั้ง · AI-100M BLUEPRINT
      </div>

      {/* ORDER FORM — submit navigates to /ai-100m/checkout */}
      <form className="order" onSubmit={handleGoToCheckout} noValidate>
        <div className="step-head">
          <div className="num">1</div>
          <div>ข้อมูลติดต่อ · Contact</div>
          <div className="secure">🔒 ปลอดภัย</div>
        </div>
        <div className="fields">
          <div className="field">
            <label htmlFor="ai100m-name">ชื่อ-นามสกุล · FULL NAME</label>
            <input
              id="ai100m-name"
              placeholder="สมชาย ใจดี"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="ai100m-email">อีเมล · EMAIL</label>
            <input
              id="ai100m-email"
              type="email"
              placeholder="founder@company.co.th"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="ai100m-phone">เบอร์โทร (ไม่บังคับ) · PHONE</label>
            <input
              id="ai100m-phone"
              placeholder="08 1234 5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              autoComplete="tel"
            />
          </div>
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
              <span>+ The PRESS Method™ Playbook</span>
              <span>฿1,990</span>
            </div>
          )}
          {bumps.dwy && (
            <div className="srow" style={{ color: '#c0392b' }}>
              <span>+ Done-With-You Upgrade</span>
              <span>฿4,900</span>
            </div>
          )}
          <div className="srow total">
            <span>ยอดรวมวันนี้</span>
            <span className="accent">฿{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ padding: '0 18px 20px' }}>
          <button type="submit" className="btn">
            🔒 ยืนยันคำสั่งซื้อเลย →
          </button>
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

      {/* FAQ */}
      <h2 style={{ fontSize: 28, margin: '30px 0 14px', textAlign: 'center' }}>
        คำถามที่คุณอาจสงสัย…
      </h2>
      {FAQS.map((item, i) => {
        const isOpen = openFaq === i;
        return (
          <div key={i} className="faq-item">
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpenFaq(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div id={`faq-a-${i}`} className="faq-a" role="region">
                {item.a}
              </div>
            )}
          </div>
        );
      })}

      {/* P.S. */}
      <div className="ps">
        <span className="hand" style={{ fontSize: 22 }}>
          P.S.
        </span>{' '}
        มีแค่ 47 ที่นั่ง ในราคานี้ ถ้าหมดเมื่อไหร่ ราคาจะปรับขึ้นเป็น 2 เท่าทันที
      </div>
      <div className="ps">
        <span className="hand" style={{ fontSize: 22 }}>
          P.P.S.
        </span>{' '}
        ยังลังเลอยู่ใช่ไหม? ลองดูวิดีโอด้านบนก่อน ถ้าดูแล้วไม่เปลี่ยนมุมมองที่คุณมีต่อธุรกิจตัวเอง
        ก็ปิดแท็บไปได้เลยครับ ไม่เสียอะไร
      </div>
    </div>
  );
}
