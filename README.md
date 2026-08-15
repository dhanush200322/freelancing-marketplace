# WorkMarket — Freelancing Marketplace

> A modern frontend marketplace connecting clients with skilled freelancers through project discovery, profiles, proposals, and marketplace workflows.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[Live Demo](https://workmarket-demo.vercel.app/) | [GitHub Repository](https://github.com/dhanush200322/freelancing-marketplace)

<br/>
<div align="center">
  <img src="/public/hero-screenshot.png" alt="WorkMarket Hero Preview" width="100%" />
</div>
<br/>

*Note: This is a frontend-only demonstration project using deterministic mock data. It is intentionally backend-free for portfolio presentation purposes.*

---

## Project Overview

WorkMarket is a modern, responsive freelance marketplace frontend. It simulates the core interactions of a two-sided platform where businesses find talent and professionals find work.

**Clients** use the platform to discover freelancers, explore specialized talent, post projects, invite top-rated professionals, and review incoming proposals. 

**Freelancers** use the platform to discover projects, filter relevant opportunities, view detailed project scope, submit comprehensive proposals, and monitor their marketplace activity.

The application architecture relies completely on deterministic mock data, eliminating the need for a backend or database while providing a fully interactive, product-quality user experience.

---

## Product Experience

The platform is designed around a natural marketplace user journey:

**Homepage** → **Project / Freelancer Discovery** → **Details & Portfolios** → **Proposal / Invitation Submission** → **Dashboard & Activity**

The Hero section on the homepage visually introduces this core concept immediately upon landing, displaying the operational flow:

**Client → Project → Freelancer → Proposal → Collaboration**

---

## Key Features

### Marketplace Discovery
- Project discovery and feed
- Freelancer discovery and talent pool
- Text-based search 
- URL-synchronized filtering by: Category, Skills, Budget, Experience level, Hourly rate, Rating, and Availability
- Active sorting and pagination

### Project Experience
- Comprehensive project cards
- Detailed project scoping (Skills, Budget, Deadline, Proposal count, Experience level)
- "Save Project" interactions

### Freelancer Experience
- Freelancer profile cards
- Professional portfolio views
- Verified skills, ratings, and reviews
- Hourly rates, availability, and response time metrics
- Completed project histories

### Proposal & Hiring Workflow
- Multi-step proposal submission
- Budget and timeline estimation
- Cover letter drafting
- Relevant skill selection
- Direct freelancer invitations
- Proposal status tracking
- Granular success and validation states

### Dashboard
- Global marketplace overview
- Operational statistics
- Active projects and submitted proposals
- Saved projects and favorite freelancers
- Chronological activity timeline
- Quick actions menu

### UX
- Seamless responsive design (320px to 1440px)
- Mobile navigation and mobile-optimized filter drawers
- Skeleton loading states and empty data states
- Granular error states and custom 404 handling
- Accessible forms with keyboard navigation
- Support for reduced-motion preferences

---

## Hero Experience: "Freelance Connection Flow"

The homepage features a unique, custom-built Hero section named the "Freelance Connection Flow." Rather than relying on a generic SaaS template, this Hero visually maps out the platform's core value proposition:

1. **Client** posts a project.
2. **Project** appears in the marketplace.
3. **Freelancer** finds the project.
4. **Proposal** is submitted back to the Client.

This flow uses animated marketplace nodes, profile cards, project scopes, and proposal notifications connected by animated SVG paths. Powered by Framer Motion, it features interactive tooltips, continuous marketplace activity indicators, and full reduced-motion support.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js** | React framework and App Router |
| **TypeScript** | Static typing and interfaces |
| **Tailwind CSS** | Utility-first styling and responsive design |
| **Framer Motion** | UI animations, physics, and transitions |
| **Lucide React** | Consistent, modern iconography |
| **ESLint** | Code quality and linting |
| **Vercel** | Production deployment |

---

## Architecture

### Frontend Architecture

The project leverages the **Next.js App Router** for structured layout and page resolution. 

`UI → Reusable Components → Mock Data Layer → Client-side State → URL Search Parameters`

- **Component-Driven UI**: Built with isolated, highly reusable elements (e.g., `<Button>`, `<Badge>`, `<ProjectCard>`).
- **Strict Typing**: TypeScript models ensure data consistency across the application.
- **Mock Data**: Serves as the application's source of truth.
- **React State**: Manages temporary interactions (modals, forms, active tabs).
- **URL Parameters**: Drives discovery filters, ensuring state can be shared and bookmarked.

---

## Mock-Data Architecture

**This application does not use a backend or database.** 

The entire platform runs on a robust, deterministic mock-data layer:

`Mock Data → Pages → Reusable Components → Client-side Filtering → React State → UI`

Mock data accurately simulates:
- Projects & Freelancers
- Categories & Skills
- Proposals & Reviews
- User Activity & Saved Content

*Disclaimer: All interactions, proposals, and dashboard activities are demonstration workflows and are not persisted to a production database.*

---

## Project Structure

```text
freelancing-marketplace/
├── app/
│   ├── dashboard/
│   ├── freelancers/
│   ├── projects/
│   ├── proposal/
│   ├── error.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── dashboard/
│   ├── freelancers/
│   ├── home/
│   ├── layout/
│   ├── projects/
│   ├── proposals/
│   └── ui/
├── data/
│   ├── activity.ts
│   ├── categories.ts
│   ├── freelancers.ts
│   ├── projects.ts
│   └── proposals.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketplace homepage |
| `/projects` | Project discovery and search |
| `/projects/[id]` | Detailed project view |
| `/freelancers` | Freelancer discovery and talent pool |
| `/freelancers/[id]` | Comprehensive freelancer profile |
| `/proposal/[projectId]` | Standard proposal submission flow |
| `/proposal/new` | Direct freelancer invitation flow |
| `/proposal/success` | Proposal/invitation success confirmation |
| `/dashboard` | Marketplace dashboard overview |
| `/dashboard/projects` | User's active projects |
| `/dashboard/proposals` | User's active proposals |
| `/dashboard/saved` | Bookmarked projects and freelancers |
| `/dashboard/activity` | Historical activity timeline |

---

## Search & Filter Architecture

The discovery pages (`/projects` and `/freelancers`) utilize a URL-driven filtering system. 

Example: `/projects?search=react&category=web-development&level=Expert&page=2`

**Benefits of URL Synchronization:**
- Fully bookmarkable queries
- Easily shareable search results
- Safe to refresh without losing filter context
- Native browser back/forward navigation support
- No backend state required

Filtering logic executes client-side against the local mock data layer, providing instant feedback.

---

## Responsive Design

The application provides a flawless experience across all standard viewports:
`320px | 375px | 430px | 768px | 1024px | 1280px | 1440px`

- **Mobile Navigation**: Hamburger menus and bottom sheets replace desktop navbars.
- **Filter Drawers**: Desktop sidebars gracefully convert into slide-out mobile drawers.
- **Adaptive Layouts**: Dashboards, proposal forms, and the complex homepage Hero adapt sequentially to prevent horizontal overflow and optimize touch targets.

---

## Accessibility

Built with modern web accessibility practices:
- Semantic HTML5 structure
- Full keyboard navigation support with visible focus states
- Explicit `ARIA` labels for inputs and interactive elements
- Contextual form validation messaging
- Correct use of `aria-expanded` and `aria-current`
- Strict adherence to `prefers-reduced-motion` for animations
- Maintained color contrast ratios for text readability

---

## Performance

The application is optimized for speed and fluidity:
- **Next.js Optimization**: Leverages the App Router for efficient component rendering.
- **Lightweight State**: Avoids heavy global state management libraries; relies on React context and URL parameters.
- **Optimized Assets**: Next/Image used for all graphical assets.
- **Judicious Animation**: Framer Motion is used selectively for high-impact interactions, avoiding continuous main-thread calculations.
- **Client-Side Speed**: Filtering against the deterministic dataset happens instantly.
- **Perceived Performance**: Skeleton loading states maintain layout stability during simulated network requests.

---

## SEO

The platform is designed to be easily indexable:
- Comprehensive metadata configuration (Title, Description)
- Open Graph and Twitter card metadata implementation
- Automatically generated `robots.txt` and `sitemap.xml`
- Dynamic metadata generation for individual Project and Freelancer pages
- Excluded indexing for private workflows (Dashboard, Proposals)

---

## Error & Loading UX

Technical errors are gracefully abstracted away from the end-user:
- Global `error.tsx` boundary catches and isolates crashes.
- Custom `not-found.tsx` provides a friendly 404 recovery experience.
- UI components use skeleton states to prevent layout shift during loading.
- Forms utilize strict validation to prevent erroneous submissions.
- Empty states (e.g., "No projects found") guide the user back to discovery.

---

## Local Development

To run the WorkMarket project locally:

1. **Clone the repository**
```bash
git clone https://github.com/dhanush200322/freelancing-marketplace.git
cd freelancing-marketplace
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Access the application**
Open [http://localhost:3000](http://localhost:3000) in your browser.
