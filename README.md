# WorkMarket — Modern Freelancing Marketplace

![WorkMarket](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80)

WorkMarket is a premium, beautifully crafted frontend simulation of a modern freelancing platform. It connects visionary businesses with top-tier freelance talent across various domains such as web development, design, and mobile apps.

## 🏗 Frontend-Only Architecture

This project is engineered strictly as a **frontend-only** portfolio piece. It demonstrates advanced UI/UX development capabilities without the overhead of backend deployment.

- **Zero Backend/Database:** Completely decoupled from any server or database.
- **Mock Data Engine:** Uses deterministic TypeScript datasets (`data/mockData.ts`) simulating complex relational structures.
- **Client-side State:** Simulates user flows (proposals, search, filtering) using React state and Next.js routing rather than actual database mutations.

## ✨ Core Features

### 🔍 Discovery & Filtering
- **Project Discovery (`/projects`):** Rich grid views with multi-faceted filtering (Category, Budget, Skills).
- **Freelancer Profiles (`/freelancers`):** Talent browsing with rate, rating, and availability filters.
- **Global Search:** Instant, responsive search integrated into the navigation.

### 📝 Proposal Workflows
- **Post a Project (`/projects/post`):** Premium form experience with simulated network latency and success redirection.
- **Submit Proposals (`/proposal/new`):** Client-side validation and multi-step simulation.

### 📊 Client Dashboard
- **Overview (`/dashboard`):** High-level metrics, active projects, and recent activity.
- **Data Management:** Dedicated views for My Projects, Proposals, and Saved Items.
- **Activity Timeline:** Deterministic event tracking mimicking a real marketplace backend.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Validation:** ESLint, strictly typed mock schemas

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dhanush200322/freelancing-marketplace.git
   cd freelancing-marketplace
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment (Vercel)

This application is optimized for zero-config deployment on Vercel:

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import your `freelancing-marketplace` repository.
4. Leave all build settings as default (`npm run build`).
5. Click **Deploy**. Your app will be live globally in seconds!

---

*Designed and engineered for the Future of Work.*
