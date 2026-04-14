import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Footer background glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 opacity-20" aria-hidden="true">
          <div className="h-[300px] w-[800px] rounded-full bg-mint-500/10 blur-[128px]" />
        </div>

        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          {/* 1st block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">เรียนรู้</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/courses", label: "คอร์สทั้งหมด" },
                { href: "/exams", label: "แบบประเมิน" },
                { href: "/results", label: "ผลการเรียน" },
                { href: "/garden", label: "ห้องปฏิบัติการ AI" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mint-200/65 transition hover:text-mint-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2nd block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">ช่วยเหลือ</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/help", label: "ศูนย์ช่วยเหลือ" },
                { href: "/faq", label: "คำถามที่พบบ่อย" },
                { href: "/contact", label: "ติดต่อเรา" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mint-200/65 transition hover:text-mint-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">เกี่ยวกับ</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "เกี่ยวกับเรา" },
                { href: "/blog", label: "บทความ" },
                { href: "/privacy", label: "ความเป็นส่วนตัว" },
                { href: "/terms", label: "เงื่อนไขการใช้งาน" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mint-200/65 transition hover:text-mint-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">ติดต่อ</h3>
            <ul className="space-y-2 text-sm text-mint-200/65">
              <li>info@antipararell.com</li>
              <li>02-987-6543</li>
            </ul>
          </div>

          {/* 5th block — Logo & social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <Link href="/" className="inline-flex items-center gap-2">
                <svg viewBox="0 0 40 24" width="28" height="17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="10" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
                  <ellipse cx="20" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
                  <ellipse cx="30" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
                  <line x1="12" y1="7" x2="28" y2="7" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="12" y1="10" x2="28" y2="10" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="12" y1="14" x2="28" y2="14" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="12" y1="17" x2="28" y2="17" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
                </svg>
                <span className="text-mint-400 text-sm font-light tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                  antipararell
                </span>
              </Link>
            </div>
            <div className="text-sm">
              <p className="mb-3 text-mint-200/65">
                &copy; {new Date().getFullYear()} Antipararell
                <span className="text-gray-700"> &middot; </span>
                <Link
                  href="/terms"
                  className="text-mint-200/65 transition hover:text-mint-500"
                >
                  เงื่อนไข
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
