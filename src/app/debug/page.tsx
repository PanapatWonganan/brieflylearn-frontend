'use client'

import { useEffect, useState } from 'react'
import { getAuthToken } from '@/lib/garden/api'

export default function DebugPage() {
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [apiTest, setApiTest] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check token in localStorage
    const token = getAuthToken()
    const allKeys = Object.keys(localStorage)
    const allTokens = {
      auth_token: localStorage.getItem('auth_token'),
      boostme_token: localStorage.getItem('boostme_token'),
    }

    setTokenInfo({
      hasToken: !!token,
      token: token,
      tokenLength: token?.length,
      allLocalStorageKeys: allKeys,
      allTokens: allTokens,
    })
  }, [])

  const testAPI = async () => {
    setLoading(true)
    try {
      const token = getAuthToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'
      const url = `${apiUrl}/garden/my-garden`

      console.log('Testing API:', { url, token })

      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      }

      console.log('Request headers:', headers)

      const response = await fetch(url, {
        headers: headers,
      })

      const data = await response.json()

      let tokenDecoded = null
      try {
        tokenDecoded = token ? atob(token) : null
      } catch (e: any) {
        tokenDecoded = 'ERROR: ' + e.message
      }

      setApiTest({
        url: url,
        sentToken: token,
        tokenDecoded: tokenDecoded,
        headers: headers,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: data,
      })
    } catch (error: any) {
      setApiTest({
        error: error.message,
        errorObject: error,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Debug Page</h1>

        {/* Token Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔑 Token Information</h2>
          {tokenInfo ? (
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(tokenInfo, null, 2)}
            </pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Environment Variables</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(
              {
                NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
                NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
                NODE_ENV: process.env.NODE_ENV,
              },
              null,
              2
            )}
          </pre>
        </div>

        {/* API Test */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🧪 API Test</h2>
          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400 mb-4"
          >
            {loading ? 'Testing...' : 'Test Garden API'}
          </button>

          {apiTest && (
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(apiTest, null, 2)}
            </pre>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => {
                // Set correct token manually
                const correctToken = 'MnxoZmJJRXVlYlRvdjhqNHhLdzZuYUdFY1RrckRNdUFINE4zcWNjV1p1eWpQczZHSEtqeTFzZWw4Tmowa2s='
                localStorage.setItem('auth_token', correctToken)
                alert('✅ Token set! Refresh the page.')
                window.location.reload()
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              🔧 Fix Token Manually (Set Correct Token)
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Clear All localStorage & Reload
            </button>
            <button
              onClick={() => {
                window.location.href = '/dashboard'
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
