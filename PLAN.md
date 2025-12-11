# Airloft - Hot Air Balloon Events Website

## Project Overview
A Next.js website for "Airloft" - a company that hosts events inside a giant hot air balloon laid on its side and inflated with cold air via fans. Capacity: 250 people. Events include sound baths, DJ parties, silent discos, yoga/meditation seminars, album releases, art galleries, and corporate/private events.

## Tech Stack
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (dark, festival aesthetic)
- **Auth:** Clerk
- **Database:** Convex
- **Payments:** Stripe (invoicing system)
- **AI:** Vercel AI SDK + Google API (Gemini for chat, Imagen for images)
- **Hosting:** Vercel

---

## CLIs Required
- `gh` - GitHub CLI for repo management
- `vercel` - Vercel CLI for deployment
- `npx convex` - Convex CLI for database
- `stripe` - Stripe CLI for webhooks testing

---

## Implementation Phases

### Phase 1: Project Setup & Foundation

#### 1.1 Initialize Git & GitHub
```bash
git init
gh repo create airloft --public --source=. --remote=origin
```

#### 1.2 Initialize Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
```

#### 1.3 Install Dependencies
```bash
npm install @clerk/nextjs convex @stripe/stripe-js stripe lucide-react clsx tailwind-merge
npm install ai @ai-sdk/google
npm install -D @types/node
```

#### 1.4 Initial Commit & Push
```bash
git add .
git commit -m "Initial Next.js setup with dependencies"
git push -u origin main
```

#### 1.5 Configure Tailwind (Dark Festival Theme)
**File:** `tailwind.config.ts`
- Background: Deep blacks (#0a0a0f, #12121a)
- Primary: Purple (#a855f7)
- Accents: Pink (#ec4899), Orange (#f97316), Cyan (#06b6d4)
- Glass morphism utilities
- Glow effect utilities

#### 1.6 Setup Convex
```bash
npx convex dev
```
**File:** `convex/schema.ts` - Define tables:
- `users` (synced from Clerk)
- `events` (all event types, capacity, pricing)
- `bookings` (user bookings with Stripe invoice tracking)
- `galleryImages` (event photos)
- `inquiries` (contact form submissions)

#### 1.7 Setup Clerk Auth
**Files:**
- `middleware.ts` - Route protection
- `src/providers/convex-clerk-provider.tsx` - Combined provider
- `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`

#### 1.8 Setup Vercel Deployment
```bash
vercel link
vercel env pull .env.local
```

#### 1.9 Setup Stripe CLI (for local webhook testing)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

### Phase 2: AI Image Generation (nano banana)

Generate 20-30 editorial images across event types:

#### Interior Shots (Dramatic - for parties/festivals)
1. **DJ Party** - DJ booth with lasers, crowd silhouettes, purple/pink lighting
2. **DJ Party** - Crowd dancing, balloon fabric glowing with projected visuals
3. **Silent Disco** - People wearing headphones, colorful LED headphone glow
4. **Silent Disco** - Wide shot showing the dome shape, scattered lighting
5. **Album Release** - Stage setup, artist performing, dramatic spotlights

#### Interior Shots (Warm Ambient - for wellness)
6. **Sound Bath** - Crystal bowls arrangement, soft golden light, meditation poses
7. **Sound Bath** - Close-up of bowls with balloon fabric texture above
8. **Yoga Seminar** - Group yoga poses, morning light filtering through fabric
9. **Yoga Seminar** - Instructor leading class, peaceful atmosphere
10. **Meditation** - Seated meditation circle, candles, warm glow
11. **Meditation** - Solo meditator, dramatic fabric backdrop

#### Interior Shots (Art/Creative)
12. **Art Gallery** - Projections on balloon fabric walls, gallery attendees
13. **Art Gallery** - Sculptural installations inside the dome
14. **Corporate Event** - Professional setup, presentation screen, seated audience

#### Exterior Shots (Each Event Type)
15. **DJ Party exterior** - Balloon glowing at night, desert/field setting, Coachella vibes
16. **Silent Disco exterior** - Twilight shot, people entering, string lights
17. **Sound Bath exterior** - Golden hour, balloon against sunset
18. **Yoga exterior** - Morning light, peaceful landscape
19. **Art Gallery exterior** - Urban setting, modern aesthetic
20. **Corporate exterior** - Professional venue look

#### Hero/Marketing Shots
21. **Wide establishing shot** - Balloon from distance, festival grounds
22. **Aerial view** - Drone perspective showing scale
23. **Detail shot** - Fans inflating the balloon, setup process
24. **Crowd shot** - 250 people inside, showing scale
25. **Atmospheric shot** - Fog/haze with lighting beams

**Image Prompts Style Guide:**
- Editorial quality, shallow depth of field
- Coachella/Outside Lands festival aesthetic
- Rich colors, dramatic lighting
- Mix of wide shots and intimate moments
- Human subjects for scale and emotion

---

### Phase 3: Core Components

#### 3.1 Layout Components
**Files:**
- `src/components/layout/header.tsx` - Navigation, auth buttons
- `src/components/layout/footer.tsx` - Links, social, newsletter
- `src/components/layout/mobile-nav.tsx` - Hamburger menu

#### 3.2 UI Components
**Files:**
- `src/components/ui/button.tsx` - Primary, secondary, ghost variants
- `src/components/ui/card.tsx` - Glass morphism style
- `src/components/ui/input.tsx` - Form inputs
- `src/components/ui/badge.tsx` - Event type badges
- `src/components/ui/modal.tsx` - Lightbox, confirmations

#### 3.3 Event Components
**Files:**
- `src/components/events/event-card.tsx` - Event listing card
- `src/components/events/event-grid.tsx` - Grid layout
- `src/components/events/event-filters.tsx` - Type, date filters
- `src/components/events/event-type-badge.tsx` - Colored badges

---

### Phase 4: Public Pages

#### 4.1 Homepage
**File:** `src/app/page.tsx`
- Hero section with video/image background
- Featured events carousel
- Venue showcase (how balloon works)
- Event types grid
- Testimonials
- CTA section

#### 4.2 Events Listing
**File:** `src/app/events/page.tsx`
- Filterable event grid
- Calendar view toggle
- Pagination

#### 4.3 Event Detail
**File:** `src/app/events/[eventId]/page.tsx`
- Hero image
- Event info (date, time, price, capacity)
- Description
- Artist/instructor info
- Booking CTA
- Related events

#### 4.4 About Page
**File:** `src/app/(marketing)/about/page.tsx`
- Company story
- How the balloon works (infographic)
- Team section
- Press mentions

#### 4.5 Gallery Page
**File:** `src/app/(marketing)/gallery/page.tsx`
- Masonry grid
- Event type filters
- Lightbox component

---

### Phase 5: Booking System & Stripe

#### 5.1 Booking Flow
**File:** `src/app/book/page.tsx`
- Multi-step form:
  1. Select event (if not pre-selected)
  2. Guest count & details
  3. Contact information
  4. Review & submit

#### 5.2 Stripe Invoice Integration
**File:** `src/app/api/stripe/create-invoice/route.ts`
- Create Stripe customer
- Generate invoice with line items
- Send invoice via Stripe

**File:** `convex/http.ts`
- Webhook handler for invoice.paid, invoice.payment_failed

#### 5.3 User Dashboard
**Files:**
- `src/app/dashboard/page.tsx` - Booking history
- `src/app/dashboard/bookings/[bookingId]/page.tsx` - Booking detail

---

### Phase 6: AI Features (Vercel AI SDK + Google)

#### 6.1 AI Chat Assistant
**File:** `src/app/api/chat/route.ts`
- Streaming chat using Vercel AI SDK
- Google Gemini model for conversational AI
- Context: Airloft events, booking help, FAQs
- System prompt with company knowledge

**File:** `src/components/chat/chat-widget.tsx`
- Floating chat button (bottom-right)
- Chat panel with message history
- useChat hook from AI SDK
- Suggested questions/prompts

**Chat Capabilities:**
- Answer questions about events
- Help with booking inquiries
- Explain the balloon venue
- Provide event recommendations based on preferences
- Guide through booking process

#### 6.2 AI Image Generation (Build Tool)
**File:** `scripts/generate-images.ts`
- Uses Google Imagen via AI SDK
- Generates all 25 event images
- Saves to public/images/

**Note:** Images will be pre-generated during build, not dynamically generated at runtime.

---

### Phase 7: Admin Dashboard

#### 7.1 Admin Layout
**File:** `src/app/admin/layout.tsx`
- Sidebar navigation
- Role check (redirect non-admins)

#### 7.2 Admin Pages
**Files:**
- `src/app/admin/page.tsx` - Stats overview
- `src/app/admin/events/page.tsx` - Event management
- `src/app/admin/events/new/page.tsx` - Create event
- `src/app/admin/events/[eventId]/edit/page.tsx` - Edit event
- `src/app/admin/bookings/page.tsx` - All bookings
- `src/app/admin/gallery/page.tsx` - Image management

---

### Phase 8: Convex Backend

#### 8.1 Queries & Mutations
**Files:**
- `convex/events.ts` - list, get, create, update, delete
- `convex/bookings.ts` - create, list by user, update status
- `convex/users.ts` - sync from Clerk, get profile
- `convex/gallery.ts` - list, upload, delete
- `convex/inquiries.ts` - create, list, update status

#### 8.2 Auth Config
**File:** `convex/auth.config.ts` - Clerk JWT verification

---

## Project Structure

```
airloft/
├── convex/
│   ├── schema.ts
│   ├── auth.config.ts
│   ├── events.ts
│   ├── bookings.ts
│   ├── users.ts
│   ├── gallery.ts
│   └── http.ts
├── public/
│   └── images/          # AI-generated images
├── scripts/
│   └── generate-images.ts  # AI image generation script
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   ├── (marketing)/
│   │   ├── events/
│   │   ├── book/
│   │   ├── dashboard/
│   │   ├── admin/
│   │   └── api/
│   │       ├── chat/route.ts      # AI chat endpoint
│   │       └── stripe/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── events/
│   │   ├── booking/
│   │   ├── gallery/
│   │   ├── chat/                   # AI chat widget
│   │   └── admin/
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── stripe.ts
│   ├── hooks/
│   ├── providers/
│   └── types/
├── tailwind.config.ts
└── next.config.js
```

---

## Environment Variables Required

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Google AI (Vercel AI SDK)
GOOGLE_GENERATIVE_AI_API_KEY=
```

