'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Star, 
  Eye, 
  Heart, 
  Droplets, 
  Trophy, 
  Target, 
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  Crown,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { 
  communityAPI, 
  PublicGarden,
  CommunityProject,
  CommunityStats,
  LeaderboardEntry,
  getThemeDisplayName,
  formatCommunityNumber,
  getProjectStatusColor,
  getProjectProgress,
  formatTimeRemaining,
  getBadgeEmoji
} from '@/lib/garden/communityApi'
import { useNotification } from '@/contexts/NotificationContext'

interface CommunityData {
  public_gardens: {
    featured_garden: PublicGarden
    trending_gardens: PublicGarden[]
    newest_gardens: PublicGarden[]
  }
  community_stats: CommunityStats
  community_projects: CommunityProject[]
  user_info: {
    can_create_public_garden: boolean
    daily_community_visits: number
    max_daily_visits: number
    community_level: number
  }
}

interface LeaderboardData {
  weekly_top_gardeners: LeaderboardEntry[]
  most_visited_gardens: Array<{
    garden_name: string
    owner: string
    visits: number
  }>
  community_heroes: Array<{
    name: string
    contribution: string
  }>
}

const CommunityDashboard = () => {
  const [communityData, setCommunityData] = useState<CommunityData | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'gardens' | 'projects' | 'leaderboard'>('overview')
  const [isLiking, setIsLiking] = useState<string | null>(null)
  const [isWatering, setIsWatering] = useState<string | null>(null)

  const { addNotification } = useNotification()

  const tabs = [
    { id: 'overview', name: 'ภาพรวม', emoji: '🌍' },
    { id: 'gardens', name: 'สวนยอดนิยม', emoji: '🌺' },
    { id: 'projects', name: 'โครงการชุมชน', emoji: '🎯' },
    { id: 'leaderboard', name: 'อันดับ', emoji: '🏆' }
  ]

  useEffect(() => {
    loadCommunityData()
  }, [])

  useEffect(() => {
    if (selectedTab === 'leaderboard' && !leaderboard) {
      loadLeaderboard()
    }
  }, [selectedTab])

  const loadCommunityData = async () => {
    try {
      setIsLoading(true)
      const data = await communityAPI.getCommunityOverview()
      setCommunityData(data)
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'ไม่สามารถโหลดข้อมูลชุมชนได้',
        message: 'ไม่สามารถโหลดข้อมูลชุมชนได้: ' + error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadLeaderboard = async () => {
    try {
      const data = await communityAPI.getCommunityLeaderboard()
      setLeaderboard(data)
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'ไม่สามารถโหลดอันดับได้',
        message: 'ไม่สามารถโหลดอันดับได้: ' + error.message
      })
    }
  }

  const handleLikeGarden = async (gardenId: string) => {
    try {
      setIsLiking(gardenId)
      const result = await communityAPI.likeGarden(gardenId)
      
      addNotification({
        type: 'success',
        title: '❤️ ถูกใจสวนแล้ว!',
        message: `${result.message} (+${result.rewards.visitor_xp} XP)`,
        duration: 5000
      })
      
      // Refresh data to show updated likes
      loadCommunityData()
      
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'ไม่สามารถถูกใจสวนได้',
        message: error.message || 'ไม่สามารถถูกใจสวนได้'
      })
    } finally {
      setIsLiking(null)
    }
  }

  const handleJoinProject = async (projectId: string) => {
    try {
      const result = await communityAPI.joinCommunityProject(projectId, 'plant')

      addNotification({
        type: 'success',
        title: '🎯 เข้าร่วมโครงการแล้ว!',
        message: `${result.message} (+${result.rewards.immediate_xp} XP, +${result.rewards.immediate_star_seeds} Seeds)`,
        duration: 5000
      })

      // Refresh data to show updated progress
      loadCommunityData()

    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'ไม่สามารถเข้าร่วมโครงการได้',
        message: error.message || 'ไม่สามารถเข้าร่วมโครงการได้'
      })
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-sm shadow-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <div className="w-full h-32 bg-gray-700 rounded-sm"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!communityData) {
    return (
      <div className="bg-gray-900 rounded-sm shadow-card p-6 text-center">
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold text-gray-400 mb-2">ไม่พบข้อมูลชุมชน</h2>
        <p className="text-gray-500">กรุณาลองใหม่อีกครั้ง</p>
      </div>
    )
  }

  const { public_gardens, community_stats, community_projects, user_info } = communityData

  return (
    <div className="bg-gray-900 rounded-sm shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-mint-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>ชุมชนสวนสุขภาพ</span>
          </h2>
          <button
            onClick={loadCommunityData}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-sm transition-colors"
            title="รีเฟรช"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCommunityNumber(community_stats.total_gardens)}</div>
            <div className="opacity-80">สวนทั้งหมด</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCommunityNumber(community_stats.active_gardeners)}</div>
            <div className="opacity-80">นักสวนออนไลน์</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCommunityNumber(community_stats.plants_growing)}</div>
            <div className="opacity-80">พืชกำลังเติบโต</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCommunityNumber(community_stats.daily_visitors)}</div>
            <div className="opacity-80">ผู้เยี่ยมชมวันนี้</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-b-2 border-brand-500 text-mint-400 bg-mint-900/50'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Featured Garden */}
              {public_gardens.featured_garden && (
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span>สวนแนะนำ</span>
                  </h3>
                  <div className="bg-gray-800 border border-gray-600 rounded-sm p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-100 mb-2">
                          {public_gardens.featured_garden.garden_name}
                        </h4>
                        <p className="text-gray-400 mb-3">
                          โดย {public_gardens.featured_garden.owner_name} • Level {public_gardens.featured_garden.level}
                        </p>
                        <p className="text-gray-400 mb-4">
                          {public_gardens.featured_garden.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {public_gardens.featured_garden.special_plants?.map((plant, index) => (
                            <span
                              key={index}
                              className="bg-mint-900 text-mint-300 px-2 py-1 rounded-sm text-xs"
                            >
                              {plant}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{public_gardens.featured_garden.visitors_today} ครั้งวันนี้</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span>{public_gardens.featured_garden.likes} ถูกใจ</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4 text-warning" />
                            <span>{public_gardens.featured_garden.achievements} รางวัล</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleLikeGarden(public_gardens.featured_garden.id)}
                          disabled={isLiking === public_gardens.featured_garden.id}
                          className="bg-error hover:opacity-90 disabled:opacity-40 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center space-x-2 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span>ถูกใจ</span>
                        </button>
                        <button className="bg-mint-500 hover:opacity-90 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center space-x-2 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          <span>เยี่ยมชม</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Community Projects */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-gray-400" />
                  <span>โครงการชุมชนปัจจุบัน</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community_projects.slice(0, 2).map((project) => (
                    <div key={project.id} className="border border-gray-700 rounded-sm p-4">
                      <h4 className="font-bold mb-2">{project.name}</h4>
                      <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>ความคืบหน้า</span>
                          <span>{project.progress}/{project.target}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProjectProgress(project.progress, project.target)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{project.participants} คน</span>
                        <span>{formatTimeRemaining(project.days_remaining)}</span>
                      </div>
                      <button
                        onClick={() => handleJoinProject(project.id)}
                        className="w-full bg-mint-500 hover:opacity-90 text-white py-2 px-4 rounded-sm text-sm font-medium transition-colors"
                      >
                        เข้าร่วมโครงการ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'gardens' && (
            <motion.div
              key="gardens"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Trending Gardens */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-mint-400" />
                  <span>สวนกำลังฮิต</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {public_gardens.trending_gardens.map((garden) => (
                    <div key={garden.id} className="border border-gray-700 rounded-sm p-4 transition-shadow">
                      <h4 className="font-bold mb-1">{garden.garden_name}</h4>
                      <p className="text-sm text-gray-400 mb-2">
                        โดย {garden.owner_name} • Level {garden.level}
                      </p>
                      <p className="text-sm text-mint-400 mb-3 font-medium">
                        🔥 {garden.trend_reason}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{garden.visitors_today}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-400" />
                          <span>{garden.likes}</span>
                        </span>
                        <span className="bg-gray-800 px-2 py-1 rounded-sm text-xs">
                          {getThemeDisplayName(garden.theme)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleLikeGarden(garden.id)}
                          disabled={isLiking === garden.id}
                          className="flex-1 bg-error hover:opacity-90 disabled:opacity-40 text-white py-2 px-3 rounded-sm text-sm font-medium transition-colors"
                        >
                          ถูกใจ
                        </button>
                        <button className="flex-1 bg-mint-500 hover:opacity-90 text-white py-2 px-3 rounded-sm text-sm font-medium transition-colors">
                          เยี่ยมชม
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newest Gardens */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-mint-400" />
                  <span>สวนใหม่</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {public_gardens.newest_gardens.map((garden) => (
                    <div key={garden.id} className="border border-gray-700 rounded-sm p-4">
                      <h4 className="font-bold mb-1">{garden.garden_name}</h4>
                      <p className="text-sm text-gray-400 mb-2">
                        โดย {garden.owner_name} • Level {garden.level}
                      </p>
                      <p className="text-sm text-mint-400 mb-3">
                        🌱 สร้างเมื่อ {garden.created_days_ago} วันที่แล้ว
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{garden.total_plants} ต้น</span>
                        <span>{garden.likes} ถูกใจ</span>
                      </div>
                      <button className="w-full bg-mint-500 hover:opacity-90 text-white py-2 px-4 rounded-sm text-sm font-medium transition-colors">
                        เยี่ยมชมและให้กำลังใจ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">โครงการชุมชนทั้งหมด</h3>
              {community_projects.map((project) => (
                <div key={project.id} className="border border-gray-700 rounded-sm p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2">{project.name}</h4>
                      <p className="text-gray-400 mb-3">{project.description}</p>
                      <p className="text-gray-400 font-medium mb-4">🎯 {project.goal}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>ความคืบหน้า</span>
                          <span>{project.progress}/{project.target} ({getProjectProgress(project.progress, project.target).toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-mint-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${getProjectProgress(project.progress, project.target)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{project.participants} คนเข้าร่วม</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatTimeRemaining(project.days_remaining)}</span>
                        </span>
                      </div>

                      <div className="bg-gray-800/50 rounded-sm p-3">
                        <h5 className="font-semibold text-sm mb-2">รางวัลที่จะได้รับ:</h5>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="bg-gray-800 text-warning px-2 py-1 rounded-sm">
                            {project.rewards.xp} XP
                          </span>
                          <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded-sm">
                            {project.rewards.star_seeds} Star Seeds
                          </span>
                          {project.rewards.exclusive_plant && (
                            <span className="bg-mint-900 text-mint-300 px-2 py-1 rounded-sm">
                              {project.rewards.exclusive_plant}
                            </span>
                          )}
                          {project.rewards.special_badge && (
                            <span className="bg-mint-900 text-mint-300 px-2 py-1 rounded-sm">
                              {project.rewards.special_badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={() => handleJoinProject(project.id)}
                        className="bg-mint-500 hover:opacity-90 text-white py-3 px-6 rounded-sm font-medium transition-colors"
                      >
                        เข้าร่วมโครงการ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {leaderboard ? (
                <>
                  {/* Top Gardeners */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-warning" />
                      <span>นักสวนยอดเยี่ยมสัปดาห์นี้</span>
                    </h3>
                    <div className="space-y-3">
                      {leaderboard.weekly_top_gardeners.map((gardener: LeaderboardEntry) => (
                        <div
                          key={gardener.rank}
                          className={`p-4 rounded-sm border-2 ${
                            gardener.rank === 1
                              ? 'bg-gray-800 border-gray-600'
                              : gardener.rank === 2
                                ? 'bg-gray-800/50 border-gray-600'
                                : gardener.rank === 3
                                  ? 'bg-mint-900/50 border-mint-600'
                                  : 'bg-gray-900 border-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                              gardener.rank === 1
                                ? 'bg-warning text-white'
                                : gardener.rank === 2
                                  ? 'bg-gray-800/500 text-white'
                                  : gardener.rank === 3
                                    ? 'bg-mint-500 text-white'
                                    : 'bg-gray-700 text-gray-400'
                            }`}>
                              {gardener.rank === 1 ? '👑' : gardener.rank}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold flex items-center space-x-2">
                                <span>{gardener.user_name}</span>
                                <span>{getBadgeEmoji(gardener.badge)}</span>
                                <span className="text-sm text-gray-400">{gardener.badge}</span>
                              </h4>
                              <p className="text-sm text-gray-400">
                                {gardener.garden_name} • Level {gardener.garden_level}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {gardener.activities.slice(0, 2).map((activity, index) => (
                                  <span key={index} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-sm">
                                    {activity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-mint-400">
                                {formatCommunityNumber(gardener.points_this_week)}
                              </div>
                              <div className="text-xs text-gray-500">คะแนน</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Most Visited Gardens */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">สวนยอดนิยม</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {leaderboard.most_visited_gardens.map((garden: any, index: number) => (
                        <div key={index} className="border border-gray-700 rounded-sm p-4 text-center">
                          <div className="text-2xl font-bold text-mint-400 mb-1">
                            {formatCommunityNumber(garden.visits)}
                          </div>
                          <div className="text-sm text-gray-500 mb-2">ครั้ง</div>
                          <h4 className="font-bold">{garden.garden_name}</h4>
                          <p className="text-sm text-gray-400">โดย {garden.owner}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Heroes */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">ฮีโร่ชุมชน</h3>
                    <div className="space-y-3">
                      {leaderboard.community_heroes.map((hero: any, index: number) => (
                        <div key={index} className="bg-mint-900/50 border border-mint-700 rounded-sm p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-mint-700 text-white rounded-full flex items-center justify-center">
                              🦸‍♀️
                            </div>
                            <div>
                              <h4 className="font-bold">{hero.name}</h4>
                              <p className="text-sm text-gray-400">{hero.contribution}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">กำลังโหลดอันดับ...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommunityDashboard