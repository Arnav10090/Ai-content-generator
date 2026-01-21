<div align="center">

# 🚀 AI Content Generator

### *Transform Your Ideas into Professional Content in Seconds*

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=for-the-badge)](https://orm.drizzle.team/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots) • [API Routes](#-api-routes)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Key Features in Detail](#-key-features-in-detail)

---

## 🎯 Overview

**AI Content Generator** is a powerful SaaS platform that leverages cutting-edge AI technology to help you create high-quality content effortlessly. Whether you need blog posts, social media content, product descriptions, or creative writing, our platform has you covered.

### Why Choose AI Content Generator?

- ⚡ **Lightning Fast** - Generate content in seconds, not hours
- 🎨 **Beautiful UI** - Modern, responsive design with full dark mode support
- 🔒 **Secure** - Enterprise-grade authentication with Clerk
- 💳 **Flexible Billing** - Pay-as-you-go with Razorpay integration
- 📊 **Smart Analytics** - Track your usage and history with advanced filters
- 🎯 **Multiple Templates** - 10+ pre-built templates for various content types

---

## ✨ Features

### 🎭 Content Generation
- **10+ AI Templates** including:
  - Blog Title Generator
  - Blog Content Writer
  - Instagram Post Generator
  - YouTube Description Creator
  - Code Generator
  - And more!
- **Real-time Preview** with rich text editor
- **Copy to Clipboard** with formatting preservation
- **Word Count Tracking**

### 🎨 User Experience
- **🌓 Dark Mode** - Full theme support across all pages
- **📱 Responsive Design** - Works seamlessly on all devices
- **⚡ Collapsible Sidebar** - Maximize your workspace
- **🔍 Advanced Search & Filters** - Find content instantly
- **📄 Pagination** - Browse history efficiently

### 💰 Billing & Subscriptions
- **Credit System** - 10,000 free credits to start
- **Monthly Plan** - ₹700/month ($9.99/month)
- **Yearly Plan** - ₹7,000/year ($99/year) - Save 17%!
- **Razorpay Integration** - Secure payment processing
- **Auto-renewal** - Hassle-free subscription management

### 📊 Analytics & History
- **Content History** - Track all generated content
- **Template Filter** - Filter by content type
- **Date Sorting** - Newest or oldest first
- **Search** - Full-text search across all content
- **Export** - Copy any previous generation

### 🔒 Security & Authentication
- **Clerk Authentication** - Secure user management
- **Protected Routes** - API route protection
- **Server-side Validation** - Enhanced security
- **Environment Variables** - Sensitive data protection

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Lucide Icons](https://lucide.dev/)** - Modern icon library
- **[Toast UI Editor](https://ui.toast.com/tui-editor)** - Rich text editor
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database (via Neon)
- **[Clerk](https://clerk.com/)** - Authentication & user management
- **[SambaNova AI API](https://sambanova.ai/)** - AI content generation

### Payments
- **[Razorpay](https://razorpay.com/)** - Payment processing

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/)** - Fast bundler

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (we recommend [Neon](https://neon.tech/))
- Clerk account for authentication
- Razorpay account for payments
- SambaNova AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-content-generator.git
   cd ai-content-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials (see [Environment Variables](#-environment-variables))

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

🎉 **You're all set!** Start generating amazing content.

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Neon PostgreSQL)
NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgres_connection_string
DRIZZLE_DB_URL=your_postgres_connection_string

# SambaNova AI API
NEXT_PUBLIC_SAMBANOVA_API_KEY=your_sambanova_api_key

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

# Razorpay Plan IDs
NEXT_PUBLIC_MONTHLY_PLAN_ID=your_monthly_plan_id
NEXT_PUBLIC_YEARLY_PLAN_ID=your_yearly_plan_id
```

### Where to Get Keys

| Service | URL | Purpose |
|---------|-----|---------|
| **Clerk** | [clerk.com](https://clerk.com) | User authentication & management |
| **Neon** | [neon.tech](https://neon.tech) | PostgreSQL database hosting |
| **SambaNova** | [sambanova.ai](https://sambanova.ai) | AI content generation API |
| **Razorpay** | [razorpay.com](https://razorpay.com) | Payment processing |

---

## 📁 Project Structure

```
ai-content-generator/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (context)/                 # React contexts
│   │   ├── TotalUsageContext.tsx
│   │   ├── UpdateCreditUsageContext.tsx
│   │   └── UserSubscriptionContext.tsx
│   ├── (data)/                    # Static data
│   │   └── Templates.tsx
│   ├── api/                       # API routes
│   │   ├── check-subscription/
│   │   ├── create-subscription/
│   │   ├── get-history/
│   │   ├── get-total-usage/
│   │   ├── get-user-subscription/
│   │   └── save-subscription/
│   ├── dashboard/                 # Main app pages
│   │   ├── _components/          # Dashboard components
│   │   │   ├── Header.tsx
│   │   │   ├── SideNav.tsx
│   │   │   ├── SearchSection.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── TemplateListSection.tsx
│   │   │   └── UsageTrack.tsx
│   │   ├── billing/              # Subscription management
│   │   ├── content/              # Content generation
│   │   │   └── [template-slug]/
│   │   ├── history/              # Generation history
│   │   ├── setting/              # User settings
│   │   └── layout.tsx
│   ├── actions.ts                # Server actions
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # Shadcn UI components
│   └── ModeToggle.tsx           # Theme toggle
├── utils/
│   ├── db.tsx                    # Database connection
│   └── schema.tsx                # Database schemas
├── public/                       # Static assets
├── drizzle.config.js            # Drizzle ORM config
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
└── package.json
```

## 🎨 Key Features in Detail

### Collapsible Sidebar
- Smooth 300ms animations
- Persisted state
- Dynamic content layout adjustment
- Tooltips when collapsed

### Dark Mode
- System preference detection
- Manual toggle
- Comprehensive theme support across all components
- Optimized color palette for readability

### History Page
- **Search**: Full-text search across templates and content
- **Filter**: Filter by template type
- **Sort**: Newest first or oldest first
- **Pagination**: Adjustable rows per page (5, 10, 20, 50)
- **Smart pagination**: Shows relevant page numbers with ellipsis

---


<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

Made with ❤️ by [Arnav Tiwari](https://github.com/Arnav10090)

[Back to Top](#-ai-content-generator)

</div>
