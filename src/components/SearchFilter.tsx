"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  category: string;
  level: string;
  priceRange: string;
  duration: string;
}

export function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    level: "",
    priceRange: "",
    duration: "",
  });

  const categories = [
    "ทั้งหมด",
    "ภาวะผู้นำ",
    "สติและจิตใจ",
    "การสื่อสาร",
    "ประสิทธิภาพ",
    "การเงินส่วนบุคคล",
    "ทักษะการคิด",
    "ความสัมพันธ์"
  ];

  const levels = [
    "ทั้งหมด",
    "เริ่มต้น",
    "กลาง",
    "สูง",
    "ทุกระดับ"
  ];

  const priceRanges = [
    "ทั้งหมด",
    "ฟรี",
    "1,000-2,000 บาท",
    "2,001-3,000 บาท",
    "3,001-5,000 บาท",
    "มากกว่า 5,000 บาท"
  ];

  const durations = [
    "ทั้งหมด",
    "น้อยกว่า 1 สัปดาห์",
    "1-4 สัปดาห์",
    "1-3 เดือน",
    "มากกว่า 3 เดือน"
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: "",
      level: "",
      priceRange: "",
      duration: "",
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "");

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ink-muted" />
        <input
          type="text"
          placeholder="ค้นหาคอร์สที่คุณสนใจ..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-ink placeholder:text-ink-muted"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>ตัวกรอง</span>
          {hasActiveFilters && (
            <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
              {Object.values(filters).filter(f => f !== "").length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-ink-light hover:text-ink transition-colors text-sm"
          >
            <X className="h-4 w-4" />
            <span>ล้างตัวกรอง</span>
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100"
          style={{
            opacity: showFilters ? 1 : 0,
            maxHeight: showFilters ? '500px' : '0',
            transition: 'opacity 0.3s ease, max-height 0.3s ease'
          }}
        >
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              หมวดหมู่
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink"
            >
              {categories.map((category) => (
                <option key={category} value={category === "ทั้งหมด" ? "" : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              ระดับความยาก
            </label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink"
            >
              {levels.map((level) => (
                <option key={level} value={level === "ทั้งหมด" ? "" : level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              ช่วงราคา
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range === "ทั้งหมด" ? "" : range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              ระยะเวลาโปรแกรม
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-ink"
            >
              {durations.map((duration) => (
                <option key={duration} value={duration === "ทั้งหมด" ? "" : duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
