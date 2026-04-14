'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Sparkles,
  Gift,
  Users,
  Trophy,
  Clock,
  MapPin,
  Star,
  RefreshCw,
  Flower,
  TreePine,
  Heart
} from 'lucide-react'
import { 
  seasonalAPI, 
  SeasonalEvent,
  WeatherInfo,
  getEventTypeEmoji,
  getEventTypeColor,
  getWeatherEmoji,
  getWeatherColor,
  formatTemperature,
  formatHumidity,
  formatWindSpeed,
  getEventProgress,
  formatEventDate,
  getDaysUntilEvent,
  isEventActive,
  getSeasonName,
  getSeasonEmoji,
  getAuspiciousTimeEmoji
} from '@/lib/garden/seasonalApi'
import { useNotification } from '@/contexts/NotificationContext'

interface EventsData {
  current_events: SeasonalEvent[]
  upcoming_events: Array<{
    id: string
    name: string
    start_date: string
    days_until: number
  }>
  weather_info: WeatherInfo
  seasonal_boosts: Array<{
    name: string
    description: string
    effects: { [key: string]: string }
  }>
  thai_calendar: {
    buddhist_year: number
    thai_month: string
    lunar_day: number
    auspicious_time: string
    lucky_plants: string[]
  }
}

interface WeatherData {
  current_weather: WeatherInfo
  effects: {
    water_consumption: number
    growth_speed: number
    health_change: number
    xp_modifier: number
    special_bonuses: string[]
  }
  forecast: Array<{
    date: string
    day_name: string
    weather: string
    temperature_high: number
    temperature_low: number
    rain_chance: number
  }>
  garden_recommendations: string[]
}

