'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Home, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Report to error tracking service
    if (typeof window !== 'undefined') {
      // Example: reportError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} reset={this.handleReset} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.handleReset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            เกิดข้อผิดพลาดขึ้น 😔
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            &ldquo;ขออภัยค่ะ มีบางอย่างผิดพลาด เราจะแก้ไขให้เร็วที่สุด&rdquo;
          </p>
          
          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <summary className="cursor-pointer font-medium text-red-600 dark:text-red-400 mb-2">
                รายละเอียดข้อผิดพลาด (สำหรับนักพัฒนา)
              </summary>
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-auto max-h-40">
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </details>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>ลองใหม่</span>
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>กลับหน้าแรก</span>
              </motion.button>
            </Link>
          </div>

          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/contact" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>แจ้งปัญหา</span>
            </Link>
            
            <Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>เกี่ยวกับเรา</span>
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 animate-bounce" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 dark:bg-orange-900 rounded-full opacity-30 animate-pulse" />
      </motion.div>
    </div>
  );
}

// Pre-built error components for specific scenarios
export function NetworkErrorFallback({ reset }: { reset: () => void }) {
  return (
    <div className="text-center p-8">
      <div className="text-6xl mb-4">📡</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        ปัญหาการเชื่อมต่อ
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ กรุณาตรวจสอบการเชื่อมต่อ
      </p>
      <motion.button
        onClick={reset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
      >
        ลองเชื่อมต่อใหม่
      </motion.button>
    </div>
  );
}

export function NotFoundFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          &ldquo;หน้าที่คุณหาไม่พบ&rdquo;
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          &ldquo;ขออภัยค่ะ หน้าที่คุณกำลังมองหาอาจถูกย้าย หรือไม่มีอยู่แล้ว&rdquo;
        </p>
        <div className="space-y-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              กลับหน้าแรก
            </motion.button>
          </Link>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/courses" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
              โปรแกรมสุขภาพ
            </Link>
            <Link href="/dashboard" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
              Wellness Garden
            </Link>
            <Link href="/contact" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary; 