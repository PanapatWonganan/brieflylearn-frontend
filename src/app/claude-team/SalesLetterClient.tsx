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
    q: '129 สกิลนี้ มันต่างจากคอร์ส AI ทั่วไปยังไง?',
    a: 'ต่างตรงที่มันไม่ได้มาจากตำราครับ — ทุกสกิลมาจากงานจริงในบริษัทของผมเอง ที่ลองแล้วได้ผล ใช้จนบริษัทโตมีมูลค่าเกิน ฿100 ล้าน และขยายเป็น 5 สาขาใน 1 ปีครึ่ง คุณไม่ได้ซื้อทฤษฎี แต่ได้ระบบที่ผ่านสนามจริงมาแล้ว หยิบไปวางบนทีมคุณได้เลย',
  },
  {
    q: 'ทีมไม่เคยใช้ AI มาก่อนเลย เรียนได้ไหม?',
    a: 'ได้ครับ ผมออกแบบมาเพื่อทั้งทีม ไม่ใช่แค่สาย tech — พนักงานผมเองหลายคนก็เริ่มจากศูนย์ ทุกสกิลมาพร้อมเทมเพลต + ตัวอย่างพร้อมใช้ เปิดใช้กับงานที่ทำอยู่ทุกวันได้ทันที ไม่ต้องเขียนโค้ด',
  },
  {
    q: 'ซื้อให้ทั้งทีม/ทั้งองค์กรได้ไหม?',
    a: 'ได้ครับ ราคานี้เป็นต่อ 1 ที่นั่ง ถ้าต้องการหลายที่นั่งหรือเทรนทั้งแผนก ในขั้นตอนชำระเงินจะมีออปชัน Team Workshop ให้เพิ่ม หรือทักทีมงานเพื่อจัดแพ็กเกจองค์กรโดยเฉพาะ',
  },
  {
    q: 'ข้อมูลบริษัทปลอดภัยไหมเวลาใช้ Claude?',
    a: 'เป็นเรื่องที่ผมซีเรียสมากในบริษัทตัวเองครับ คอร์สมีโมดูล Data Governance โดยเฉพาะ — สอนวิธีตั้งกติกาว่าข้อมูลไหนใส่ได้/ใส่ไม่ได้ และวางขั้นตอนงานให้ปลอดภัยตั้งแต่แรก',
  },
  {
    q: 'เมื่อไหร่ถึงจะได้เข้าเรียน?',
    a: 'ทันทีที่ชำระเงินเสร็จครับ ระบบปลดล็อกเนื้อหา + สกิลทั้ง 129 ตัวให้อัตโนมัติ เข้าเรียนได้ตลอด 24 ชม. และดูย้อนหลังได้ไม่จำกัดเวลา',
  },
];

