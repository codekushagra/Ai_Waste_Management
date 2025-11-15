# 🌱 SwachhAI - AI-Powered Waste Management System

An intelligent, incentive-based waste management platform that leverages AI verification and blockchain rewards to promote sustainable waste collection and reporting.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Features in Detail](#features-in-detail)
- [Performance Optimizations](#performance-optimizations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Team](#team)

---

## 🎯 Overview

**SwachhAI** is a next-generation waste management solution that combines:

- 🤖 **AI-Powered Verification**: Google Gemini 2.0 Flash for intelligent waste classification
- 🏆 **Token-Based Rewards**: Earn cryptocurrency tokens for successful waste collection
- 🔐 **Web3 Authentication**: Secure login with Web3Auth
- 📍 **Location Tracking**: Google Maps integration for waste location reporting
- ✅ **OTP Verification**: 6-digit OTP system for collection verification
- 📊 **Real-time Dashboard**: Live tracking of collections and rewards
- 🔔 **Smart Notifications**: Real-time notification system

---

## ✨ Key Features

### For Reporters
- 📸 **Report Waste Locations**: Upload photos and location details of waste spots
- 🔍 **AI Verification**: Automatic waste type and quantity verification
- 🎯 **Track Reports**: Monitor collection status in real-time
- 💰 **Earn Rewards**: Receive tokens upon successful collection
- 📱 **Mobile-Friendly**: Fully responsive design

### For Collectors
- 📋 **Task Management**: Browse and filter waste collection tasks
- 📸 **Image Verification**: Upload photos for AI-powered verification
- 🔐 **OTP Authentication**: Secure collection verification with one-time passwords
- 💵 **Instant Rewards**: Earn tokens immediately upon verification
- 📊 **Performance Tracking**: View collection history and statistics

### For Administrators
- 👥 **User Management**: Monitor and manage user accounts
- 📊 **Analytics Dashboard**: Real-time statistics and impact metrics
- ⚙️ **Settings Management**: Configure system parameters
- 🔔 **Notification Control**: Manage notification preferences

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS 4 + Framer Motion (animations)
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

### Backend & Database
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: Web3Auth with Ethereum
- **AI/ML**: Google Generative AI (Gemini 2.0 Flash)

### Maps & Location
- **Maps API**: Google Maps (@react-google-maps/api)
- **Location Services**: Geolocation API

### State Management & Notifications
- **Toast Notifications**: react-hot-toast
- **Local State**: React Hooks

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Build Tool**: Tailwind CSS with PostCSS

---

## 📁 Project Structure

```
wastemanagement/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home/landing page
│   ├── layout.tsx               # Root layout with auth
│   ├── global.css               # Global styles
│   ├── metadata.tsx             # App metadata
│   ├── about/                   # About page
│   ├── team/                    # Team page
│   ├── report/                  # Waste reporting page (protected)
│   ├── collect/                 # Waste collection page (protected)
│   └── [other routes]/
│
├── components/                   # Reusable React components
│   ├── Header.tsx               # Navigation header with auth
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── ProtectedRoute.tsx        # Route protection wrapper
│   ├── PageLoader.tsx           # Loading animation
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── dropdown-menu.tsx
│       └── ...
│
├── utils/                        # Utility functions
│   ├── db/
│   │   ├── actions.ts           # Database functions
│   │   ├── schema.ts            # Drizzle schema definitions
│   │   └── dbConfig.jsx         # Database configuration
│   └── [other utilities]/
│
├── hooks/                        # Custom React hooks
│   └── useMediaQuery.ts         # Responsive design hook
│
├── lib/                          # Library functions
│   └── utils.ts                 # Helper utilities
│
├── public/                       # Static assets
│
├── drizzle/                      # Database migrations
│   ├── migrations/
│   └── meta/
│
├── middleware.ts                 # Next.js middleware
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS config
├── postcss.config.mjs           # PostCSS configuration
├── package.json                 # Dependencies
└── .env                         # Environment variables (not committed)
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- Google Cloud credentials (Gemini API, Maps API)
- Web3Auth credentials

### Step 1: Clone Repository
```bash
git clone https://github.com/codekushagra/Ai_Waste_Management.git
cd wastemanagement
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables))

