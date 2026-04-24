"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { fetchPlaybook, type PlaybookDetail } from "@/lib/api/playbooks";
import { useAuth } from "@/contexts/AuthContextNew";

export default function PlaybookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const playbookId = (params?.id as string) || "";

  const [playbook, setPlaybook] = useState<PlaybookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!playbookId) return;
    let mounted = true;
    (async () => {
      const data = await fetchPlaybook(playbookId);
      if (!mounted) return;
      if (!data) {
        setNotFound(true);
      } else {
        setPlaybook(data);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [playbookId]);

  const sanitizedHtml = useMemo(() => {
    const raw = playbook?.lesson?.html_content;
    if (!raw) return null;
    return DOMPurify.sanitize(raw, {
      USE_PROFILES: { html: true },
    });
  }, [playbook?.lesson?.html_content]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="liquid-glass p-8 animate-pulse h-96" style={{ borderRadius: 2 }} />
        </div>
      </div>
    );
  }

  if (notFound || !playbook) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-5">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">ไม่พบ Playbook</h1>
          <p className="text-gray-400 mb-6">
            Playbook ที่คุณกำลังหาไม่มีอยู่ หรือถูกนำออกแล้ว
          </p>
          <Link
            href="/playbooks"
            className="bg-mint-600 text-white px-6 py-3 hover:bg-mint-600/90 transition-colors"
            style={{ borderRadius: 2 }}
          >
            กลับสู่หน้ารายการ Playbook
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(playbook.price ?? 0);
  const original = playbook.original_price ? Number(playbook.original_price) : null;

  // Paid & content ready → show the reader
  if (playbook.user_has_paid_access && sanitizedHtml) {
    return (
      <div className="min-h-screen pt-24 sm:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-6">
            <Link
              href="/my-playbooks"
              className="text-mint-400 hover:text-mint-300 text-sm"
            >
              ← Playbook ของฉัน
            </Link>
          </div>
          <h1 className="text-heading mb-8">{playbook.title}</h1>
          <article
            className="playbook-article text-gray-200"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>
      </div>
    );
  }

  // Unpaid landing — show pitch + purchase CTA
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="liquid-glass p-6 sm:p-10" style={{ borderRadius: 2 }}>
          {playbook.thumbnail_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={playbook.thumbnail_url}
              alt={playbook.title}
              className="w-full h-64 object-cover mb-8"
              style={{ borderRadius: 2 }}
            />
          )}

          <p className="text-xs tracking-widest uppercase text-mint-400 mb-3">
            Playbook
          </p>
          <h1 className="text-heading mb-4">{playbook.title}</h1>

          {playbook.description && (
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
              {playbook.description}
            </p>
          )}

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-mint-400">
                {price > 0 ? `฿${price.toLocaleString()}` : "ฟรี"}
              </span>
              {original && original > price && (
                <span className="text-gray-500 text-lg line-through">
                  ฿{original.toLocaleString()}
                </span>
              )}
            </div>

            {!isAuthenticated ? (
              <button
                onClick={() =>
                  router.push(`/login?redirect=/playbooks/${playbookId}`)
                }
                className="bg-mint-600 text-white px-6 py-3 hover:bg-mint-600/90 transition-colors font-medium"
                style={{ borderRadius: 2 }}
              >
                เข้าสู่ระบบเพื่อซื้อ
              </button>
            ) : (
              <button
                onClick={() => router.push(`/playbooks/${playbookId}/checkout`)}
                className="bg-mint-600 text-white px-6 py-3 hover:bg-mint-600/90 transition-colors font-medium"
                style={{ borderRadius: 2 }}
              >
                ซื้อเพื่ออ่าน
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          <p>
            ซื้อครั้งเดียว — อ่านได้ตลอด ทุกที่ เข้าถึงผ่านหน้า{" "}
            <Link href="/my-playbooks" className="text-mint-400 hover:text-mint-300">
              Playbook ของฉัน
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
