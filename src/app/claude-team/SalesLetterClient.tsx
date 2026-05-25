'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ────────────────────────────────────────────────────────────
//  Editable constants — change VIDEO_URL to your YouTube/Vimeo
//  embed URL, or leave empty to keep the dark placeholder.
// ────────────────────────────────────────────────────────────
const VIDEO_URL = ''; // e.g. 'https://www.youtube.com/embed/VIDEO_ID'
const PRODUCT_NAME = 'Claude Cowork for Teams';
const BASE_PRICE = 1390;
const SKILL_COUNT = 129;

const PREFILL_KEY = 'cowork_checkout_prefill';

type BumpKey = 'playbooks' | 'workshop';

/** A taste of the 129 cowork skills — chips shown on the page. */
const SKILL_SAMPLE: string[] = [
  'สรุปประชุม → action items',
  'ร่างอีเมลลูกค้า',
  'ตอบแชทซัพพอร์ต',
  'เขียน SOP',
  'วิเคราะห์สเปรดชีต',
  'ร่างสัญญา/ข้อเสนอ',
  'แปลเอกสาร TH↔EN',
  'สรุปรายงานยาว',
  'เขียน JD รับสมัครงาน',
  'ทำสไลด์นำเสนอ',
  'รีวิวโค้ด',
  'วางแผนโปรเจกต์',
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'ทีมไม่เคยใช้ AI มาก่อนเลย เรียนได้ไหม?',
    a: 'ได้ครับ คอร์สนี้ออกแบบมาเพื่อทั้งทีม ไม่ใช่แค่สาย tech ทุกสกิลมาพร้อม playbook + ตัวอย่างพร้อมใช้ พนักงานเปิดใช้ได้ทันทีโดยไม่ต้องเขียนโค้ด เริ่มจากงานที่ทำอยู่ทุกวันก่อน',
  },
  {
    q: 'Cowork Skills 129 ตัว คืออะไร ใช้ยังไง?',
    a: 'เป็นชุดสกิลสำเร็จรูปที่เราเตรียมไว้ให้ Claude ทำงานเฉพาะทางในองค์กร เช่น สรุปประชุม ร่างอีเมล เขียน SOP วิเคราะห์ข้อมูล ตอบลูกค้า ฯลฯ แต่ละสกิลมีคำสั่ง + เทมเพลตพร้อม คุณแค่เลือกหยิบไปใช้กับงานจริงได้เลย',
  },
  {
    q: 'ซื้อให้ทั้งทีม/ทั้งองค์กรได้ไหม?',
    a: 'ได้ครับ ราคานี้เป็นต่อ 1 ที่นั่ง สำหรับองค์กรที่ต้องการหลายที่นั่งหรือเทรนทั้งแผนก เลือกออปชัน Team Workshop ด้านล่าง หรือทักทีมงานเพื่อจัดแพ็กเกจองค์กรโดยเฉพาะ',
  },
  {
    q: 'ข้อมูลบริษัทปลอดภัยไหมเวลาใช้ Claude?',
    a: 'คอร์สมีโมดูลเรื่อง data governance โดยเฉพาะ — สอนวิธีตั้งกติกาการใช้ AI ในองค์กร ข้อมูลไหนใส่ได้/ใส่ไม่ได้ และวิธีวาง workflow ให้ปลอดภัยตามมาตรฐานองค์กร',
  },
  {
    q: 'เมื่อไหร่ถึงจะได้เข้าเรียน?',
    a: 'ทันทีที่ชำระเงินเสร็จครับ ระบบปลดล็อกเนื้อหา + สกิลทั้ง 129 ตัวให้อัตโนมัติ เข้าเรียนได้ตลอด 24 ชม. และดูย้อนหลังได้ไม่จำกัดเวลา',
  },
];

