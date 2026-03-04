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
    <div className="bg-white border border-gray-100/60 shadow-card rounded-lg overflow-hidden transition-colors group">
      <div className="p-6">
        {/* Level Badge */}
        {course.level && (
          <div className="mb-4">
            <span className="inline-block bg-sand-50 text-ink-muted text-xs font-medium px-3 py-1 rounded-full">
              {course.level}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-ink mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-ink-light mb-3">{course.instructor}</p>

        {/* Description */}
        {course.description && (
          <p className="text-ink-muted text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-ink-muted mb-6">
          {course.duration_minutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.ceil(course.duration_minutes / 60)} ชั่วโมง</span>
            </div>
          )}
          {course.lessons_count > 0 && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons_count} บทเรียน</span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {isFree ? (
              <span className="text-2xl font-bold text-brand-600">ฟรี</span>
            ) : (
              <span className="text-2xl font-bold text-ink">
                ฿{price.toLocaleString()}
              </span>
            )}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-2 text-ink hover:text-brand-600 transition-colors group/link"
          >
            <span className="text-sm font-medium">เรียนรู้เพิ่มเติม</span>
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
