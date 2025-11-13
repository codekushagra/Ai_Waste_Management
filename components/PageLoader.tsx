'use client'

import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center z-[9999]"
    >
      {/* Main Loader Container */}
      <div className="flex flex-col items-center gap-8">
        {/* Animated Leaf Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            {/* Outer rotating circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-500 w-24 h-24"
            />

            {/* Middle rotating circle */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border-3 border-transparent border-b-blue-500 border-l-cyan-500 w-20 h-20"
            />

            {/* Inner circle */}
            <motion.div
              className="relative w-24 h-24 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Leaf className="w-12 h-12 text-green-600" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loader Text */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
          >
            SwachhAI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 font-medium text-lg"
          >
            Initializing AI Waste Management...
          </motion.p>
        </div>

        {/* Animated Loading Bars */}
        <motion.div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              animate={{ height: [24, 40, 24] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.1,
              }}
              className="w-1.5 bg-gradient-to-t from-green-500 to-emerald-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* Loading Percentage / Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500 mb-3">
            Building a sustainable future...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-1">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400"
            >
              ●
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="text-gray-400"
            >
              ●
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="text-gray-400"
            >
              ●
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