### Step 4: Database Setup
```bash
npm run db:push  # Push schema to database
npm run db:studio  # Open Drizzle Studio to view database
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Google APIs
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_public_maps_key_here

# Web3Auth
NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID=your_web3auth_client_id_here

# API Configuration (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Getting Credentials:

1. **Gemini API Key**: 
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key

2. **Google Maps API Key**:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps API
   - Create credentials (API key)

3. **Web3Auth Client ID**:
   - [Web3Auth Dashboard](https://dashboard.web3auth.io)
   - Create a new project
   - Copy Client ID

4. **Database URL**:
   - [Neon Console](https://console.neon.tech)
   - Create a new PostgreSQL database
   - Copy connection string

---

## 🎮 Running the Project

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Database Studio (GUI)
```bash
npm run db:studio
```

### Linting
```bash
npm run lint
```

---

## 🗄️ Database Setup

### Schema Overview

**Users Table**
- Stores user accounts and profiles
- Tracks tokens earned and user metadata

**Reports Table**
- Waste reports submitted by users
- Contains location, waste type, amount, status
- Tracks reporter and collector information

**Rewards Table**
- Records token rewards earned
- Links to reports and users

**Notifications Table**
- User notifications and alerts
- Tracks read/unread status

**CollectionOTP Table**
- OTP codes for collection verification
- Stores expiration timestamps

**Transactions Table**
- Records all token transactions
- For audit trail and analytics

### Migrations
Database migrations are stored in the `drizzle/` directory. Push new migrations:
```bash
npm run db:push
```

---

## 📡 API Documentation

### Key Database Functions

#### User Management
```typescript
getUserByEmail(email: string) → User | null
createUser(email: string, name: string) → User
```

#### Waste Reports
```typescript
createReport(userId, location, wasteType, amount, imageUrl) → Report
getRecentReports(limit?: number) → Report[]
updateTaskStatus(taskId, newStatus, collectorId) → Task
```

#### Rewards System
```typescript
saveReward(userId, reportId, amount) → Reward
getUserBalance(userId) → number
getAvailableRewards(userId) → number
```

#### OTP Verification
```typescript
generateCollectionOTP(reportId) → {success, otp, message}
verifyCollectionOTP(reportId, otp) → {success, message}
```

#### Notifications
```typescript
getUnreadNotifications(userId) → Notification[]
markNotificationAsRead(notificationId) → void
clearAllNotifications(userId) → void
```

---

## 🎯 Features in Detail

### 1. AI-Powered Waste Verification
- Uses Google Gemini 2.0 Flash for image analysis
- Verifies waste type and quantity accuracy
- Provides confidence scores
- Supports manual override for edge cases
- Implements exponential backoff for API rate limiting

### 2. OTP Collection System
- 6-digit one-time passwords
- 10-minute expiration window
- Reporter enters OTP shared by collector
- Automatic token rewards upon verification
- Audit trail of all OTP transactions

### 3. Authentication & Security
- Web3Auth for decentralized login
- Email-based session management
- Protected route middleware
- Client-side and server-side auth checks
- Automatic session validation

### 4. Performance Optimizations
- Parallel data fetching (user + tasks simultaneously)
- Query optimization (select only needed columns)
- Result limiting (100 tasks per page)
- Pagination support
- Caching strategies

### 5. User Interface
- Responsive design (mobile, tablet, desktop)
- Smooth animations (Framer Motion)
- Dark mode support
- Accessibility features
- Toast notifications

---

## ⚡ Performance Optimizations

### Database
- ✅ Column-level selection (not SELECT *)
- ✅ Query result limiting
- ✅ Indexed lookups by email and status
- ✅ Efficient filtering logic

### Frontend
- ✅ Hydration-safe components
- ✅ Lazy loading animations
- ✅ useMemo for expensive computations
- ✅ Parallel data fetching
- ✅ Efficient re-render prevention

### Network
- ✅ Exponential backoff for API retries
- ✅ Early error handling
- ✅ Optimized image upload handling
- ✅ Minimal payload transfers

---

## 🐛 Troubleshooting

### Hydration Errors
**Problem**: "Hydration failed because server rendered HTML didn't match client"

**Solutions**:
- Check that state initialization matches between server and client
- Use useEffect for client-only logic
- Use isMounted checks for conditional rendering
- Verify no locale-dependent formatting in render

### Slow Data Fetching
**Problem**: Collect waste page takes too long to load

**Solutions**:
- Check database queries in browser DevTools
- Ensure parallel fetching with Promise.all()
- Verify indexes exist on frequently queried columns
- Check API rate limits (Gemini API)

### Authentication Issues
**Problem**: Web3Auth login not working

**Solutions**:
- Verify Web3Auth credentials in .env.local
- Check browser console for detailed errors
- Ensure localhost is whitelisted in Web3Auth dashboard
- Clear browser localStorage and retry

### Image Upload Failures
**Problem**: Image verification fails with API errors

**Solutions**:
- Check Gemini API key validity
- Ensure images are in supported format (JPEG, PNG)
- Verify file size is reasonable (<5MB)
- Check API quota and rate limits

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Add comments for complex logic
- Test features locally before submitting PR

---

## 👥 Team

**SwachhAI Development Team**
- **Kushagra** - Full Stack Development
- **Sankalp** - Full Stack Development
- **Suryansh** - Full Stack Development
- **Anushka** - Full Stack Development

*B.Tech 4th Year CSE Students*

---

## 📊 Impact Metrics

The platform tracks sustainability metrics:
- 🗑️ **Waste Collected** (in kg)
- 📝 **Reports Submitted** (count)
- 💰 **Tokens Earned** (total earned by users)
- 🌍 **CO2 Offset** (calculated impact)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/codekushagra/Ai_Waste_Management/issues)
- Check existing documentation
- Review troubleshooting section above

---

## 🚀 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time leaderboard
- [ ] Advanced analytics dashboard
- [ ] Integration with waste management facilities
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS alerts

---

## 🌟 Acknowledgments

- Google Generative AI for waste recognition
- Web3Auth for secure authentication
- Neon for serverless database
- Next.js for the amazing framework
- Tailwind CSS for utility-first styling

---

**Made with ❤️ by the SwachhAI Team**

Last Updated: November 15, 2025
