'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Clock, Calendar, Crown } from 'lucide-react';

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
  
  const getRarityColors = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return {
          border: 'border-gray-300',
          bg: 'from-gray-50 to-gray-100',
          glow: 'shadow-gray-200',
          text: 'text-gray-600'
        };
      case 'rare':
        return {
          border: 'border-blue-300',
          bg: 'from-blue-50 to-blue-100',
          glow: 'shadow-blue-200',
          text: 'text-blue-600'
        };
      case 'epic':
        return {
          border: 'border-purple-300',
          bg: 'from-purple-50 to-purple-100',
          glow: 'shadow-purple-200',
          text: 'text-purple-600'
        };
      case 'legendary':
        return {
          border: 'border-yellow-400',
          bg: 'from-yellow-100 to-yellow-200',
          glow: 'shadow-yellow-300',
          text: 'text-yellow-700'
        };
    }
  };

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {displayBadges.map((badge, index) => {
          const colors = getRarityColors(badge.rarity);
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                badge.earned
                  ? `bg-gradient-to-r ${colors.bg} ${colors.border} ${colors.glow} shadow-md`
                  : 'bg-gray-50 border-gray-200 opacity-60'
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
                  <h4 className={`font-semibold ${badge.earned ? colors.text : 'text-gray-500'}`}>
                    {badge.name}
                  </h4>
                  {badge.rarity === 'legendary' && (
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                  {badge.rarity === 'epic' && (
                    <div className="flex">
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-purple-400 fill-current" />
                      ))}
                    </div>
                  )}
                  {badge.rarity === 'rare' && (
                    <Star className="h-3 w-3 text-blue-400 fill-current" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                
                {badge.earned && badge.date && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>ได้รับเมื่อ: {new Date(badge.date).toLocaleDateString('th-TH')}</span>
                  </div>
                )}
                
                {!badge.earned && badge.progress && showProgress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Grid layout
  return (
    <div className="grid grid-cols-3 gap-3">
      {displayBadges.map((badge, index) => {
        const colors = getRarityColors(badge.rarity);
        
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative p-3 rounded-xl text-center transition-all duration-300 group cursor-pointer ${
              badge.earned
                ? `bg-gradient-to-b ${colors.bg} border-2 ${colors.border} ${colors.glow} shadow-sm hover:shadow-md`
                : 'bg-gray-50 border-2 border-gray-200 opacity-60 hover:opacity-80'
            }`}
          >
            <div className="relative">
              <div className={`text-2xl mb-1 transition-all duration-300 ${
                badge.earned ? 'group-hover:scale-110' : 'grayscale'
              }`}>
                {badge.icon}
              </div>
              
              {!badge.earned && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              )}
              
              {badge.rarity === 'legendary' && badge.earned && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-yellow-400 rounded-full p-1">
                    <Crown className="h-3 w-3 text-yellow-800" />
                  </div>
                </div>
              )}
            </div>
            
            <div className={`text-xs font-medium ${badge.earned ? colors.text : 'text-gray-500'}`}>
              {badge.name}
            </div>
            
            {badge.rarity !== 'common' && badge.earned && (
              <div className="flex justify-center mt-1">
                {badge.rarity === 'legendary' && (
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-2 w-2 text-yellow-400 fill-current" />
                    ))}
                  </div>
                )}
                {badge.rarity === 'epic' && (
                  <div className="flex">
                    {[...Array(2)].map((_, i) => (
                      <Star key={i} className="h-2 w-2 text-purple-400 fill-current" />
                    ))}
                  </div>
                )}
                {badge.rarity === 'rare' && (
                  <Star className="h-2 w-2 text-blue-400 fill-current" />
                )}
              </div>
            )}
            
            {!badge.earned && badge.progress && showProgress && (
              <div className="absolute -bottom-1 left-1 right-1">
                <div className="w-full bg-gray-300 rounded-full h-1.5">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
              {badge.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Badge Collection</h3>
        <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
          <Trophy className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-semibold text-orange-600">
            {earnedBadges.length}/{totalBadges}
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>ความคืบหน้าโดยรวม</span>
          <span>{Math.round((earnedBadges.length / totalBadges) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(earnedBadges.length / totalBadges) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Category Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{byCategory.health || 0}</div>
          <div className="text-xs text-gray-600">Health Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{byCategory.community || 0}</div>
          <div className="text-xs text-gray-600">Community Badges</div>
        </div>
      </div>
      
      {/* Rarity Stats */}
      <div className="flex justify-center space-x-4 text-xs">
        {byRarity.legendary && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-gray-600">{byRarity.legendary} Legendary</span>
          </div>
        )}
        {byRarity.epic && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full" />
            <span className="text-gray-600">{byRarity.epic} Epic</span>
          </div>
        )}
        {byRarity.rare && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-gray-600">{byRarity.rare} Rare</span>
          </div>
        )}
      </div>
    </div>
  );
}

export type { Badge }; 