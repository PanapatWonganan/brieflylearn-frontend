"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchMyPlaybooks, type OwnedPlaybook } from "@/lib/api/playbooks";
import { useAuth } from "@/contexts/AuthContextNew";

export default function MyPlaybooksPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [playbooks, setPlaybooks] = useState<OwnedPlaybook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login?redirect=/my-playbooks");
      return;
    }
    let mounted = true;
    (async () => {
      const data = await fetchMyPlaybooks();
      if (mounted) {
        setPlaybooks(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="liquid-glass p-8 animate-pulse h-64" style={{ borderRadius: 2 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
            คลังของฉัน
          </p>
          <h1 className="text-heading mb-4">Playbook ของฉัน</h1>
          <p className="text-base text-gray-400">
            Playbook ทั้งหมดที่คุณซื้อไว้ อ่านได้ไม่จำกัด
          </p>
        </div>

        {playbooks.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              คุณยังไม่มี Playbook
            </h3>
            <p className="text-gray-400 mb-6">เริ่มต้นเลือก Playbook เล่มแรกของคุณ</p>
            <Link
              href="/playbooks"
              className="bg-mint-600 text-white px-6 py-3 hover:bg-mint-600/90 transition-colors font-medium inline-block"
              style={{ borderRadius: 2 }}
            >
              ดู Playbook ทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {playbooks.map((pb) => (
              <Link
                key={pb.id}
                href={`/playbooks/${pb.id}`}
                className="liquid-glass p-5 flex flex-col hover:shadow-glow-mint transition-shadow"
                style={{ borderRadius: 2 }}
              >
                {pb.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pb.thumbnail_url}
                    alt={pb.title}
                    className="w-full h-36 object-cover mb-4"
                    style={{ borderRadius: 2 }}
                  />
                ) : (
                  <div
                    className="w-full h-36 mb-4 flex items-center justify-center"
                    style={{
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, rgba(0,255,186,0.08), rgba(0,255,186,0.02))",
                      border: "1px solid rgba(0,255,186,0.15)",
                    }}
                  >
                    <span className="text-mint-400 text-xs tracking-widest uppercase">
                      Playbook
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
                  {pb.title}
                </h3>
                {pb.description && (
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {pb.description}
                  </p>
                )}
                <div className="mt-4 text-mint-400 text-sm font-medium">
                  เปิดอ่าน →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
