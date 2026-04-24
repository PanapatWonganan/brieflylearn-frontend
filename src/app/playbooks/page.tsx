"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPlaybooks, type PlaybookSummary } from "@/lib/api/playbooks";

export default function PlaybooksPage() {
  const [playbooks, setPlaybooks] = useState<PlaybookSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchPlaybooks();
      if (mounted) {
        setPlaybooks(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
            Playbooks
          </p>
          <h1 className="text-heading mb-4">คู่มือลงมืออย่างละเอียด</h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
            Playbook คือคู่มือ HTML อ่านยาว สรุปวิธีการใช้ AI อย่างเป็นขั้นเป็นตอน
            ซื้อครั้งเดียวอ่านได้ตลอด
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="liquid-glass p-5 h-64 animate-pulse"
                style={{ borderRadius: 2 }}
              />
            ))}
          </div>
        ) : playbooks.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              ยังไม่มี Playbook ในขณะนี้
            </h3>
            <p className="text-gray-400">กลับมาตรวจสอบใหม่เร็ว ๆ นี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {playbooks.map((pb) => (
              <PlaybookCard key={pb.id} playbook={pb} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaybookCard({ playbook }: { playbook: PlaybookSummary }) {
  const price = Number(playbook.price ?? 0);
  const original = playbook.original_price ? Number(playbook.original_price) : null;
  const formattedPrice = price > 0 ? `฿${price.toLocaleString()}` : "ฟรี";

  return (
    <Link
      href={`/playbooks/${playbook.id}`}
      className="liquid-glass p-5 flex flex-col hover:shadow-glow-mint transition-shadow"
      style={{ borderRadius: 2 }}
    >
      {playbook.thumbnail_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={playbook.thumbnail_url}
          alt={playbook.title}
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

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
          {playbook.title}
        </h3>
        {playbook.description && (
          <p className="text-sm text-gray-400 line-clamp-3 mb-4">
            {playbook.description}
          </p>
        )}
      </div>

      <div className="flex items-baseline gap-2 mt-auto">
        <span className="text-mint-400 font-semibold text-lg">{formattedPrice}</span>
        {original && original > price && (
          <span className="text-gray-500 text-sm line-through">
            ฿{original.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
