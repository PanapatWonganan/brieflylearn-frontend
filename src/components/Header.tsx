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
      success("ออกจากระบบแล้ว", "ขอบคุณที่ใช้บริการ BrieflyLearn");
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="BrieflyLearn"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation — simple underline hover */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-ink-light hover:text-ink transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-ink hover:after:w-full after:transition-all"
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
                className="relative p-2 text-ink-muted hover:text-ink transition-colors"
                aria-label="แจ้งเตือน"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-card border border-gray-100 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-ink">การแจ้งเตือน</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-ink-muted hover:text-ink"
                      >
                        อ่านทั้งหมด
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-ink-muted text-sm">
                      ไม่มีการแจ้งเตือน
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-50 hover:bg-sand-50 cursor-pointer transition-colors ${
                            !n.read ? "bg-sand-50" : ""
                          }`}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                !n.read ? "bg-brand-600" : "bg-transparent"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-ink truncate">
                                  {n.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(n.id);
                                  }}
                                  className="text-ink-faint hover:text-ink-muted ml-2"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              {n.message && (
                                <p className="text-xs text-ink-muted mt-0.5">{n.message}</p>
                              )}
                              {n.timestamp && (
                                <p className="text-xs text-ink-faint mt-1">{formatTime(n.timestamp)}</p>
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
              className="hidden sm:block text-sm text-ink-muted hover:text-ink transition-colors"
            >
              <BookOpen className="h-[18px] w-[18px]" />
            </Link>

            {/* Auth */}
            {loading ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-ink-light hover:text-ink transition-colors"
                >
                  <div className="w-7 h-7 bg-sand-200 rounded-full flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName || ""}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-3.5 w-3.5 text-ink-muted" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.fullName || user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-ink-faint hover:text-error transition-colors"
                  title="ออกจากระบบ"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-ink-light hover:text-ink transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-1.5 text-ink-light"
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
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-light hover:text-ink py-2 px-2 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-3 px-2 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm text-ink-light py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm text-ink-muted hover:text-error py-1 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm text-brand-600 py-1"
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
