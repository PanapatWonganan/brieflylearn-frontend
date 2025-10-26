// Friend System API Client for BoostMe Wellness Garden

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

export interface Friend {
  id: string
  name: string
  email: string
  garden?: {
    level: number
    xp: number
    star_seeds: number
    total_plants: number
    theme: string
  }
  last_active?: string
}

export interface FriendRequest {
  id: string
  user: {
    id: string
    name: string
    email: string
    created_at: string
  }
  requested_at: string
}

export interface SearchResult {
  id: string
  name: string
  email: string
  friendship_status: 'none' | 'friends' | 'request_sent' | 'request_received'
  garden_level: number
  joined_at: string
}

export interface FriendGarden {
  friend: {
    id: string
    name: string
    avatar?: string
  }
  garden: {
    id: string
    level: number
    xp: number
    star_seeds: number
    theme: string
    layout: any
    last_active: string
  }
  plants: Array<{
    id: string
    name: string
    type: string
    category: string
    stage: number
    health: number
    position: any
    planted_at: string
    last_watered?: string
    can_help_water: boolean
  }>
  stats: {
    total_plants: number
    healthy_plants: number
    plants_need_water: number
  }
}

class FriendAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/garden/friends${endpoint}`
    
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data.data
  }

  // Get friends list
  async getFriendsList(): Promise<{
    friends: Friend[]
    total_friends: number
  }> {
    return this.fetch('/')
  }

  // Get pending friend requests
  async getPendingRequests(): Promise<{
    pending_requests: FriendRequest[]
    total_pending: number
  }> {
    return this.fetch('/pending')
  }

  // Send friend request by email
  async sendFriendRequest(friendEmail: string): Promise<{
    request_id: string
    friend_name: string
    status: string
  }> {
    return this.fetch('/request', {
      method: 'POST',
      body: JSON.stringify({ friend_email: friendEmail }),
    })
  }

  // Accept friend request
  async acceptFriendRequest(requestId: string): Promise<{
    friend_name: string
    friend_id: string
    accepted_at: string
  }> {
    return this.fetch(`/accept/${requestId}`, {
      method: 'PUT',
    })
  }

  // Reject friend request
  async rejectFriendRequest(requestId: string): Promise<void> {
    return this.fetch(`/reject/${requestId}`, {
      method: 'DELETE',
    })
  }

  // Remove friend
  async removeFriend(friendId: string): Promise<void> {
    return this.fetch(`/remove/${friendId}`, {
      method: 'DELETE',
    })
  }

  // Visit friend's garden
  async visitFriendGarden(friendId: string): Promise<FriendGarden> {
    return this.fetch(`/${friendId}/garden`)
  }

  // Help water friend's plant
  async helpWaterPlant(friendId: string, plantId: string): Promise<{
    plant: {
      id: string
      name: string
      health: number
      last_watered_at: string
    }
    helper_xp_gained: number
  }> {
    return this.fetch(`/${friendId}/plants/${plantId}/water`, {
      method: 'POST',
    })
  }

  // Search users to add as friends
  async searchUsers(query: string): Promise<{
    users: SearchResult[]
    total_found: number
    query: string
  }> {
    const encodedQuery = encodeURIComponent(query)
    return this.fetch(`/search?query=${encodedQuery}`)
  }
}

// Export singleton instance
export const friendAPI = new FriendAPI()

// Utility functions
export const getFriendshipStatusText = (status: string): string => {
  switch (status) {
    case 'friends':
      return 'เป็นเพื่อนแล้ว'
    case 'request_sent':
      return 'ส่งคำขอแล้ว'
    case 'request_received':
      return 'ได้รับคำขอ'
    default:
      return 'เพิ่มเพื่อน'
  }
}

export const getFriendshipStatusColor = (status: string): string => {
  switch (status) {
    case 'friends':
      return 'text-green-600 bg-green-100'
    case 'request_sent':
      return 'text-yellow-600 bg-yellow-100'
    case 'request_received':
      return 'text-blue-600 bg-blue-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const formatFriendLastActive = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return 'เมื่อสักครู่'
  if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`
  
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}