const SeasonalEventsPanel = () => {
  const [eventsData, setEventsData] = useState<EventsData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'events' | 'weather' | 'calendar'>('events')
  const [isParticipating, setIsParticipating] = useState<string | null>(null)

  const { addNotification } = useNotification()

  const tabs = [
    { id: 'events', name: 'เทศกาล', emoji: '🎉' },
    { id: 'weather', name: 'สภาพอากาศ', emoji: '🌤️' },
    { id: 'calendar', name: 'ปฏิทินไทย', emoji: '📅' }
  ]

  useEffect(() => {
    loadEventsData()
    loadWeatherData()
  }, [])

  const loadEventsData = async () => {
    try {
      setIsLoading(true)
      const data = await seasonalAPI.getCurrentEvents()
      setEventsData(data)
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถโหลดข้อมูลเหตุการณ์ได้: ' + error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadWeatherData = async () => {
    try {
      const data = await seasonalAPI.getWeatherStatus()
      setWeatherData(data)
    } catch (error: any) {
    }
  }

  const handleParticipateEvent = async (eventId: string, activityType: 'plant_special' | 'water_blessing' | 'make_offering' | 'join_ceremony') => {
    try {
      setIsParticipating(eventId)
      const result = await seasonalAPI.participateEvent(eventId, activityType, 1)
      
      addNotification({
        type: 'success',
        title: '🎉 เข้าร่วมเหตุการณ์แล้ว!',
        message: `${result.message} (+${result.result.xp_gained} XP, +${result.result.star_seeds_gained} Seeds)`,
        duration: 5000
      })

      // Refresh events data
      loadEventsData()
      
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: error.message || 'ไม่สามารถเข้าร่วมเหตุการณ์ได้'
      })
    } finally {
      setIsParticipating(null)
    }
  }

  const handleActivateSeasonalPlant = async (plantType: 'songkran_lotus' | 'loy_krathong_banana' | 'mothers_day_jasmine' | 'christmas_pine') => {
    try {
      const result = await seasonalAPI.activateSeasonalPlant(plantType)

      addNotification({
        type: 'success',
        title: '🌸 ปลูกพืชตามฤดูกาลแล้ว!',
        message: result.message,
        duration: 5000
      })

    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: error.message || 'ไม่สามารถปลูกพืชตามฤดูกาลได้'
      })
    }
  }

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType) {
      case 'sunny': return Sun
      case 'cloudy': return Cloud
      case 'rainy': return CloudRain
      case 'storm': return CloudSnow
      case 'misty': return Wind
      default: return Cloud
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-sm shadow-card p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-700 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-sm shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-mint-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span>เหตุการณ์ตามฤดูกาล</span>
          </h2>
          <button
            onClick={loadEventsData}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-sm transition-colors"
            title="รีเฟรช"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Current Season */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getSeasonEmoji(new Date().getMonth() + 1)}</span>
          <div>
            <h3 className="text-lg font-bold">{getSeasonName(new Date().getMonth() + 1)}</h3>
            <p className="text-mint-200">
              เดือน{new Date().toLocaleDateString('th-TH', { month: 'long' })} พ.ศ. {new Date().getFullYear() + 543}
            </p>
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
                  ? 'border-b-2 border-mint-600 text-mint-400 bg-mint-900/50'
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
          {selectedTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Current Events */}
              {eventsData?.current_events && eventsData.current_events.length > 0 ? (
                <div>
                  <h3 className="text-lg font-bold mb-4">เหตุการณ์ปัจจุบัน</h3>
                  <div className="space-y-4">
                    {eventsData.current_events.map((event: SeasonalEvent) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-gray-700 rounded-sm p-6 transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{getEventTypeEmoji(event.type)}</span>
                            <div>
                              <h4 className="text-xl font-bold">{event.name}</h4>
                              <p className="text-gray-400">{event.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatEventDate(event.start_date)} - {formatEventDate(event.end_date)}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-sm text-sm font-medium ${getEventTypeColor(event.type)} text-white`}>
                            กำลังจัด
                          </span>
                        </div>

                        {/* Community Goal */}
                        {event.community_goal && (
                          <div className="bg-gray-800 rounded-sm p-4 mb-4">
                            <h5 className="font-semibold text-mint-300 mb-2 flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>เป้าหมายชุมชน</span>
                            </h5>
                            <p className="text-mint-300 text-sm mb-2">{event.community_goal.description}</p>
                            <div className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>ความคืบหน้า</span>
                                <span>{event.community_goal.progress}/{event.community_goal.target}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-mint-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${getEventProgress(event.community_goal.progress, event.community_goal.target)}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Trophy className="h-4 w-4 text-sand-300" />
                              <span className="text-mint-300">รางวัล: {event.community_goal.reward}</span>
                            </div>
                          </div>
                        )}

                        {/* Activities */}
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-100">กิจกรรมที่สามารถทำได้:</h5>
                          {event.activities.map((activity, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-sm p-3 flex items-center justify-between">
                              <div className="flex-1">
                                <h6 className="font-medium">{activity.name}</h6>
                                <p className="text-sm text-gray-400">{activity.description}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                                  <span>+{activity.reward_xp} XP</span>
                                  <span>+{activity.reward_star_seeds} Seeds</span>
                                  {activity.special_plant && (
                                    <span className="text-mint-400">🌸 {activity.special_plant}</span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleParticipateEvent(event.id, 'join_ceremony')}
                                disabled={isParticipating === event.id}
                                className="bg-mint-600 hover:bg-mint-700 disabled:opacity-40 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center space-x-2"
                              >
                                {isParticipating === event.id ? (
                                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                  <>
                                    <Gift className="h-4 w-4" />
                                    <span>เข้าร่วม</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Special Effects */}
                        {event.special_effects && Object.keys(event.special_effects).length > 0 && (
                          <div className="mt-4 bg-gray-800 rounded-sm p-3">
                            <h5 className="font-semibold text-mint-300 mb-2 flex items-center space-x-2">
                              <Sparkles className="h-4 w-4" />
                              <span>เอฟเฟกต์พิเศษ</span>
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(event.special_effects).map(([key, value]) => (
                                <span key={key} className="bg-mint-900 text-mint-300 px-2 py-1 rounded-sm text-xs">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-400 mb-2">ไม่มีเหตุการณ์ในขณะนี้</h4>
                  <p className="text-gray-500">รอเทศกาลและเหตุการณ์พิเศษที่จะมาถึง</p>
                </div>
              )}

              {/* Upcoming Events */}
              {eventsData?.upcoming_events && eventsData.upcoming_events.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-4">เหตุการณ์ที่จะมาถึง</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventsData.upcoming_events.map((event: any, index: number) => (
                      <div key={event.id} className="border border-gray-700 rounded-sm p-4">
                        <h4 className="font-bold mb-2">{event.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>อีก {event.days_until} วัน</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatEventDate(event.start_date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'weather' && weatherData && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Current Weather */}
              <div className="bg-gray-800 rounded-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  {React.createElement(getWeatherIcon(weatherData.current_weather.type), { className: "h-5 w-5" })}
                  <span>สภาพอากาศปัจจุบัน</span>
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <span className="text-3xl">{getWeatherEmoji(weatherData.current_weather.type)}</span>
                    <p className="text-sm font-medium mt-1">{weatherData.current_weather.type}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-400">
                      {formatTemperature(weatherData.current_weather.temperature)}
                    </div>
                    <p className="text-sm text-gray-400">อุณหภูมิ</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-400">
                      {formatHumidity(weatherData.current_weather.humidity)}
                    </div>
                    <p className="text-sm text-gray-400">ความชื้น</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">
                      {formatWindSpeed(weatherData.current_weather.wind_speed)}
                    </div>
                    <p className="text-sm text-gray-400">ลม</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-sm p-4">
                  <p className="font-medium text-gray-100 mb-2">{weatherData.current_weather.description}</p>
                  <div className="space-y-1">
                    {weatherData.current_weather.effects.map((effect: string, index: number) => (
                      <div key={index} className="text-sm text-gray-400 flex items-center space-x-2">
                        <Sparkles className="h-3 w-3 text-mint-400" />
                        <span>{effect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weather Effects on Garden */}
              <div>
                <h3 className="text-lg font-bold mb-4">ผลกระทบต่อสวน</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-4">
                    <h4 className="font-semibold text-mint-300 mb-2">ผลกระทบเชิงบวก</h4>
                    <div className="space-y-1">
                      {weatherData.effects.special_bonuses.map((bonus: string, index: number) => (
                        <div key={index} className="text-sm text-mint-300 flex items-center space-x-2">
                          <Star className="h-3 w-3" />
                          <span>{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800 border border-mint-700 rounded-sm p-4">
                    <h4 className="font-semibold text-mint-300 mb-2">สถิติการเปลี่ยนแปลง</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>การใช้น้ำ:</span>
                        <span className={weatherData.effects.water_consumption > 1 ? 'text-red-400' : 'text-mint-400'}>
                          {(weatherData.effects.water_consumption * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>ความเร็วการเติบโต:</span>
                        <span className="text-mint-400">
                          {(weatherData.effects.growth_speed * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>XP เพิ่มเติม:</span>
                        <span className="text-mint-300">
                          {(weatherData.effects.xp_modifier * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Garden Recommendations */}
              {weatherData.garden_recommendations && (
                <div>
                  <h3 className="text-lg font-bold mb-4">คำแนะนำการทำสวน</h3>
                  <div className="bg-gray-700 border border-gray-600 rounded-sm p-4">
                    <div className="space-y-2">
                      {weatherData.garden_recommendations.map((rec: string, index: number) => (
                        <div key={index} className="text-sm text-text-warning flex items-center space-x-2">
                          <span className="text-sand-300">💡</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'calendar' && eventsData?.thai_calendar && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Thai Calendar Info */}
              <div className="bg-mint-900/50 rounded-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-mint-400" />
                  <span>ปฏิทินไทย</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-brand-900 mb-3">ข้อมูลวันที่</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ปีพุทธศักราช:</span>
                        <span className="font-medium">{eventsData.thai_calendar.buddhist_year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>เดือน:</span>
                        <span className="font-medium">{eventsData.thai_calendar.thai_month}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>วันขึ้น:</span>
                        <span className="font-medium">{eventsData.thai_calendar.lunar_day} ค่ำ</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-brand-900 mb-3">เวลามงคล</h4>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">{getAuspiciousTimeEmoji(eventsData.thai_calendar.auspicious_time)}</span>
                      <span className="text-sm font-medium">{eventsData.thai_calendar.auspicious_time}</span>
                    </div>
                    
                    <h4 className="font-semibold text-brand-900 mb-2">พืชมงคลวันนี้</h4>
                    <div className="flex flex-wrap gap-2">
                      {eventsData.thai_calendar.lucky_plants.map((plant: string, index: number) => (
                        <span key={index} className="bg-mint-900 text-mint-300 px-2 py-1 rounded-sm text-xs flex items-center space-x-1">
                          <Flower className="h-3 w-3" />
                          <span>{plant}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Seasonal Boosts */}
              {eventsData.seasonal_boosts && eventsData.seasonal_boosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-4">พลังตามฤดูกาล</h3>
                  <div className="space-y-3">
                    {eventsData.seasonal_boosts.map((boost: any, index: number) => (
                      <div key={index} className="border border-gray-700 rounded-sm p-4">
                        <h4 className="font-semibold text-gray-100 mb-2 flex items-center space-x-2">
                          <span>{getSeasonEmoji(new Date().getMonth() + 1)}</span>
                          <span>{boost.name}</span>
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">{boost.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(boost.effects).map(([key, value]: [string, any]) => (
                            <span key={key} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-sm text-xs">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seasonal Plants */}
              <div>
                <h3 className="text-lg font-bold mb-4">พืชตามฤดูกาล</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-700 rounded-sm p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">🌸</span>
                      <div>
                        <h4 className="font-semibold">บัวสงกรานต์</h4>
                        <p className="text-sm text-gray-400">พืชพิเศษเฉพาะช่วงสงกรานต์</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleActivateSeasonalPlant('songkran_lotus')}
                      className="w-full bg-mint-600 hover:bg-mint-700 text-white py-2 px-4 rounded-sm text-sm font-medium transition-colors"
                    >
                      ปลูกบัวสงกรานต์
                    </button>
                  </div>
                  
                  <div className="border border-gray-700 rounded-sm p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">🤍</span>
                      <div>
                        <h4 className="font-semibold">มะลิวันแม่</h4>
                        <p className="text-sm text-gray-400">ดอกมะลิเพื่อแสดงความกตัญญู</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleActivateSeasonalPlant('mothers_day_jasmine')}
                      className="w-full bg-gray-900 border-2 border-gray-600 hover:border-gray-500 text-gray-400 py-2 px-4 rounded-sm text-sm font-medium transition-colors"
                    >
                      ปลูกมะลิแม่
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SeasonalEventsPanel