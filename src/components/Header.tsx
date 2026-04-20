"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Bell, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContextNew";
import { useNotificationHelpers, useNotification } from "@/contexts/NotificationContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading, isAuthenticated } = useAuth();
  const { success, error } = useNotificationHelpers();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotification();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer with exit animation
  const closeMenu = () => {
    if (!isMenuOpen || isMenuClosing) return;
    setIsMenuClosing(true);
    window.setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 240);
  };

  // Lock body scroll + listen to ESC while drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      success("ออกจากระบบแล้ว", "ขอบคุณที่ใช้บริการ Antiparallel");
      closeMenu();
    } catch {
      error("เกิดข้อผิดพลาด", "ไม่สามารถออกจากระบบได้");
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "เมื่อสักครู่";
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    return `${days} วันที่แล้ว`;
  };

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/courses", label: "คอร์สเรียน" },
    { href: "/garden", label: "ห้องปฏิบัติการ AI" },
    { href: "/exams", label: "แบบประเมิน" },
    { href: "/results", label: "ผลการเรียน" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-6 py-3 md:py-6">
      <nav
        className={`liquid-glass rounded-full max-w-5xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "shadow-elevated" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center min-w-0">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <svg viewBox="0 0 40 24" width="24" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="sm:w-[28px] sm:h-[17px]">
              <ellipse cx="10" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <ellipse cx="20" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <ellipse cx="30" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1"/>
              <line x1="12" y1="7" x2="28" y2="7" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="10" x2="28" y2="10" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="14" x2="28" y2="14" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
              <line x1="12" y1="17" x2="28" y2="17" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5"/>
            </svg>
            <span
              className="text-white font-semibold text-sm sm:text-base tracking-tight hidden sm:inline"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Antiparallel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-6 lg:ml-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notification — visible on all sizes */}
          <div className="relative">
            <button
              onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsMenuOpen(false); }}
              className="relative p-2.5 sm:p-2 text-white/60 hover:text-white transition-colors"
              aria-label="แจ้งเตือน"
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 sm:top-1 sm:right-1 w-2 h-2 bg-mint-400 rounded-full" />
              )}
            </button>

            {isNotificationOpen && (
              <div
                className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm rounded-2xl shadow-elevated z-50 max-h-96 overflow-y-auto"
                style={{ background: '#141414', border: '1px solid rgba(0,255,186,0.12)', right: '-0.5rem' }}
              >
                <div className="p-4 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,255,186,0.08)' }}>
                  <h3 className="text-sm font-semibold text-white">การแจ้งเตือน</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-white/40 hover:text-white"
                    >
                      อ่านทั้งหมด
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-white/40 text-sm">
                    ไม่มีการแจ้งเตือน
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 hover:bg-white/5 cursor-pointer transition-colors ${
                          !n.read ? "bg-white/[0.02]" : ""
                        }`}
                        style={{ borderBottom: '1px solid rgba(0,255,186,0.05)' }}
                        onClick={() => markAsRead(n.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              !n.read ? "bg-mint-400" : "bg-transparent"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-white truncate">
                                {n.title}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(n.id);
                                }}
                                className="text-white/20 hover:text-white/50 ml-2"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {n.message && (
                              <p className="text-xs text-white/40 mt-0.5">{n.message}</p>
                            )}
                            {n.timestamp && (
                              <p className="text-xs text-white/20 mt-1">{formatTime(n.timestamp)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            href="/courses"
            className="hidden sm:flex p-2 text-white/60 hover:text-white transition-colors"
            style={{ minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
          >
            <BookOpen className="h-[18px] w-[18px]" />
          </Link>

          {/* Auth — desktop */}
          {loading ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded-full animate-pulse" />
            </div>
          ) : isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName || ""}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-3.5 w-3.5 text-white/50" />
                  )}
                </div>
                <span className="max-w-[100px] truncate hidden lg:inline">{user.fullName || user.email}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
                title="ออกจากระบบ"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          )}

          {/* Mobile menu button — larger touch target */}
          <button
            className="flex md:hidden p-2.5 text-white/80 items-center justify-center"
            onClick={() => {
              if (isMenuOpen) {
                closeMenu();
              } else {
                setIsMenuOpen(true);
                setIsNotificationOpen(false);
              }
            }}
            aria-label={isMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={isMenuOpen}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Click outside to close notification */}
      {isNotificationOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setIsNotificationOpen(false)} />
      )}

      {/* Mobile side drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 ${isMenuClosing ? 'backdrop-exit' : 'backdrop-enter'}`}
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={closeMenu}
          />

          {/* Drawer panel */}
          <aside
            className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[360px] flex flex-col ${isMenuClosing ? 'drawer-exit' : 'drawer-enter'}`}
            style={{
              background: '#0E0E0E',
              borderLeft: '1px solid rgba(0, 255, 186, 0.15)',
              boxShadow: '-16px 0 48px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid rgba(0, 255, 186, 0.08)' }}
            >
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <svg viewBox="0 0 40 24" width="28" height="17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="10" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1" />
                  <ellipse cx="20" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1" />
                  <ellipse cx="30" cy="12" rx="8" ry="8" fill="none" stroke="#00FFBA" strokeWidth="1" />
                  <line x1="12" y1="7" x2="28" y2="7" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5" />
                  <line x1="12" y1="10" x2="28" y2="10" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5" />
                  <line x1="12" y1="14" x2="28" y2="14" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5" />
                  <line x1="12" y1="17" x2="28" y2="17" stroke="#00FFBA" strokeWidth="0.5" opacity="0.5" />
                </svg>
                <span className="text-white font-semibold text-base tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                  Antiparallel
                </span>
              </Link>
              <button
                onClick={closeMenu}
                aria-label="ปิดเมนู"
                className="p-2.5 text-white/70 hover:text-white transition-colors"
                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block text-base text-white/85 hover:text-white py-4 px-4 rounded-sm hover:bg-white/5 transition-colors"
                  style={{ fontFamily: 'var(--font-thai-sans)' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth section */}
            <div
              className="px-5 py-5"
              style={{ borderTop: '1px solid rgba(0, 255, 186, 0.08)' }}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/5 rounded-full animate-pulse" />
                  <div className="h-3 w-32 bg-white/5 rounded-sm animate-pulse" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white"
                  >
                    <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center overflow-hidden">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.fullName || ""} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-white/60" />
                      )}
                    </div>
                    <span className="text-sm truncate">{user.fullName || user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 w-full text-white/50 hover:text-white/80 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">ออกจากระบบ</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 text-base font-medium py-3.5 px-4 rounded-full w-full"
                  style={{ background: '#00FFBA', color: '#0E0E0E' }}
                >
                  เข้าสู่ระบบ
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
