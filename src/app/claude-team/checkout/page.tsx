import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'ยืนยันคำสั่งซื้อ · Claude Cowork for Teams',
  description: 'ยืนยันคำสั่งซื้อและไปยังหน้าชำระเงิน Pay Solutions',
};

export default function ClaudeTeamCheckoutPage() {
  return <CheckoutClient />;
}
