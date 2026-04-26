"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextNew";
import { fetchGroup, type GroupDetail } from "@/lib/api/groups";

export default function GroupDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?redirect=/groups/${params.slug}`);
      return;
    }
    let mounted = true;
    (async () => {
      const data = await fetchGroup(params.slug);
      if (!mounted) return;
      if (!data) {
        setNotFound(true);
      } else {
        setGroup(data);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, params.slug, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div
            className="liquid-glass p-8 h-64 animate-pulse"
            style={{ borderRadius: 2 }}
          />
        </div>
      </div>
    );
  }

  if (notFound || !group) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="liquid-glass p-8 text-center" style={{ borderRadius: 2 }}>
            <h1 className="text-2xl font-semibold text-gray-100 mb-3">
              ไม่พบกลุ่ม หรือคุณยังไม่ได้เป็นสมาชิก
            </h1>
            <p className="text-gray-400 mb-6">
              ตรวจสอบ URL อีกครั้ง หรือเข้าร่วมผ่านการซื้อคอร์ส/Upgrade
            </p>
            <Link href="/groups" className="btn-secondary inline-block" style={{ borderRadius: 2 }}>
              ← กลับไปหน้ากลุ่มของฉัน
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const typeLabel =
    group.type === "coaching"
      ? "Coaching"
      : group.type === "cohort"
        ? "Cohort"
        : "Community";

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="mb-6">
          <Link href="/groups" className="text-mint-400 text-sm hover:underline">
            ← กลุ่มทั้งหมด
          </Link>
        </div>

        <div className="liquid-glass p-6 sm:p-8 mb-6" style={{ borderRadius: 2 }}>
          <p className="text-xs tracking-widest uppercase text-mint-400 mb-3">
            {typeLabel}
            {group.max_members ? ` · รับ ${group.max_members} คน/รุ่น` : ""}
          </p>
          <h1 className="text-heading mb-4">{group.name}</h1>
          {group.description && (
            <p className="text-base text-gray-300 whitespace-pre-line">
              {group.description}
            </p>
          )}
        </div>

        <div className="liquid-glass p-6 sm:p-8 mb-6" style={{ borderRadius: 2 }}>
          <h2 className="text-subheading mb-4">การประชุม / Zoom</h2>

          {group.zoom_link ? (
            <div className="mb-4">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                Zoom Link
              </p>
              <a
                href={group.zoom_link}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mint-400 break-all hover:underline"
              >
                {group.zoom_link}
              </a>
            </div>
          ) : (
            <p className="text-gray-400 mb-4">
              ทีมงานจะอัปเดต Zoom link ที่นี่ก่อนเริ่มรุ่น
            </p>
          )}

          {group.meeting_schedule && (
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                ตารางประชุม
              </p>
              <p className="text-gray-200 whitespace-pre-line">
                {group.meeting_schedule}
              </p>
            </div>
          )}
        </div>

        {group.resources.length > 0 && (
          <div className="liquid-glass p-6 sm:p-8 mb-6" style={{ borderRadius: 2 }}>
            <h2 className="text-subheading mb-4">Resources / Replay</h2>
            <ul className="space-y-2">
              {group.resources.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-mint-400 hover:underline"
                  >
                    {r.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-xs text-gray-500">
          สมาชิกในกลุ่ม: {group.members_count}
          {group.max_members ? ` / ${group.max_members}` : ""}
        </div>
      </div>
    </div>
  );
}
