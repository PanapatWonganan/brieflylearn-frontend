"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/CourseCard";
import { SearchFilter } from "@/components/SearchFilter";
import { fetchCourses, Course } from "@/lib/api";

interface FilterOptions {
  category: string;
  level: string;
  priceRange: string;
  duration: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    level: "",
    priceRange: "",
    duration: "",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    
    const result = await fetchCourses();
    
    if (result.error) {
      setError(result.error);
      // Fallback to hardcoded data if API fails
      setCourses(allCourses.map(course => ({
        id: course.id.toString(),
        title: course.title,
        description: course.description || '',
        instructor: course.instructor,
        price: course.price.toString(),
        level: course.level,
        lessons_count: 0,
        duration_minutes: null,
        created_at: new Date().toISOString(),
        free_preview: null
      })));
      setFilteredCourses(courses);
    } else if (result.data) {
      setCourses(result.data);
      setFilteredCourses(result.data);
    }
    
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query: string, filterOptions: FilterOptions) => {
    let filtered = courses;

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Level filter
    if (filterOptions.level) {
      filtered = filtered.filter((course) => course.level === filterOptions.level);
    }

    // Price range filter
    if (filterOptions.priceRange) {
      filtered = filtered.filter((course) => {
        const price = parseFloat(course.price);
        switch (filterOptions.priceRange) {
          case "ฟรี":
            return price === 0;
          case "1,000-2,000 บาท":
            return price >= 1000 && price <= 2000;
          case "2,001-3,000 บาท":
            return price >= 2001 && price <= 3000;
          case "3,001-5,000 บาท":
            return price >= 3001 && price <= 5000;
          case "มากกว่า 5,000 บาท":
            return price > 5000;
          default:
            return true;
        }
      });
    }

    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดคอร์สเรียน...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadCourses}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            คอร์สพัฒนาตัวเองครบครัน
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เลือกคอร์สที่เหมาะกับเป้าหมายของคุณ พัฒนาทักษะ สร้างความเชี่ยวชาญ และก้าวสู่ความสำเร็จ
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>📚 {courses.length} คอร์ส</span>
            <span>👩‍🏫 15+ อาจารย์ผู้เชี่ยวชาญ</span>
            <span>⭐ 4.9 คะแนนเฉลี่ย</span>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            แสดงผล {filteredCourses.length} จาก {courses.length} คอร์ส
            {searchQuery && (
              <span className="text-orange-600 font-medium">
                {" "}
                สำหรับ &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredCourses.map((course, index) => {
            // Convert API course data to CourseCard expected format
            const courseCardData = {
              id: parseInt(course.id) || index + 1,
              title: course.title,
              instructor: course.instructor,
              duration: course.duration_minutes ? `${Math.ceil(course.duration_minutes / 60)} ชั่วโมง` : '8 สัปดาห์',
              students: course.lessons_count * 100 || 500, // Estimated students based on lessons
              rating: 4.8, // Default rating
              price: parseFloat(course.price) || 0,
              originalPrice: parseFloat(course.price) * 1.4 || 1000, // Estimate original price
              image: "/course-placeholder.jpg",
              category: "การสอบราชการ",
              description: course.description,
              level: course.level || 'เริ่มต้น'
            };
            return (
              <CourseCard key={course.id} course={courseCardData} index={index} />
            );
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ไม่พบคอร์สที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-600 mb-6">
              ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อหาคอร์สที่เหมาะสำหรับคุณ
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ category: "", level: "", priceRange: "", duration: "" });
                setFilteredCourses(courses);
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && filteredCourses.length >= 9 && (
          <div className="text-center mt-12">
            <button className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-transparent transition-colors font-medium">
              โหลดคอร์สเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Personal development courses
const allCourses = [
  {
    id: 1,
    title: "ภาวะผู้นำและการจัดการทีม",
    instructor: "ดร.สมชาย ผู้นำดี",
    duration: "12 สัปดาห์",
    students: 2850,
    rating: 4.9,
    price: 3990,
    originalPrice: 5990,
    image: "/course-leadership.jpg",
    category: "ภาวะผู้นำ",
    level: "เริ่มต้น",
    description: "พัฒนาทักษะการเป็นผู้นำ การสร้างทีม และการบริหารจัดการอย่างมีประสิทธิภาพ"
  },
  {
    id: 2,
    title: "สติและการจัดการอารมณ์",
    instructor: "อาจารย์จิตรา ใจเย็น",
    duration: "10 สัปดาห์",
    students: 2100,
    rating: 4.8,
    price: 2990,
    originalPrice: 4490,
    image: "/course-mindfulness.jpg",
    category: "พัฒนาจิตใจ",
    level: "เริ่มต้น",
    description: "เรียนรู้การฝึกสติ ควบคุมอารมณ์ และสร้างความสมดุลในชีวิต"
  },
  {
    id: 3,
    title: "การสื่อสารและการนำเสนออย่างมืออาชีพ",
    instructor: "ผศ.ดร.วิภา พูดเก่ง",
    duration: "8 สัปดาห์",
    students: 1675,
    rating: 4.9,
    price: 2490,
    originalPrice: 3490,
    image: "/course-communication.jpg",
    category: "ทักษะการสื่อสาร",
    level: "กลาง",
    description: "ฝึกทักษะการสื่อสาร การนำเสนอ และการโน้มน้าวใจอย่างมืออาชีพ"
  },
  {
    id: 4,
    title: "การบริหารเวลาและเพิ่มประสิทธิภาพ",
    instructor: "อาจารย์ประสิทธิ์ จัดการดี",
    duration: "6 สัปดาห์",
    students: 890,
    rating: 4.7,
    price: 3490,
    originalPrice: 4990,
    image: "/course-time-management.jpg",
    category: "ประสิทธิภาพ",
    level: "เริ่มต้น",
    description: "เรียนรู้การบริหารเวลา จัดการงาน และเพิ่มผลผลิตอย่างมีประสิทธิภาพ"
  },
  {
    id: 5,
    title: "การวางแผนการเงินส่วนบุคคล",
    instructor: "อาจารย์จิรายุ เงินงาม",
    duration: "10 สัปดาห์",
    students: 1820,
    rating: 4.8,
    price: 1990,
    originalPrice: 2990,
    image: "/course-finance.jpg",
    category: "การเงินส่วนบุคคล",
    level: "เริ่มต้น",
    description: "วางแผนการเงิน การออม การลงทุน และบริหารหนี้สินอย่างชาญฉลาด"
  },
  {
    id: 6,
    title: "ความคิดสร้างสรรค์และนวัตกรรม",
    instructor: "ดร.สุพิชฌาย์ คิดสร้างสรรค์",
    duration: "14 สัปดาห์",
    students: 1540,
    rating: 4.9,
    price: 4490,
    originalPrice: 5990,
    image: "/course-creativity.jpg",
    category: "ความคิดสร้างสรรค์",
    level: "เริ่มต้น",
    description: "พัฒนาความคิดสร้างสรรค์ การคิดนอกกรอบ และการสร้างนวัตกรรม"
  },
  {
    id: 7,
    title: "การตัดสินใจและการแก้ปัญหา",
    instructor: "ผศ.ดร.สมพงษ์ คิดเป็น",
    duration: "12 สัปดาห์",
    students: 980,
    rating: 4.8,
    price: 3990,
    originalPrice: 5490,
    image: "/course-decision-making.jpg",
    category: "ทักษะการคิด",
    level: "กลาง",
    description: "เรียนรู้การตัดสินใจอย่างมีเหตุผล การวิเคราะห์ และการแก้ปัญหาอย่างเป็นระบบ"
  },
  {
    id: 8,
    title: "การสร้างนิสัยที่ดีและวินัยในตัวเอง",
    instructor: "อาจารย์สมชาติ วินัยดี",
    duration: "8 สัปดาห์",
    students: 750,
    rating: 4.7,
    price: 2990,
    originalPrice: 3990,
    image: "/course-habits.jpg",
    category: "การพัฒนาตัวเอง",
    level: "เริ่มต้น",
    description: "สร้างนิสัยที่ดี พัฒนาวินัย และเปลี่ยนแปลงตัวเองอย่างยั่งยืน"
  },
  {
    id: 9,
    title: "ทักษะการเจรจาต่อรองและการโน้มน้าวใจ",
    instructor: "อาจารย์เศรษฐา ต่อรองเก่ง",
    duration: "10 สัปดาห์",
    students: 1200,
    rating: 4.9,
    price: 3490,
    originalPrice: 4990,
    image: "/course-negotiation.jpg",
    category: "ทักษะการสื่อสาร",
    level: "กลาง",
    description: "พัฒนาทักษะการเจรจาต่อรอง การโน้มน้าวใจ และการสร้าง Win-Win"
  },
  {
    id: 10,
    title: "Digital Literacy สำหรับยุคดิจิทัล",
    instructor: "ดร.เทคโน ดิจิทัลเทค",
    duration: "12 สัปดาห์",
    students: 1100,
    rating: 4.8,
    price: 4490,
    originalPrice: 5990,
    image: "/course-digital.jpg",
    category: "เทคโนโลยี",
    level: "กลาง",
    description: "เรียนรู้เครื่องมือดิจิทัล เทคโนโลยีใหม่ๆ และการทำงานในยุคดิจิทัล"
  },
  {
    id: 11,
    title: "ศิลปะการเขียนและการสื่อสาร",
    instructor: "อาจารย์สมศักดิ์ เขียนดี",
    duration: "16 สัปดาห์",
    students: 850,
    rating: 4.9,
    price: 5490,
    originalPrice: 7490,
    image: "/course-writing.jpg",
    category: "ทักษะการสื่อสาร",
    level: "สูง",
    description: "พัฒนาทักษะการเขียน การสื่อสาร และการนำเสนอเนื้อหาอย่างมืออาชีพ"
  },
  {
    id: 12,
    title: "คอร์สรวมพัฒนาตัวเองครบครัน",
    instructor: "ทีม BrieflyLearn Pro",
    duration: "ตลอดชีพ",
    students: 3200,
    rating: 5.0,
    price: 1990,
    originalPrice: 2990,
    image: "/course-comprehensive.jpg",
    category: "ครบครัน",
    level: "ทุกระดับ",
    description: "คอร์สรวมพัฒนาตัวเองทุกด้าน ตั้งแต่ระดับต้นจนถึงระดับสูง อัพเดทเนื้อหาใหม่ล่าสุด"
  }
]; 