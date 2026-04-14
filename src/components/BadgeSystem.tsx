'use client';

import React from 'react';
import { Trophy, Lock, Calendar } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  progress?: number;
  date?: string;
  category: 'health' | 'community' | 'achievement' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeSystemProps {
  badges: Badge[];
  showProgress?: boolean;
  layout?: 'grid' | 'list';
  maxDisplay?: number;
}

export function BadgeSystem({
  badges,
  showProgress = true,
  layout = 'grid',
  maxDisplay
}: BadgeSystemProps) {
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;

  const getRarityLabel = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'Common';
      case 'rare':
        return 'Rare';
      case 'epic':
        return 'Epic';
      case 'legendary':
        return 'Legendary';
    }
  };

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {displayBadges.map((badge) => {
          return (
            <div
              key={badge.id}
              className={`flex items-center space-x-4 p-4 rounded-sm border transition-all duration-300 ${
                badge.earned
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-gray-800/50 border-gray-700/50 opacity-60'
              }`}
            >
              <div className="relative">
                <div className={`text-4xl ${badge.earned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                {!badge.earned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${badge.earned ? 'text-gray-200' : 'text-gray-500'}`}>
                    {badge.name}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {getRarityLabel(badge.rarity)}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-2">{badge.description}</p>

                {badge.earned && badge.date && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>ได้รับเมื่อ: {new Date(badge.date).toLocaleDateString('th-TH')}</span>
                  </div>
                )}

                {!badge.earned && badge.progress && showProgress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-mint-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Grid layout
  return (
    <div className="grid grid-cols-3 gap-3">
      {displayBadges.map((badge) => {
        return (
          <div
            key={badge.id}
            className={`relative p-3 rounded-sm text-center transition-all duration-300 group cursor-pointer ${
              badge.earned
                ? 'bg-gray-900 border border-gray-700'
                : 'bg-gray-800 border border-gray-700/50 opacity-60'
            }`}
          >
            <div className="relative">
              <div className={`text-2xl mb-1 ${
                badge.earned ? '' : 'grayscale'
              }`}>
                {badge.icon}
              </div>

              {!badge.earned && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>

            <div className={`text-xs font-medium ${badge.earned ? 'text-gray-200' : 'text-gray-500'}`}>
              {badge.name}
            </div>

            {badge.earned && (
              <div className="text-[10px] text-gray-400 mt-1">
                {getRarityLabel(badge.rarity)}
              </div>
            )}

            {!badge.earned && badge.progress && showProgress && (
              <div className="absolute -bottom-1 left-1 right-1">
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div
                    className="bg-mint-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-mint-600 text-white text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
              {badge.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-mint-600" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Badge Collection Summary Component
export function BadgeCollectionSummary({ badges }: { badges: Badge[] }) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  const byCategory = badges.reduce((acc, badge) => {
    acc[badge.category] = (acc[badge.category] || 0) + (badge.earned ? 1 : 0);
    return acc;
  }, {} as Record<string, number>);

  const byRarity = earnedBadges.reduce((acc, badge) => {
    acc[badge.rarity] = (acc[badge.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-gray-900 rounded-sm p-6 shadow-card border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">Badge Collection</h3>
        <div className="flex items-center space-x-1 bg-gray-800/50 px-3 py-1 rounded-sm border border-gray-700/50">
          <Trophy className="h-4 w-4 text-mint-600" />
          <span className="text-sm font-semibold text-mint-600">
            {earnedBadges.length}/{totalBadges}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>ความคืบหน้าโดยรวม</span>
          <span>{Math.round((earnedBadges.length / totalBadges) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-mint-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(earnedBadges.length / totalBadges) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-200">{byCategory.health || 0}</div>
          <div className="text-xs text-gray-400">Health Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-200">{byCategory.community || 0}</div>
          <div className="text-xs text-gray-400">Community Badges</div>
        </div>
      </div>

      {/* Rarity Stats */}
      <div className="flex justify-center space-x-4 text-xs">
        {byRarity.legendary && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-700 rounded-full" />
            <span className="text-gray-400">{byRarity.legendary} Legendary</span>
          </div>
        )}
        {byRarity.epic && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-700 rounded-full" />
            <span className="text-gray-400">{byRarity.epic} Epic</span>
          </div>
        )}
        {byRarity.rare && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-700 rounded-full" />
            <span className="text-gray-400">{byRarity.rare} Rare</span>
          </div>
        )}
      </div>
    </div>
  );
}

export type { Badge };