export default function SalesLetterClient() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bumps, setBumps] = useState<Record<BumpKey, boolean>>({ playbooks: true, workshop: false });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate order total (base + enabled bumps)
  const bumpPrices = { playbooks: 590, workshop: 3900 };
  const bumpTotal =
    (bumps.playbooks ? bumpPrices.playbooks : 0) + (bumps.workshop ? bumpPrices.workshop : 0);
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
    router.push('/claude-team/checkout');
  }

  return (
    <div className="page">
      {/* LETTERHEAD */}
      <div className="letterhead">
        <div className="brand">— Claude Cowork for Teams —</div>
        <div className="label">Bangkok · 2026</div>
      </div>

      {/* EYEBROW */}
      <div className="label" style={{ textAlign: 'center', display: 'block', marginBottom: 12 }}>
        สำหรับผู้นำองค์กร · หัวหน้าทีม · เจ้าของธุรกิจ
      </div>

      {/* HEADLINE */}
      <h1 style={{ fontSize: 38, textAlign: 'center', marginBottom: 10, lineHeight: 1.2 }}>
        เปลี่ยนทั้งทีมให้ทำงานกับ <span className="accent">Claude เป็น</span>
        <br />
        ภายในสัปดาห์เดียว
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
        ไม่ใช่แค่ &ldquo;สอนใช้ AI&rdquo; แต่ให้ <u>Cowork Skills {SKILL_COUNT} ตัว</u>{' '}
        ที่ทีมหยิบไปใช้กับงานจริงได้ทันที
      </p>

      {/* VSL */}
      <div className="vsl">
        {VIDEO_URL ? (
          <iframe
            src={VIDEO_URL}
            title="Claude Cowork for Teams — วิดีโอแนะนำ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <div className="meta">วิดีโอแนะนำ · 00:00 / 18:42</div>
            <div className="play" />
          </>
        )}
      </div>

      {/* SKILLS STAT — the hero number */}
      <div className="skills-stat">
        <div className="num">{SKILL_COUNT}</div>
        <div className="cap">Cowork Skills · พร้อมใช้ทันที</div>
        <div className="sub">
          สกิลสำเร็จรูปสำหรับงานองค์กรจริง — ตั้งแต่สรุปประชุม ร่างเอกสาร
          ตอบลูกค้า ไปจนถึงวิเคราะห์ข้อมูล ทุกตัวมาพร้อมเทมเพลต
        </div>
      </div>

      {/* BODY */}
      <p className="hand" style={{ fontSize: 24, margin: '20px 0 10px' }}>
        ถึงผู้นำองค์กรทุกท่าน,
      </p>

      <p>
        ปัญหาไม่ได้อยู่ที่ &ldquo;ทีมไม่อยากใช้ AI&rdquo; ครับ —{' '}
        <span className="accent">ปัญหาคือไม่มีใครรู้ว่าจะเริ่มใช้กับงานจริงตรงไหน</span>{' '}
        พนักงานเปิด Claude ขึ้นมา พิมพ์ไปสองสามครั้ง แล้วก็ปิดไป กลับไปทำงานแบบเดิม
        เพราะไม่มีระบบ ไม่มีเทมเพลต ไม่มีคนบอกว่า &ldquo;งานนี้ ใช้แบบนี้&rdquo;
      </p>

      <p>
        คอร์สนี้แก้ตรงนั้น — เราไม่ได้สอนทฤษฎี AI แต่ส่งมอบ{' '}
        <strong>Cowork Skills {SKILL_COUNT} ตัว</strong> ที่ทีมเปิดใช้กับงานประจำได้ทันที
        แต่ละสกิลคืองานจริงในออฟฟิศ พร้อมคำสั่ง พร้อมตัวอย่าง พร้อมวิธีปรับให้เข้ากับองค์กรคุณ
      </p>

      <div className="pullquote">
        &ldquo;ทีม 12 คน ลดเวลางานเอกสารซ้ำๆ ลงได้เกือบครึ่ง ภายใน 3 สัปดาห์แรก
        — สิ่งที่เคยใช้คนทั้งบ่าย ตอนนี้เสร็จก่อนพักเที่ยง&rdquo;
      </div>

      {/* SKILL CHIPS — sample of 129 */}
      <p style={{ marginBottom: 6 }}>
        <strong>ตัวอย่างสกิลที่ทีมได้ใช้ทันที</strong> (จากทั้งหมด {SKILL_COUNT} ตัว):
      </p>
      <div className="skill-grid" aria-label={`ตัวอย่าง Cowork Skills จากทั้งหมด ${SKILL_COUNT} ตัว`}>
        {SKILL_SAMPLE.map((s) => (
          <span key={s} className="skill-chip">
            {s}
          </span>
        ))}
        <span className="skill-chip more">+ อีก {SKILL_COUNT - SKILL_SAMPLE.length} สกิล</span>
      </div>

      {/* HARD TRUTH */}
      <div className="hard-truth">
        <div className="label">ความจริงที่หัวหน้าทุกคนเจอ</div>
        <h2>ซื้อ AI ให้ทั้งบริษัท แต่มีคนใช้จริงไม่ถึง 1 ใน 5</h2>
        <p>
          ไม่ใช่เพราะเครื่องมือไม่ดี แต่เพราะไม่มีใครเปลี่ยน &ldquo;เครื่องมือ&rdquo;
          ให้กลายเป็น &ldquo;วิธีทำงาน&rdquo; ของทีม
        </p>
      </div>

      {/* BULLETS */}
      <p>
        นี่คือสิ่งที่องค์กรของคุณจะได้จาก <strong>{PRODUCT_NAME}</strong>:
      </p>
      <ul style={{ paddingLeft: 22, lineHeight: 1.95 }}>
        <li>Cowork Skills ทั้ง {SKILL_COUNT} ตัว — แยกตามแผนก (ขาย · การตลาด · HR · ปฏิบัติการ · ซัพพอร์ต)…</li>
        <li>วิธีวาง &ldquo;AI Workflow&rdquo; ให้ทั้งทีมทำตามได้ ไม่ใช่ใช้กันคนละทิศ…</li>
        <li>เทมเพลต prompt มาตรฐานองค์กร ที่คัดลอกไปใช้ได้เลย…</li>
        <li>โมดูล Data Governance — ข้อมูลไหนใส่ได้/ใส่ไม่ได้ ปลอดภัยตามมาตรฐาน…</li>
        <li>ระบบวัดผล: รู้ว่าทีมใช้จริงแค่ไหน ประหยัดเวลาไปเท่าไหร่…</li>
        <li>Onboarding พนักงานใหม่ให้ใช้ AI เป็นภายในวันแรก…</li>
      </ul>

      {/* BONUSES */}
      <div className="bonus-card">
        <h3>
          + โบนัสสำหรับองค์กร มูลค่า <span className="accent">฿18,800</span>
        </h3>
        <ul>
          <li>① ไลบรารีเทมเพลตพร้อมใช้ 50+ ไฟล์ (฿4,900)</li>
          <li>② เช็กลิสต์ตั้งกติกาใช้ AI ในองค์กร (฿2,900)</li>
          <li>③ Live Q&amp;A สดสำหรับทีม 8 สัปดาห์ (฿6,000)</li>
          <li>④ กลุ่มปิด Team Leads Circle (฿5,000)</li>
        </ul>
      </div>

      {/* SIGN-OFF */}
      <p>
        คู่แข่งของคุณกำลังทำให้ทั้งทีมทำงานเร็วขึ้นด้วย AI — ในขณะที่ทีมคุณยัง
        &ldquo;ลองเล่นอยู่&rdquo;
      </p>
      <p>ทุกสัปดาห์ที่รอ คือเวลาทำงานที่หายไปทั้งองค์กร</p>
      <p style={{ marginTop: 24 }}>แล้วเจอกันในคลาสครับ,</p>
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
        ~ ทีม Antiparallel
      </div>
      <div className="label" style={{ marginTop: 4 }}>
        ผู้สอน · CLAUDE COWORK FOR TEAMS
      </div>

      {/* ORDER FORM — submit navigates to /claude-team/checkout */}
      <form className="order" onSubmit={handleGoToCheckout} noValidate>
        <div className="step-head">
          <div className="num">1</div>
          <div>ข้อมูลติดต่อ · Contact</div>
          <div className="secure">🔒 ปลอดภัย</div>
        </div>
        <div className="fields">
          <div className="field">
            <label htmlFor="cowork-name">ชื่อ-นามสกุล · FULL NAME</label>
            <input
              id="cowork-name"
              placeholder="สมชาย ใจดี"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="cowork-email">อีเมล · EMAIL</label>
            <input
              id="cowork-email"
              type="email"
              placeholder="you@company.co.th"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="cowork-phone">เบอร์โทร (ไม่บังคับ) · PHONE</label>
            <input
              id="cowork-phone"
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
              color: 'var(--accent)',
            }}
          >
            ★ ข้อเสนอพิเศษครั้งเดียว — เพิ่มเข้าออเดอร์เลย ★
          </div>

          <div className="bump featured">
            <div className="badge">ยอดนิยม · TOP PICK</div>
            <div className="bump-row">
              <input
                type="checkbox"
                checked={bumps.playbooks}
                onChange={(e) => setBumps({ ...bumps, playbooks: e.target.checked })}
                aria-label="เพิ่ม Department Playbooks Pack"
              />
              <div>
                <div className="t">
                  ใช่! เพิ่ม{' '}
                  <span className="accent">&ldquo;Department Playbooks Pack&rdquo;</span> เพียง{' '}
                  <strong>฿590</strong>{' '}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      opacity: 0.5,
                      fontSize: 15,
                    }}
                  >
                    ฿1,900
                  </span>
                </div>
                <div className="d">
                  เพลย์บุ๊กแยกตามแผนก (ขาย · การตลาด · HR · ปฏิบัติการ) บอกชัดว่าแต่ละสกิล
                  เอาไปใช้กับงานจริงของแผนกนั้นยังไง พร้อมเทมเพลตเฉพาะทาง
                </div>
                <div className="proof">🔥 84% ของทีมเลือกอันนี้</div>
              </div>
            </div>
          </div>

          <div className="bump">
            <div className="bump-row">
              <input
                type="checkbox"
                checked={bumps.workshop}
                onChange={(e) => setBumps({ ...bumps, workshop: e.target.checked })}
                aria-label="เพิ่ม Team Workshop สด"
              />
              <div>
                <div className="t">
                  ใช่! เพิ่ม <span className="accent">&ldquo;Team Workshop สด&rdquo;</span>{' '}
                  เพิ่ม <strong>฿3,900</strong>{' '}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      opacity: 0.5,
                      fontSize: 15,
                    }}
                  >
                    ฿15,000
                  </span>
                </div>
                <div className="d">
                  เวิร์กชอปสด 2 ชม. ที่ผู้สอนพาทั้งทีมตั้ง AI Workflow ของจริงในองค์กรคุณ
                  — ออกแบบเฉพาะงานของทีมคุณ
                </div>
                <div className="proof">👥 รับแค่ 5 องค์กร/เดือน</div>
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
          {bumps.playbooks && (
            <div className="srow" style={{ color: 'var(--accent)' }}>
              <span>+ Department Playbooks Pack</span>
              <span>฿{bumpPrices.playbooks.toLocaleString()}</span>
            </div>
          )}
          {bumps.workshop && (
            <div className="srow" style={{ color: 'var(--accent)' }}>
              <span>+ Team Workshop สด</span>
              <span>฿{bumpPrices.workshop.toLocaleString()}</span>
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
              stroke="#1a1714"
              strokeWidth="1.5"
            />
            <circle
              cx="44"
              cy="44"
              r="30"
              fill="none"
              stroke="#1a1714"
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
            ถ้าทีมคุณลองทำตามแล้วไม่เห็นผลใน 30 วัน อีเมลมาหาเรา คืนเงินเต็มจำนวน —
            และสกิลทั้งหมดคุณเก็บไว้ได้เลย
          </p>
        </div>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 28, margin: '30px 0 14px', textAlign: 'center' }}>
        คำถามที่องค์กรมักถาม…
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
        ราคาเปิดตัว ฿{BASE_PRICE.toLocaleString()}/ที่นั่ง นี้ มีจำนวนจำกัด
        หลังรอบเปิดตัวราคาจะปรับขึ้น
      </div>
      <div className="ps">
        <span className="hand" style={{ fontSize: 22 }}>
          P.P.S.
        </span>{' '}
        ต้องการซื้อหลายที่นั่งให้ทั้งแผนก หรือจัดแพ็กเกจองค์กร? เลือก Team Workshop ด้านบน
        หรือทักทีมงานเพื่อรับใบเสนอราคาองค์กรได้เลย
      </div>
    </div>
  );
}
