"use client";

import { motion } from "framer-motion";
import { Play, Star, Users, Clock, BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    description?: string;
    level?: string;
  };
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const discountPercent = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200 w-full max-w-sm mx-auto sm:max-w-none"
    >
      <div className="relative h-48 bg-gradient-to-br from-orange-600 to-orange-700 overflow-hidden">
        {/* Video Preview Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
          >
            <Play className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 hover:bg-white/30 transition-colors"
        >
          <BookOpen
            className={`h-5 w-5 ${
              isFavorited ? "text-orange-500 fill-current" : "text-white"
            }`}
          />
        </button>

        {/* Level Badge */}
        {course.level && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/30 text-white px-2 py-1 rounded text-xs">
              {course.level}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 font-medium">{course.instructor}</p>
        
        {course.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-orange-600">
                ฿{course.price.toLocaleString()}
              </span>
              {course.originalPrice !== course.price && (
                <span className="text-gray-400 line-through text-base sm:text-lg">
                  ฿{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.id}`} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors font-medium text-sm sm:text-base"
            >
              เริ่มเรียนเลย
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 