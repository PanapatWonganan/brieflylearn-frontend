import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BrieflyLearn</span>
            </div>
            <p className="text-gray-300 text-sm">
              แพลตฟอร์มคอร์สพัฒนาตัวเองออนไลน์ เรียนรู้ทักษะใหม่ๆ พัฒนาตัวเองอย่างต่อเนื่อง
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  คอร์สเรียนทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  แบบประเมิน
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  ผลการเรียน
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  บทความ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">ช่วยเหลือ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  ศูนย์ช่วยเหลือ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  เงื่อนไขการใช้งาน
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@brieflylearn.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>02-987-6543</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>เลขที่ 123 ถนนราชดำเนิน เขตพระนคร กรุงเทพมหานคร 10200</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 BrieflyLearn. สงวนลิขสิทธิ์ทุกประการ.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
            >
              ความเป็นส่วนตัว
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
            >
              เงื่อนไขการใช้
            </Link>
            <Link
              href="/cookies"
              className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
            >
              นโยบายคุกกี้
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}