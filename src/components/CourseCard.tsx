"use client";

import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/api";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const price = parseFloat(course.price);
  const isFree = price === 0;

  return (
    <div className="bg-[#1A1A1A] border border-[rgba(0,255,180,0.12)] rounded-sm overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(0,255,180,0.3)]">
      <div className="p-6">
        {/* Level Badge */}
        {course.level && (
          <div className="mb-4">
            <span
              className="inline-block bg-[rgba(0,255,186,0.06)] text-mint-400 px-2.5 py-0.5 rounded-sm uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em' }}
            >
              {course.level}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-xl text-gray-200 mb-3 line-clamp-2 group-hover:text-mint-400 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
        >
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-gray-500 text-sm mb-3" style={{ fontWeight: 300 }}>{course.instructor}</p>

        {/* Description */}
        {course.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2" style={{ fontWeight: 300 }}>
            {course.description}
          </p>
        )}

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-gray-500 mb-6" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
          {course.duration_minutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{Math.ceil(course.duration_minutes / 60)} ชั่วโมง</span>
            </div>
          )}
          {course.lessons_count > 0 && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{course.lessons_count} บทเรียน</span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,255,180,0.08)]">
          <div>
            {isFree ? (
              <span className="text-xl font-light text-mint-400">ฟรี</span>
            ) : (
              <span className="text-xl font-light text-gray-200">
                ฿{price.toLocaleString()}
              </span>
            )}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-2 text-gray-400 hover:text-mint-400 transition-colors duration-300 group/link"
          >
            <span className="text-xs uppercase" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>เรียนรู้เพิ่มเติม</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
