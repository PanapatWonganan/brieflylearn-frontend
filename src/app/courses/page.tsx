"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import { SearchFilter } from "@/components/SearchFilter";
import { fetchCourses, Course } from "@/lib/api";
import { CourseCardSkeleton } from "@/components/Skeleton";

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
      <div className="min-h-screen pt-24 sm:pt-28 pb-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-5">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={loadCourses}
            className="bg-mint-600 text-white px-6 py-3 rounded-sm hover:bg-mint-600/90 transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
            คอร์สเรียน
          </p>
          <h1 className="text-heading mb-4">
            คอร์ส AI ครบทุกเส้นทาง
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
            เลือกคอร์ส AI ที่เหมาะกับเป้าหมายของคุณ ทั้งสร้างธุรกิจด้วย AI และบริหารองค์กรอย่างชาญฉลาด
          </p>
        </div>

        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* Results Count */}
        <div className="mb-6 sm:mb-12">
          <p className="text-gray-400">
            แสดงผล {filteredCourses.length} จาก {courses.length} คอร์ส
            {searchQuery && (
              <span className="text-mint-400 font-medium">
                {" "}
                สำหรับ &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              ไม่พบคอร์สที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-400 mb-6">
              ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อหาคอร์สที่เหมาะสำหรับคุณ
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ category: "", level: "", priceRange: "", duration: "" });
                setFilteredCourses(courses);
              }}
              className="bg-mint-600 text-white px-6 py-3 rounded-sm hover:bg-mint-600/90 transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && filteredCourses.length >= 9 && (
          <div className="text-center mt-12">
            <button className="border border-gray-700 text-gray-200 px-8 py-3 rounded-sm hover:border-gray-600 transition-colors font-medium">
              โหลดคอร์สเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