export default function SalesLetterClient() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          bumps: { playbooks: true, workshop: false },
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
        สำหรับเจ้าของธุรกิจ · ผู้บริหาร · หัวหน้าทีม ที่อยากให้องค์กรโตเร็วกว่าเดิม
      </div>

      {/* HEADLINE */}
      <h1 style={{ fontSize: 38, textAlign: 'center', marginBottom: 10, lineHeight: 1.2 }}>
        {SKILL_COUNT} Skills ที่ผมไม่ได้ &ldquo;สอน&rdquo; —
        <br />
        ผมใช้มันจริงในบริษัทตัวเอง จนได้ <span className="accent">฿100 ล้าน, 5 สาขา, 1 ปีครึ่ง</span>
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
        แล้วมันพาบริษัทผมโตจนมีมูลค่าเกิน ฿100 ล้าน ขยายเป็น 5 สาขาใน 1 ปีครึ่ง — วันนี้ผมยกชุด{' '}
        <u>Cowork Skills {SKILL_COUNT} ตัว ที่ทีมผมใช้จริงทุกวัน</u>{' '}
        มาให้ทั้งทีมคุณหยิบไปใช้ได้เลย
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
            <div className="meta">วิดีโอ: ผมเล่าให้ฟังเอง · ผมใช้ Claude จัดระบบงานของทีมยังไง · 00:00 / 18:42</div>
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
        จากเจ้าของธุรกิจคนหนึ่ง ถึงเจ้าของธุรกิจอีกคน,
      </p>

      <p>
        ผมขอเล่าตรงๆ นะครับ — ผมไม่ใช่กูรู AI และผมไม่ได้ทำธุรกิจคนเดียว ผมมีทีมบริหาร มีพนักงาน
        มีองค์กรที่ต้องดูแลทุกวัน และเมื่อก่อนผมก็เจอปัญหาเดียวกับคุณ: ซื้อ AI ให้ทั้งบริษัทแล้ว
        แต่พนักงานเปิดขึ้นมา พิมพ์ไปสองสามครั้ง แล้วก็ปิด กลับไปทำงานแบบเดิม เพราะไม่มีใครรู้ว่า
        &ldquo;งานจริงในออฟฟิศ จะเอา AI มาใช้ตรงไหน&rdquo;
      </p>

      <p>
        จุดที่เปลี่ยนทุกอย่าง คือวันที่ผมเลิกคิดว่า AI เป็น &ldquo;เครื่องมือให้พนักงานลองเล่น&rdquo;
        แล้วเริ่มใช้ Claude มา <span className="accent">ออกแบบระบบการทำงาน</span> ของทีมแทน —
        ไม่ใช่ให้ AI มาแทนคน แต่ให้ AI จัดโครงสร้างงานให้คนทำงานได้เต็มที่ที่สุด ใครทำอะไร ตรงไหน
        ด้วยขั้นตอนไหน ผมค่อยๆ ถอดงานในแต่ละแผนกออกมาเป็นสกิลสำเร็จรูปทีละตัว จนกลายเป็น{' '}
        {SKILL_COUNT} สกิลที่คุณเห็นวันนี้ และนั่นแหละครับ คือสิ่งที่พาบริษัทผมจากองค์กรเล็กๆ
        โตจนมีมูลค่าเกิน ฿100 ล้าน และขยายจาก 1 เป็น 5 สาขาภายในแค่ 1 ปีครึ่ง
      </p>

      <p>
        ผมเน้นย้ำคำนี้ครับ — {SKILL_COUNT} สกิลนี้ ไม่ได้มาจากตำราหรือคอร์สที่ไหน
        แต่มาจากเคสจริงในบริษัทของผมเอง ที่ลองแล้วได้ผล ใช้แล้วทีมทำงานเร็วขึ้นจริง{' '}
        <strong>ไม่ใช่แค่สอน แต่ทำได้จริง</strong> — เพราะผมพิสูจน์มันมาแล้วกับองค์กรที่กำลังโตของผมเอง
      </p>

      <div className="pullquote">
        &ldquo;ผมไม่ได้สอนให้พนักงานเก่ง AI ขึ้น — ผมใช้ AI ออกแบบ ให้พนักงานคนเดิม
        ทำงานออกมาได้มากกว่าเดิมหลายเท่า ระบบทำงานแทนความเก่งของคนๆ เดียว
        นั่นคือสิ่งที่ทำให้องค์กรโตได้จริง&rdquo;
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
        <div className="label">ความจริงที่เจ้าของธุรกิจทุกคนรู้ดี</div>
        <h2>องค์กรไม่ได้โตเพราะ &ldquo;พนักงานเก่งขึ้น&rdquo; แต่โตเพราะ &ldquo;ระบบดีขึ้น&rdquo;</h2>
        <p>
          คนเก่งลาออกได้ จ้างใหม่ก็ต้องสอนใหม่ แต่ถ้าคุณวางระบบให้ AI จัดโครงสร้างงานไว้
          พนักงานคนไหนเข้ามาก็ทำงานได้ระดับเดียวกัน — นี่คือความต่างระหว่างธุรกิจที่ติดอยู่กับตัวเจ้าของ
          กับธุรกิจที่ขยายสาขาได้
        </p>
      </div>

      {/* BULLETS */}
      <p>
        นี่คือสิ่งที่ทั้งทีมคุณจะได้จาก <strong>Claude Cowork for Teams</strong> — ชุดเดียวกับที่ทีมผมใช้:
      </p>
      <ul style={{ paddingLeft: 22, lineHeight: 1.95 }}>
        <li>Cowork Skills ทั้ง {SKILL_COUNT} ตัว — ชุดเดียวกับที่ทีมผมใช้ทุกวัน แยกตามแผนก (ขาย · การตลาด · HR · ปฏิบัติการ · ซัพพอร์ต) หยิบใช้ได้ทันทีไม่ต้องเริ่มจากศูนย์</li>
        <li>วิธีที่ผมใช้ AI &ldquo;ออกแบบระบบงาน&rdquo; ให้ทั้งทีมเดินไปทางเดียวกัน — ไม่ใช่ต่างคนต่างใช้คนละทิศ</li>
        <li>เทมเพลตคำสั่งมาตรฐานองค์กร ที่พนักงานคัดลอกไปใช้กับงานจริงได้เลยในวันแรก</li>
        <li>โมดูล Data Governance — ข้อมูลบริษัทไหนใส่ได้/ใส่ไม่ได้ วางกติกาให้ปลอดภัยก่อนที่จะมีปัญหา</li>
        <li>วิธีวัดผลว่าทีมใช้จริงแค่ไหน ประหยัดเวลาไปเท่าไหร่ — เห็นเป็นตัวเลข ไม่ใช่ความรู้สึก</li>
        <li>ระบบ Onboarding ที่ทำให้พนักงานใหม่ทำงานกับ AI เป็นตั้งแต่วันแรก โดยไม่ต้องให้คุณนั่งสอนเอง</li>
      </ul>

      {/* BONUSES */}
      <div className="bonus-card">
        <h3>
          + โบนัสสำหรับทั้งทีม มูลค่ารวม <span className="accent">฿18,800</span>
        </h3>
        <ul>
          <li>① ไลบรารีเทมเพลตพร้อมใช้ 50+ ไฟล์ — ชุดเดียวกับที่ทีมผมใช้จริง (฿4,900)</li>
          <li>② เช็กลิสต์วางกติกาใช้ AI ในองค์กร ให้ปลอดภัยตั้งแต่วันแรก (฿2,900)</li>
          <li>③ Live Q&amp;A สด 8 สัปดาห์ — ถามผมตรงๆ ได้ว่าจะปรับใช้กับองค์กรคุณยังไง (฿6,000)</li>
          <li>④ กลุ่มปิด Team Leads Circle — รวมเจ้าของธุรกิจที่กำลังจัดระบบทีมด้วย AI เหมือนกัน (฿5,000)</li>
        </ul>
      </div>

      {/* SIGN-OFF */}
      <p>
        ผมรู้ดีว่าการรอ &ldquo;ให้พร้อมก่อน&rdquo; มันรู้สึกปลอดภัยกว่า — ผมก็เคยคิดแบบนั้น
        แต่ทุกสัปดาห์ที่ทีมคุณยังทำงานแบบเดิม คือเวลาทั้งองค์กรที่เสียไปโดยไม่ได้คืน
        และคู่แข่งที่เริ่มก่อน เขาไม่ได้รอคุณครับ
      </p>
      <p>
        ผมไม่ได้ขายทฤษฎี ผมยกระบบจริงที่พาบริษัทผมโตมาให้คุณทั้งชุด ที่เหลือคือคุณจะเริ่มวันนี้
        หรือเริ่มตอนที่สายไปแล้ว
      </p>
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
        ผู้ก่อตั้ง · ผู้สอน CLAUDE COWORK FOR TEAMS
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

        {/* SUMMARY */}
        <div className="summary">
          <div className="label" style={{ marginBottom: 8 }}>
            สรุปคำสั่งซื้อ · YOUR ORDER
          </div>
          <div className="srow">
            <span>{PRODUCT_NAME} (หลัก)</span>
            <span>฿{BASE_PRICE.toLocaleString()}</span>
          </div>
          <div className="srow total">
            <span>ยอดรวมวันนี้</span>
            <span className="accent">฿{BASE_PRICE.toLocaleString()}</span>
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
            รับประกัน &ldquo;ไม่ถามสักคำ&rdquo; 30 วัน
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 14 }}>
            ลองเอาระบบนี้ไปใช้กับทีมคุณดูก่อน ถ้าภายใน 30 วันแล้วทีมไม่ได้ทำงานคล่องขึ้นจริง
            อีเมลมาหาผม คืนเงินเต็มจำนวน ไม่ถามสักคำ — และสกิลทั้ง {SKILL_COUNT} ตัว คุณเก็บไว้ได้เลย
            ผมกล้ารับประกันแบบนี้ เพราะผมใช้มันมากับองค์กรของผมเองแล้ว
          </p>
        </div>
      </div>

      {/* IN-HOUSE TRAINING */}
      <div className="bonus-card">
        <h3>เร็วๆ นี้: In-House Training — ทีมผมไปวางระบบให้ถึงองค์กรคุณ</h3>
        <p>
          คอร์ส ฿{BASE_PRICE.toLocaleString()} ต่อที่นั่ง คือทางที่เร็วและคุ้มที่สุดถ้าทีมคุณพร้อมลงมือเองครับ
          แต่บางองค์กร — โดยเฉพาะที่มีหลายแผนก หลายสาขา และอยากให้ทั้งบริษัทขยับไปพร้อมกัน —
          ไม่ได้อยากได้แค่คอร์ส คุณอยากได้ &ldquo;ระบบ&rdquo; ที่วางลงบนหน้างานจริงของบริษัทคุณเอง
        </p>
        <p>
          ตรงนี้แหละครับคือสิ่งที่ผมกับทีมลงไปทำให้ถึงที่ — เราเข้าไปเทรนทั้งองค์กรของคุณแบบตัวต่อตัว
          เอาระบบเดียวกับที่ผมใช้พาบริษัทตัวเองโตเกิน <span className="accent">฿100 ล้าน</span> และขยายเป็น 5 สาขาใน 1 ปีครึ่ง
          มาปรับให้เข้ากับงาน ข้อมูล และทีมของคุณโดยเฉพาะ ไม่ใช่เทมเพลตสำเร็จรูป แต่เป็นระบบที่ออกแบบรอบบริษัทคุณ
        </p>
        <ul>
          <li>เวิร์กช็อปสดกับทีมคุณถึงสำนักงาน — ปรับ {SKILL_COUNT} Cowork Skills ให้เข้ากับงานจริงของแต่ละแผนก</li>
          <li>วาง Data Governance ให้องค์กรคุณตั้งแต่แรก — กติกาว่าข้อมูลไหนใส่ได้/ใส่ไม่ได้ ปลอดภัยตามมาตรฐานบริษัทคุณ</li>
          <li>playbook เฉพาะแผนก ที่เขียนจากหน้างานจริงของคุณ ไม่ใช่ของบริษัทผม</li>
          <li>ติดตามผลหลังเทรน เพื่อให้ระบบอยู่กับทีมคุณจริงๆ ไม่ใช่จบแล้วจบเลย</li>
        </ul>
        <p>ตอนนี้ In-House Training ยังไม่เปิดขายทั่วไป — เปิดรับเป็นรอบจำกัดครับ ลงชื่อไว้ก่อน เราจะติดต่อกลับเมื่อเปิดรอบถัดไป</p>
        <a href="https://line.me/R/ti/p/@antiparallel" target="_blank" rel="noopener noreferrer" className="btn btn-inhouse">ลงชื่อรอรอบ In-House Training (LINE @antiparallel) →</a>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 28, margin: '30px 0 14px', textAlign: 'center' }}>
        คำถามที่เจ้าของธุรกิจมักถามผม…
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
        ราคาเปิดตัว ฿{BASE_PRICE.toLocaleString()}/ที่นั่ง นี้ มีจำนวนจำกัดในรอบเปิดตัวเท่านั้น
        หลังรอบนี้ราคาจะปรับขึ้น — ลองคิดดูครับว่าระบบที่พาบริษัทผมโตเกิน ฿100 ล้าน
        มันคุ้มกว่าราคามื้ออาหารทีมหนึ่งมื้อแค่ไหน
      </div>
      <div className="ps">
        <span className="hand" style={{ fontSize: 22 }}>
          P.P.S.
        </span>{' '}
        อยากซื้อหลายที่นั่งให้ทั้งแผนก หรือจัดแพ็กเกจองค์กร? ในขั้นตอนชำระเงินจะมีออปชัน Team Workshop ให้เพิ่ม
        หรือทักทีมงานเพื่อรับใบเสนอราคาองค์กร — ผมอยากเห็นทีมคุณโตเหมือนที่ทีมผมโตมาครับ
      </div>
    </div>
  );
}
