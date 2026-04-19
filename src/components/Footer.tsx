import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top — Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Learn */}
          <div className="space-y-4">
            <h3
              className="text-white/40 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
            >
              เรียนรู้
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/courses", label: "คอร์สทั้งหมด" },
                { href: "/exams", label: "แบบประเมิน" },
                { href: "/results", label: "ผลการเรียน" },
                { href: "/garden", label: "ห้องปฏิบัติการ AI" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3
              className="text-white/40 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
            >
              ช่วยเหลือ
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/help", label: "ศูนย์ช่วยเหลือ" },
                { href: "/faq", label: "คำถามที่พบบ่อย" },
                { href: "/contact", label: "ติดต่อเรา" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3
              className="text-white/40 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
            >
              เกี่ยวกับ
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "เกี่ยวกับเรา" },
                { href: "/blog", label: "บทความ" },
                { href: "/privacy", label: "ความเป็นส่วนตัว" },
                { href: "/terms", label: "เงื่อนไขการใช้งาน" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3
              className="text-white/40 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
            >
              ติดต่อ
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>info@antiparallel.com</li>
              <li>02-987-6543</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 40 24" width="24" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <ellipse cx="10" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <ellipse cx="20" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <ellipse cx="30" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <line x1="12" y1="7" x2="28" y2="7" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="10" x2="28" y2="10" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="14" x2="28" y2="14" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="17" x2="28" y2="17" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
            </svg>
            <span
              className="text-white font-semibold text-sm"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Antiparallel
            </span>
          </Link>
          <div className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Antiparallel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