---

## Implementation Order

1. **Git & GitHub** - `git init`, `gh repo create airloft`
2. **Next.js Setup** - Create project, install deps, configure Tailwind
3. **Convex** - `npx convex dev`, define schema, deploy
4. **Clerk** - Configure auth, middleware, provider
5. **Vercel** - `vercel link`, configure env vars
6. **Images** - Generate all AI images via nano banana
7. **UI Components** - Build base component library
8. **Layout** - Header, footer, navigation
9. **Homepage** - Hero, featured events, venue showcase
10. **Events** - Listing page, detail page
11. **About & Gallery** - Static/gallery pages
12. **AI Chat** - Chat widget + API endpoint with Gemini
13. **Stripe** - `stripe listen`, booking flow, invoicing
14. **Dashboard** - User booking history
15. **Admin** - Event/booking management
16. **Polish** - Animations, loading states, error handling
17. **Deploy** - `vercel --prod`, custom domain

## Git Workflow
- Commit after each major phase
- Use conventional commits: `feat:`, `fix:`, `chore:`
- Push to GitHub after each session
- Vercel auto-deploys on push to main

---

## Key Design Decisions

- **Dark theme** with festival/Coachella aesthetic
- **Glass morphism** cards and overlays
- **Gradient accents** (purple → pink → orange)
- **Glow effects** on CTAs and hover states
- **Full-bleed images** for immersive feel
- **Mobile-first** responsive design
