'use client'

import { useEffect, useState } from 'react'
import { getAuthToken } from '@/lib/garden/api'

interface TokenInfo {
  hasToken: boolean;
  token: string | null;
  tokenLength?: number;
  allLocalStorageKeys: string[];
  allTokens: Record<string, string | null>;
}

interface ApiTestResult {
  url?: string;
  sentToken?: string | null;
  tokenDecoded?: string | null;
  headers?: Record<string, string>;
  status?: number;
  statusText?: string;
  ok?: boolean;
  data?: unknown;
  error?: string;
  errorObject?: unknown;
}

export default function DebugPage() {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [apiTest, setApiTest] = useState<ApiTestResult | null>(null)
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


      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      }


      const response = await fetch(url, {
        headers: headers,
      })

      const data = await response.json()

      let tokenDecoded: string | null = null
      try {
        tokenDecoded = token ? atob(token) : null
      } catch (e) {
        tokenDecoded = 'ERROR: ' + (e instanceof Error ? e.message : String(e))
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
    } catch (error) {
      setApiTest({
        error: error instanceof Error ? error.message : String(error),
        errorObject: error,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800/50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-200">🔍 Debug Page</h1>

        {/* Token Info */}
        <div className="bg-gray-900 rounded-sm shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">🔑 Token Information</h2>
          {tokenInfo ? (
            <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm text-gray-300">
              {JSON.stringify(tokenInfo, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-gray-900 rounded-sm shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">⚙️ Environment Variables</h2>
          <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm text-gray-300">
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
        <div className="bg-gray-900 rounded-sm shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">🧪 API Test</h2>
          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-mint-600 text-white px-6 py-2 rounded hover:opacity-90 disabled:bg-gray-700 mb-4"
          >
            {loading ? 'Testing...' : 'Test Garden API'}
          </button>

          {apiTest && (
            <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm text-gray-300">
              {JSON.stringify(apiTest, null, 2)}
            </pre>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-sm shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">⚡ Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => {
                // Set correct token manually
                const correctToken = 'MnxoZmJJRXVlYlRvdjhqNHhLdzZuYUdFY1RrckRNdUFINE4zcWNjV1p1eWpQczZHSEtqeTFzZWw4Tmowa2s='
                localStorage.setItem('auth_token', correctToken)
                alert('✅ Token set! Refresh the page.')
                window.location.reload()
              }}
              className="bg-mint-600 text-white px-4 py-2 rounded hover:opacity-90 w-full"
            >
              🔧 Fix Token Manually (Set Correct Token)
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded hover:opacity-90 w-full"
            >
              Clear All localStorage & Reload
            </button>
            <button
              onClick={() => {
                window.location.href = '/dashboard'
              }}
              className="bg-mint-500 text-white px-4 py-2 rounded hover:opacity-90 w-full"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
