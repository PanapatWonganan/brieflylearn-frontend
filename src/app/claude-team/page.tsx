import type { Metadata } from 'next';
import SalesLetterClient from './SalesLetterClient';

export const metadata: Metadata = {
  title: 'Claude Cowork สำหรับองค์กร — ติดอาวุธทีมด้วย AI 129 สกิล',
  description:
    'เปลี่ยนทั้งทีมให้ทำงานกับ Claude เป็น โดยใช้ Cowork Skills 129 ตัวที่พร้อมใช้ทันที ลดเวลางานซ้ำ เพิ่มผลผลิตทั้งองค์กร',
};

export default function ClaudeTeamPage() {
  return <SalesLetterClient />;
}
