import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'ยืนยันคำสั่งซื้อ · AI ฿100M Blueprint',
  description: 'ยืนยันคำสั่งซื้อและไปยังหน้าชำระเงิน Pay Solutions',
};

export default function AI100MCheckoutPage() {
  return <CheckoutClient />;
}
