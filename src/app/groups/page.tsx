"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextNew";
import { fetchMyGroups, type GroupSummary } from "@/lib/api/groups";

export default function GroupsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login?redirect=/groups");
      return;
    }
    let mounted = true;
    (async () => {
      const data = await fetchMyGroups();
      if (mounted) {
        setGroups(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, router]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
            Coaching & Community
          </p>
          <h1 className="text-heading mb-4">กลุ่มของฉัน</h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
            กลุ่ม Coaching และ Community ที่คุณเข้าร่วมจากการซื้อคอร์สหรืออัปเกรด
          </p>
        </div>

        {loading || authLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="liquid-glass p-5 h-44 animate-pulse"
                style={{ borderRadius: 2 }}
              />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="liquid-glass p-8 text-center" style={{ borderRadius: 2 }}>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              คุณยังไม่ได้เข้ากลุ่มไหน
            </h3>
            <p className="text-gray-400 mb-6">
              เมื่อคุณซื้อคอร์สที่มี Group Coaching หรือ Done-With-You Upgrade
              ระบบจะเพิ่มคุณเข้ากลุ่มอัตโนมัติ
            </p>
            <Link
              href="/courses"
              className="btn-primary inline-block"
              style={{ borderRadius: 2 }}
            >
              ดูคอร์สทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {groups.map((g) => (
              <GroupCard key={g.id} group={g} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GroupCard({ group }: { group: GroupSummary }) {
  const typeLabel =
    group.type === "coaching"
      ? "Coaching"
      : group.type === "cohort"
        ? "Cohort"
        : "Community";

  return (
    <Link
      href={`/groups/${group.slug}`}
      className="liquid-glass p-5 flex flex-col hover:shadow-glow-mint transition-shadow"
      style={{ borderRadius: 2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase text-mint-400">
          {typeLabel}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
        {group.name}
      </h3>

      {group.description && (
        <p className="text-sm text-gray-400 line-clamp-3">{group.description}</p>
      )}

      <div className="mt-auto pt-4">
        <span className="text-mint-400 text-sm">เข้าดูรายละเอียด →</span>
      </div>
    </Link>
  );
}
