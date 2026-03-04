import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand — takes more space */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/logo.svg"
                alt="BrieflyLearn"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              แพลตฟอร์มพัฒนาตัวเองออนไลน์
              ที่ออกแบบมาเพื่อคนที่ต้องการเติบโต
            </p>
          </div>

          {/* Navigation columns */}
          <nav className="md:col-span-2">
            <h4 className="text-xs tracking-widest uppercase text-ink-muted mb-4">
              เรียนรู้
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/courses", label: "คอร์สทั้งหมด" },
                { href: "/exams", label: "แบบประเมิน" },
                { href: "/results", label: "ผลการเรียน" },
                { href: "/garden", label: "สวนการเรียน" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-light hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2">
            <h4 className="text-xs tracking-widest uppercase text-ink-muted mb-4">
              ช่วยเหลือ
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/help", label: "ศูนย์ช่วยเหลือ" },
                { href: "/faq", label: "คำถามที่พบบ่อย" },
                { href: "/privacy", label: "ความเป็นส่วนตัว" },
                { href: "/terms", label: "เงื่อนไขการใช้งาน" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-light hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h4 className="text-xs tracking-widest uppercase text-ink-muted mb-4">
              ติดต่อ
            </h4>
            <ul className="space-y-2.5 text-sm text-ink-light">
              <li>info@brieflylearn.com</li>
              <li>02-987-6543</li>
              <li className="leading-relaxed">
                เลขที่ 123 ถนนราชดำเนิน<br />
                เขตพระนคร กรุงเทพฯ 10200
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-14 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} BrieflyLearn
          </p>
          <div className="flex gap-6">
            {[
              { href: "/privacy", label: "ความเป็นส่วนตัว" },
              { href: "/terms", label: "เงื่อนไขการใช้" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-ink-faint hover:text-ink-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
