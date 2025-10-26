'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Check, 
  X, 
  UserPlus,
  Eye,
  UserMinus,
  Crown,
  Star,
  Clock
} from 'lucide-react'
import { 
  friendAPI, 
  Friend, 
  FriendRequest, 
  SearchResult,
  getFriendshipStatusText,
  getFriendshipStatusColor,
  formatFriendLastActive
} from '@/lib/garden/friendApi'
import { useNotification } from '@/contexts/NotificationContext'

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([])
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [newFriendEmail, setNewFriendEmail] = useState('')
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const { addNotification } = useNotification()

  useEffect(() => {
    loadFriendsData()
  }, [])

  const loadFriendsData = async () => {
    try {
      setIsLoading(true)
      const [friendsData, requestsData] = await Promise.all([
        friendAPI.getFriendsList(),
        friendAPI.getPendingRequests()
      ])
      
      setFriends(friendsData.friends)
      setPendingRequests(requestsData.pending_requests)
    } catch (error) {
      console.error('Failed to load friends data:', error)
      addNotification({
        type: 'error',
        message: 'ไม่สามารถโหลดข้อมูลเพื่อนได้'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      addNotification({
        type: 'warning',
        message: 'กรุณากรอกคำค้นหาอย่างน้อย 2 ตัวอักษร'
      })
      return
    }

    try {
      setIsSearching(true)
      const results = await friendAPI.searchUsers(searchQuery.trim())
      setSearchResults(results.users)
      setActiveTab('search')
    } catch (error) {
      console.error('Search failed:', error)
      addNotification({
        type: 'error',
        message: 'ไม่สามารถค้นหาผู้ใช้ได้'
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleSendFriendRequest = async (email?: string) => {
    const emailToSend = email || newFriendEmail.trim()
    
    if (!emailToSend) {
      addNotification({
        type: 'warning',
        message: 'กรุณากรอกอีเมลของเพื่อน'
      })
      return
    }

    try {
      setIsSendingRequest(true)
      const result = await friendAPI.sendFriendRequest(emailToSend)
      
      addNotification({
        type: 'success',
        message: `ส่งคำขอเป็นเพื่อนให้ ${result.friend_name} เรียบร้อยแล้ว`
      })
      
      setNewFriendEmail('')
      
      // Refresh search results if we're on search tab
      if (activeTab === 'search' && searchQuery) {
        handleSearch()
      }
      
    } catch (error: any) {
      console.error('Failed to send friend request:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถส่งคำขอเป็นเพื่อนได้'
      })
    } finally {
      setIsSendingRequest(false)
    }
  }

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const result = await friendAPI.acceptFriendRequest(requestId)
      
      addNotification({
        type: 'success',
        message: `ยอมรับคำขอจาก ${result.friend_name} เรียบร้อยแล้ว`
      })
      
      // Refresh data
      loadFriendsData()
      
    } catch (error: any) {
      console.error('Failed to accept request:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถยอมรับคำขอได้'
      })
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    try {
      await friendAPI.rejectFriendRequest(requestId)
      
      addNotification({
        type: 'info',
        message: 'ปฏิเสธคำขอเป็นเพื่อนเรียบร้อยแล้ว'
      })
      
      // Refresh data
      loadFriendsData()
      
    } catch (error: any) {
      console.error('Failed to reject request:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถปฏิเสธคำขอได้'
      })
    }
  }

  const handleRemoveFriend = async (friendId: string, friendName: string) => {
    if (!confirm(`คุณต้องการลบ ${friendName} ออกจากรายชื่อเพื่อนหรือไม่?`)) {
      return
    }

    try {
      await friendAPI.removeFriend(friendId)
      
      addNotification({
        type: 'info',
        message: `ลบ ${friendName} ออกจากรายชื่อเพื่อนเรียบร้อยแล้ว`
      })
      
      // Refresh data
      loadFriendsData()
      
    } catch (error: any) {
      console.error('Failed to remove friend:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถลบเพื่อนได้'
      })
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Tabs */}
      <div className="p-6 bg-gradient-to-r from-purple-500 to-orange-500 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span>เพื่อนในสวน</span>
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('friends')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'friends'
                ? 'bg-white text-purple-600'
                : 'bg-purple-600/30 text-white hover:bg-purple-600/50'
            }`}
          >
            เพื่อน ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
              activeTab === 'requests'
                ? 'bg-white text-purple-600'
                : 'bg-purple-600/30 text-white hover:bg-purple-600/50'
            }`}
          >
            คำขอ ({pendingRequests.length})
            {pendingRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-white text-purple-600'
                : 'bg-purple-600/30 text-white hover:bg-purple-600/50'
            }`}
          >
            ค้นหา
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {friends.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">คุณยังไม่มีเพื่อนในสวน</p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    เริ่มหาเพื่อน
                  </button>
                </div>
              ) : (
                friends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {friend.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{friend.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {friend.garden && (
                            <>
                              <div className="flex items-center space-x-1">
                                <Crown className="h-3 w-3 text-yellow-500" />
                                <span>Level {friend.garden.level}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-purple-500" />
                                <span>{friend.garden.total_plants} พืช</span>
                              </div>
                            </>
                          )}
                          {friend.last_active && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{formatFriendLastActive(friend.last_active)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          // TODO: Implement visit garden
                          addNotification({
                            type: 'info',
                            message: 'ฟีเจอร์เยี่ยมชมสวนจะมาเร็วๆ นี้!'
                          })
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="เยี่ยมชมสวน"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveFriend(friend.id, friend.name)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="ลบเพื่อน"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Add Friend Form */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>เพิ่มเพื่อนใหม่</span>
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={newFriendEmail}
                    onChange={(e) => setNewFriendEmail(e.target.value)}
                    placeholder="อีเมลของเพื่อน"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendFriendRequest()}
                  />
                  <button
                    onClick={() => handleSendFriendRequest()}
                    disabled={isSendingRequest}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    {isSendingRequest ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    <span>ส่งคำขอ</span>
                  </button>
                </div>
              </div>

              {/* Pending Requests */}
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">ไม่มีคำขอเป็นเพื่อนค้างอยู่</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {request.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.user.name}</h4>
                        <p className="text-sm text-gray-600">{request.user.email}</p>
                        <p className="text-xs text-gray-500">
                          ส่งคำขอเมื่อ {formatFriendLastActive(request.requested_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="ยอมรับ"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="ปฏิเสธ"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Search Tab */}
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Search Form */}
              <div className="flex space-x-2 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาด้วยชื่อหรืออีเมล"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isSearching ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>ค้นหา</span>
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length === 0 && searchQuery ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">ไม่พบผู้ใช้ที่ค้นหา</p>
                </div>
              ) : (
                searchResults.map((user) => (
                  <motion.div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Crown className="h-3 w-3 text-yellow-500" />
                          <span>Level {user.garden_level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFriendshipStatusColor(user.friendship_status)}`}>
                        {getFriendshipStatusText(user.friendship_status)}
                      </span>
                      {user.friendship_status === 'none' && (
                        <button
                          onClick={() => handleSendFriendRequest(user.email)}
                          disabled={isSendingRequest}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="เพิ่มเพื่อน"
                        >
                          <UserPlus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FriendsList