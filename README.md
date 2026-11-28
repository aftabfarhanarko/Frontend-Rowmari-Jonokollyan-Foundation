# রৌমারী জনকল্যাণ ফাউন্ডেশন (RJF) — Frontend (`rjf`)

Official Next.js 16 web application and Super Admin / Member dashboard for **Rowmari Janakalyan Foundation (রৌমারী জনকল্যাণ ফাউন্ডেশন)**, built with TypeScript, Tailwind CSS v4, Redux Toolkit Query (RTK Query), and Zustand.

---

## Tech Stack

- **Framework:** Next.js `16.4.6` (App Router) + React `19.3.0` + TypeScript `5`
- **Styling & UI:** Tailwind CSS `4.3.3`, Framer Motion, Lucide React, Base UI, Sonner (toasts)
- **State & Data Fetching:** Redux Toolkit / RTK Query (`src/store/api/*`), Zustand (`src/store/useAppStore.ts`)
- **Forms & Validation:** React Hook Form, Zod, `@hookform/resolvers`
- **Tables:** `@tanstack/react-table`
- **PWA:** Manifest, Service Worker (`public/sw.js`), and install prompt (`src/context/PwaContext.tsx`)

---

## Directory Structure

```text
rjf/
├── public/
│   ├── icons/                      # App & favicon PNG icons (16x16 to 512x512)
│   ├── images/activities/          # Activity cover photographs
│   ├── manifest.json / .webmanifest
│   └── sw.js                       # Service worker
└── src/
    ├── app/                        # Next.js App Router pages
    │   ├── about/                  # /about (CMS-connected about-us page)
    │   ├── activities/             # /activities (public activities archive)
    │   ├── campaigns/              # /campaigns (fundraising campaigns)
    │   ├── contact/                # /contact (contact & helpline form)
    │   ├── dashboard/              # Role-based Admin & Member Dashboard
    │   │   ├── activities/         # Projects & activities CRUD (/dashboard/activities)
    │   │   ├── activity-logs/      # Audit logs
    │   │   ├── analytics/          # Reports & analytics
    │   │   ├── campaigns/          # Campaign management
    │   │   ├── cases/              # Field case verification
    │   │   ├── committees/         # Committees, designations, members & registered users
    │   │   ├── content/            # Content hub
    │   │   ├── donations/          # Donation verification & ledger
    │   │   ├── education/          # Education aid applications
    │   │   ├── finance/            # Financial records & expenses
    │   │   ├── footer/             # Footer CMS config
    │   │   ├── gallery/            # Gallery management
    │   │   ├── hero/               # Hero slider CMS
    │   │   ├── medical/            # Medical aid applications
    │   │   ├── messages/           # Public contact messages
    │   │   ├── modal/              # Notice modal CMS
    │   │   ├── my-applications/    # Member aid application tracking
    │   │   ├── my-donations/       # Member donation history
    │   │   ├── my-profile/         # Member profile
    │   │   ├── my-volunteer/       # Member volunteer status
    │   │   ├── news/               # News, events & notices CMS
    │   │   ├── notifications/      # Notifications center
    │   │   ├── pages/              # Public CMS pages (about-us, etc.)
    │   │   ├── profile/            # Account profile
    │   │   ├── roumari/            # Amader Roumari portal management
    │   │   ├── settings/           # Global website & SEO settings
    │   │   ├── users/              # User & admin role management
    │   │   └── volunteers/         # Volunteer applications & roster
    │   ├── donate/                 # /donate (donation flow & policy)
    │   ├── donation-policy/        # /donation-policy
    │   ├── gallery/                # /gallery
    │   ├── login/                  # /login
    │   ├── news/                   # /news (press releases, events & notices)
    │   ├── privacy/                # /privacy
    │   ├── register/               # /register
    │   ├── roumari/                # /roumari (Our Roumari directory & local info)
    │   ├── team/                   # /team (Committees & leadership directory)
    │   ├── terms/                  # /terms
    │   ├── verify-member/          # /verify-member (RJF ID lookup & verification)
    │   └── volunteer/              # /volunteer (volunteer wings & registration)
    ├── components/
    │   ├── dashboard/              # Sidebar, tabs, CMS editors, modals & tables
    │   ├── home/                   # Home page sections (Hero, QuickActions, RecentActivities, etc.)
    │   ├── layout/                 # TopAnnouncement, Navbar, Footer, MobileBottomBar, PageBanner
    │   ├── modals/                 # DonationModal, VolunteerModal, AssistanceModal, TrackingResultModal
    │   ├── pwa/                    # PwaInstallButton
    │   ├── team/                   # MemberVerificationCard
    │   └── ui/                     # Reusable UI primitives (button, badge, table, skeleton, ImageUploader)
    ├── config/
    │   └── dashboard-navigation.ts # Role-based sidebar navigation & route permissions
    ├── context/
    │   └── PwaContext.tsx          # PWA install state
    ├── lib/
    │   ├── axios.ts                # Axios client instance
    │   ├── imgbb.ts                # Image upload helper
    │   └── validations/            # Zod validation schemas
    ├── store/
    │   ├── api/                    # RTK Query endpoints (baseApi, adminApi, activitiesApi, committeesApi, etc.)
    │   ├── index.ts                # Redux store setup
    │   └── useAppStore.ts          # Zustand client UI/auth state
    ├── types/
    │   └── index.ts                # Shared TypeScript interfaces
    └── proxy.ts                    # Auth/role route handling
```

---

## Environment Setup

Create `.env.local` inside `rjf/` with your API base URL and optional image upload key:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## Available Scripts

Run inside `rjf/`:

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Type-check TypeScript
npx tsc --noEmit

# Run ESLint
npm run lint

# Build for production & start
npm run build
npm run start
```
