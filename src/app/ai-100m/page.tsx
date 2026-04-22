import type { Metadata } from 'next';
import SalesLetterClient from './SalesLetterClient';

export const metadata: Metadata = {
  title: 'AI ฿100M Blueprint — จดหมายเปิดผนึก',
  description:
    'Playbook เดียวที่ผมจะใช้สร้างบริษัท 100 ล้านจาก 0 โดยเริ่มจาก AI เป็นประตูบานแรก',
};

export default function AI100MPage() {
  return <SalesLetterClient />;
}
