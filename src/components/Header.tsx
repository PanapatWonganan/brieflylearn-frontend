"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Bell, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContextNew";
import { useNotificationHelpers, useNotification } from "@/contexts/NotificationContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading, isAuthenticated } = useAuth();
  const { success, error } = useNotificationHelpers();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotification();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      success("ออกจากระบบแล้ว", "ขอบคุณที่ใช้บริการ Antipararell");
      setIsMenuOpen(false);
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
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div
          className={`relative flex h-14 items-center justify-between gap-3 rounded-sm px-3 transition-all duration-300 ${
            scrolled
              ? "bg-gray-900/90 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs"
              : "bg-transparent"
          }`}
        >
          {/* Logo — DNA Mark + Wordmark */}
          <Link href="/" className="flex items-center gap-2">
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

          {/* Desktop Navigation — simple underline hover */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-gray-300 hover:text-gray-200 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-200 hover:after:w-full after:transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-200 transition-colors"
                aria-label="แจ้งเตือน"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-sm shadow-xl border border-gray-700/50 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-200">การแจ้งเตือน</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-gray-500 hover:text-gray-200"
                      >
                        อ่านทั้งหมด
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                      ไม่มีการแจ้งเตือน
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-800 hover:bg-gray-800/40 cursor-pointer transition-colors ${
                            !n.read ? "bg-gray-900/50" : ""
                          }`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                !n.read ? "bg-mint-500" : "bg-transparent"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-200 truncate">
                                  {n.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(n.id);
                                  }}
                                  className="text-gray-700 hover:text-gray-500 ml-2"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              {n.message && (
                                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                              )}
                              {n.timestamp && (
                                <p className="text-xs text-gray-700 mt-1">{formatTime(n.timestamp)}</p>
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
              className="hidden sm:block text-sm text-gray-500 hover:text-gray-200 transition-colors"
            >
              <BookOpen className="h-[18px] w-[18px]" />
            </Link>

            {/* Auth */}
            {loading ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800/65 rounded-full animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-gray-200 transition-colors"
                >
                  <div className="w-7 h-7 bg-gray-800/65 rounded-full flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName || ""}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-3.5 w-3.5 text-gray-500" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.fullName || user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-400 transition-colors"
                  title="ออกจากระบบ"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-mint-400 hover:text-gray-200 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-1.5 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Click outside to close notification */}
        {isNotificationOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
        )}

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 mt-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-gray-200 py-2 px-2 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-800 mt-2 pt-3 px-2 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm text-gray-300 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 py-1 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm text-mint-400 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
