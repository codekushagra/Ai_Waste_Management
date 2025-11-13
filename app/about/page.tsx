'use client'

import { Leaf, Target, Users, Zap, Globe, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              SwachhAI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            An Intelligent Waste Management and Circular Economy Platform Leveraging AI and Blockchain Technology
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A Final Year Project dedicated to revolutionizing waste management through innovative technology
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                SwachhAI is an intelligent waste management platform designed to streamline waste collection, 
                verification, and reward distribution. By combining AI-powered waste verification with blockchain 
                technology, the platform ensures transparent and secure transactions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform addresses the critical need for efficient waste management systems while incentivizing 
                environmental participation through a token-based reward mechanism. Users can report waste locations, 
                collect waste, and earn tokens that can be redeemed for real-world rewards.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This project bridges the gap between environmental sustainability and technological innovation, 
                creating a circular economy model where waste becomes a valued resource. By leveraging machine learning 
                for waste verification and blockchain for transparent tracking, SwachhAI sets a new standard in waste 
                management.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform aims to engage communities in waste management initiatives while creating a data-driven 
                approach to environmental conservation and resource optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Verification</h3>
              <p className="text-gray-600">
                Automated waste verification using Google Generative AI with manual override capability for complex cases
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Engagement</h3>
              <p className="text-gray-600">
                Incentivize environmental participation through token-based rewards and a transparent leaderboard system
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <Globe className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain Integration</h3>
              <p className="text-gray-600">
                Secure, transparent transaction tracking with Web3Auth authentication and on-chain reward management
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <Target className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor waste collection tasks, track rewards, and view collection history with detailed analytics
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive insights into waste collection patterns, rewards earned, and environmental impact metrics
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <Leaf className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Circular Economy Model</h3>
              <p className="text-gray-600">
                Promotes sustainable practices by converting waste into redeemable rewards and environmental value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js with React for modern UI</li>
                <li>• TailwindCSS for responsive styling</li>
                <li>• React Maps API for location tracking</li>
                <li>• React Hot Toast for user notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend & Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js API Routes for server-side logic</li>
                <li>• Drizzle ORM with PostgreSQL database</li>
                <li>• Google Generative AI for waste verification</li>
                <li>• Web3Auth for secure authentication</li>
                <li>• Ethereum blockchain integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Project Objectives</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Environmental Impact</h4>
              <p className="text-gray-600">
                Create an efficient waste management system that reduces environmental pollution and promotes sustainable practices
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Engagement</h4>
              <p className="text-gray-600">
                Incentivize public participation in waste collection through transparent reward mechanisms
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Technological Innovation</h4>
              <p className="text-gray-600">
                Demonstrate the practical application of AI and blockchain technology in solving real-world environmental challenges
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Economic Sustainability</h4>
              <p className="text-gray-600">
                Create a circular economy model where waste management generates value through token rewards and incentives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the SwachhAI Movement</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a revolutionary waste management initiative that combines technology, sustainability, and community engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50">
              <Link href="/report">Report Waste</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-green-600 hover:bg-green-700">
              <Link href="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
