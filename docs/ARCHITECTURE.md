# System Architecture - Tallify

Comprehensive guide to Tallify's technical architecture, design patterns, and system design.

**Version:** 0.1.0-beta
**Last Updated:** January 7, 2026

---

## Tech Stack

### Core Technologies

- **Framework**: Next.js 15 with App Router and Server Components
- **Language**: TypeScript 5.7 (strict mode enabled)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Auth**: Supabase Auth with Magic Links
- **ORM**: Drizzle ORM for type-safe database access
- **Styling**: Tailwind CSS + shadcn/ui component library
- **State Management**: Zustand for client-side state
- **Validation**: Zod schemas for runtime validation
- **Internationalization**: next-intl for multi-language support

### Supporting Libraries

- **Icons**: Lucide React
- **Date Handling**: Native JavaScript Date API
- **Search**: Fuse.js for fuzzy search
- **Testing**: Playwright for E2E and accessibility testing
- **Theme**: next-themes for dark mode support

---

## Server-First Architecture

Tallify follows a **Server-First** pattern that minimizes client-side JavaScript and leverages Next.js Server Components for optimal performance and security.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                         │
│                                                             │
│  • Server Components (default)                             │
│  • Client Components (only when needed)                    │
│  • Progressive Enhancement                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓ ↑
                    Server Actions
                          ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              Next.js App Router (Server)                    │
│                                                             │
│  • Authentication (lib/auth.ts)                            │
│  • Data Fetching (lib/db.ts)                               │
│  • Business Logic (app/dashboard/actions.ts)               │
│  • Validation (Zod schemas)                                │
└─────────────────────────────────────────────────────────────┘
                          ↓ ↑
                   Supabase Client
                          ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│            Supabase PostgreSQL Database                     │
│                                                             │
│  • Row Level Security (RLS)                                │
│  • Automatic Triggers (updated_at, user creation)          │
│  • Type Safety via Drizzle Schema                          │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Server-Side by Default**: All components are Server Components unless client interactivity is required
2. **Progressive Enhancement**: App works without JavaScript (forms use native submission)
3. **Type Safety**: End-to-end type safety from database to UI via TypeScript + Drizzle
4. **Security**: Authentication and authorization handled server-side with RLS
5. **Performance**: Minimal JavaScript, optimized bundle size, server-side rendering

---

## Directory Structure

```
gastos/
├── app/                              # Next.js App Router
│   ├── [locale]/                     # Internationalized routes
│   │   ├── dashboard/                # Main application (route group)
│   │   │   ├── actions.ts            # ⭐ Primary Server Actions
│   │   │   ├── page.tsx              # Dashboard home with KPIs
│   │   │   ├── layout.tsx            # Shared dashboard layout (includes DesktopNav, MobileNav)
│   │   │   ├── nav-section.tsx       # Collapsible navigation sections
│   │   │   ├── dashboard-kpis.tsx    # KPI cards component
│   │   │   ├── categorias/           # Expense categories module
│   │   │   │   ├── [id]/             # Category detail page
│   │   │   │   └── page.tsx
│   │   │   ├── gastos/               # Expenses module
│   │   │   │   ├── expenses-table.tsx
│   │   │   │   ├── upcoming-expenses-widget.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── ingresos/             # Income module
│   │   │   │   ├── categorias/       # Income categories
│   │   │   │   └── page.tsx
│   │   │   ├── metodos-pago/         # Payment methods module
│   │   │   └── configuracion/        # Settings page
│   │   ├── login/                    # Authentication pages
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout
│   └── globals.css                   # Global styles + design tokens
│
├── lib/                              # Core business logic
│   ├── db.ts                         # ⭐ Database queries layer
│   ├── db-helpers.ts                 # Query utilities
│   ├── action-helpers.ts             # ⭐ Server Action utilities
│   ├── auth.ts                       # ⭐ Authentication layer
│   ├── supabase/
│   │   ├── server.ts                 # Supabase server client
│   │   └── client.ts                 # Supabase browser client
│   ├── validations/
│   │   └── schemas.ts                # Zod validation schemas
│   ├── utils/
│   │   ├── formatting.ts             # Currency, date formatters
│   │   ├── currency-helpers.ts       # Currency inference
│   │   └── toast-helpers.tsx         # Toast notifications
│   ├── config/
│   │   └── currencies.ts             # Currency metadata
│   └── drizzle/
│       ├── schema.ts                 # Drizzle schema definitions
│       └── migrations/               # Database migrations
│
├── components/                       # React components
│   ├── ui/                           # Base UI primitives
│   │   ├── button.tsx                # Enhanced button (WCAG AA)
│   │   ├── card.tsx                  # Card containers
│   │   ├── input.tsx                 # Form inputs
│   │   ├── transaction-item.tsx      # ⭐ Transaction display
│   │   ├── filter-bar.tsx            # ⭐ Horizontal filters
│   │   ├── search-bar.tsx            # ⭐ Debounced search
│   │   ├── timeline-group.tsx        # ⭐ Temporal grouping
│   │   ├── empty-state.tsx           # ⭐ Empty states
│   │   └── skeletons.tsx             # ⭐ Loading skeletons
│   ├── global-search.tsx             # ⭐ Global search modal (Cmd+K)
│   └── mobile-nav-bottom.tsx         # ⭐ Mobile bottom navigation (3 items + More)
│
├── docs/                             # Documentation
│   ├── INDEX.md                      # Documentation index
│   ├── QUICK_START.md                # 5-minute setup guide
│   ├── ARCHITECTURE.md               # This file
│   ├── TESTING.md                    # Testing guide
│   ├── COMPONENT_GUIDE.md            # Component catalog
│   ├── ACCESSIBILITY-COMPLIANCE.md   # WCAG compliance
│   ├── design/
│   │   └── design-system.md          # Design system specs
│   ├── deployment/
│   │   ├── DEPLOYMENT.md             # Production deployment
│   │   └── MIGRATION-GUIDE.md        # Database migrations
│   └── product/
│       ├── PRD.md                    # Product requirements
│       └── BRD.md                    # Business requirements
│
├── CLAUDE.md                         # Developer guide (conventions)
├── README.md                         # Project overview
└── package.json                      # Dependencies and scripts

⭐ = Critical architecture components
```

---

## Data Layer (`lib/db.ts`)

### Overview

The Data Layer is the **single source of truth** for all database operations. All database queries MUST go through `lib/db.ts` to ensure consistency, type safety, and maintainability.

### Responsibilities

1. **Type Definitions**: Export TypeScript types for all entities
2. **CRUD Operations**: Create, Read, Update, Delete functions for all tables
3. **Analytics**: Dashboard KPI calculations and aggregations
4. **Business Logic**: Recurring expense calculations, status updates
5. **Data Transformation**: Convert database types to application types

### Key Types

```typescript
// Payment status (auto-calculated based on date)
type PaymentStatus = 'pagado' | 'pendiente' | 'vencido'

// Recurring flag (integer for database compatibility)
type IsRecurring = 0 | 1

// Virtual type for recurring expense instances
type UpcomingExpense = {
  id: string // Composite: `${templateId}-${date}`
  template_id: number
  user_id: string
  category_id: number
  amount: number
  description: string
  due_date: string
  recurrence_frequency: 'weekly' | 'monthly' | 'yearly'
  // ... other fields
}
```

### Recurring Expenses Pattern

**Storage Strategy:**
- Recurring expenses are stored **once** with `is_recurring=1`
- Template includes `recurrence_frequency` (weekly/monthly/yearly)
- No pre-generation of future instances

**Virtual Instance Generation:**
- `getUpcomingRecurringExpenses()` generates virtual instances on-the-fly
- Uses recursion to calculate future dates
- Returns up to N upcoming instances per template
- Instances have composite IDs: `${templateId}-${dueDate}`

**Payment Handling:**
- When virtual instance is paid, creates **new** expense record
- New record has `is_recurring=0` (not a template)
- Original template remains unchanged
- Allows historical tracking and amount variations

**Example:**
```typescript
// Template (stored in DB)
{
  id: 100,
  description: "Rent",
  amount: 1000,
  is_recurring: 1,
  recurrence_frequency: "monthly"
}

// Virtual instances (generated at runtime)
[
  { id: "100-2026-02-01", due_date: "2026-02-01", ... },
  { id: "100-2026-03-01", due_date: "2026-03-01", ... },
  { id: "100-2026-04-01", due_date: "2026-04-01", ... }
]

// Paid instance (created in DB when paid)
{
  id: 250,
  description: "Rent",
  amount: 1000,
  is_recurring: 0,
  date: "2026-02-01",
  payment_status: "pagado"
}
```

---

## Server Actions Pattern

### Overview

Server Actions are the **primary mutation mechanism** in Tallify. They handle all data modifications with built-in authentication, validation, and error handling.

### Location Strategy

- **Primary Actions**: `app/[locale]/dashboard/actions.ts`
  - Handles: Expenses, categories, incomes, payment methods
  - Shared across multiple pages

- **Page-Specific Actions**: Co-located with page (e.g., `categorias/[id]/actions.ts`)
  - Handles: Operations specific to that page only
  - Example: Category budget updates, category-specific analytics

### Action Pattern

Every Server Action follows this consistent pattern:

```typescript
'use server'

import { withAuth } from '@/lib/action-helpers'
import { validateFormData } from '@/lib/action-helpers'
import { revalidateGastos } from '@/lib/action-helpers'
import { expenseSchema } from '@/lib/validations/schemas'
import { createExpense } from '@/lib/db'
import type { ActionResult } from '@/lib/action-helpers'

export async function saveExpense(
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (userId) => {
    // 1. Validate input
    const validation = validateFormData(expenseSchema, formData)
    if (!validation.success) {
      throw new Error(validation.error)
    }

    // 2. Execute database operation
    await createExpense({
      ...validation.data,
      user_id: userId,
    })

    // 3. Revalidate affected routes
    revalidateGastos()

    // 4. Return success (implicitly via withAuth)
  })
}
```

### Key Helper Functions

From `lib/action-helpers.ts`:

#### `withAuth(callback)`
- Wraps Server Action with authentication check
- Automatically catches and formats errors
- Returns standardized `ActionResult`
- Provides authenticated `userId` to callback

#### `validateFormData(schema, formData)`
- Validates FormData against Zod schema
- Converts form fields to proper types
- Returns `{success: true, data}` or `{success: false, error}`

#### Revalidation Helpers
- `revalidateGastos()` - Revalidates `/dashboard` and `/dashboard/gastos`
- `revalidateCategorias()` - Revalidates category pages
- `revalidateIngresos()` - Revalidates income pages
- `revalidateMetodosPago()` - Revalidates payment method pages

---

## Database Schema

### Core Tables

#### `user_profiles`
```sql
CREATE TYPE user_plan AS ENUM ('free', 'pro', 'plus', 'admin');

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan user_plan NOT NULL DEFAULT 'free',
  preferences JSONB DEFAULT '{"currency": "MXN", "theme": "system"}'::jsonb,
  timezone TEXT DEFAULT 'America/Mexico_City',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Key Features:**
- Automatically created via trigger when user signs up
- `plan` uses ENUM for type safety
- `preferences.currency` supports 20 currencies
- `timezone` used for intelligent currency inference

#### `expenses`
```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  amount NUMERIC(10, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  payment_method_id INTEGER REFERENCES payment_methods(id),
  payment_status TEXT DEFAULT 'pendiente'
    CHECK (payment_status IN ('pagado', 'pendiente', 'vencido')),
  is_recurring INTEGER DEFAULT 0 CHECK (is_recurring IN (0, 1)),
  recurrence_frequency TEXT
    CHECK (recurrence_frequency IN ('weekly', 'monthly', 'yearly')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Key Features:**
- `is_recurring` is integer (0/1) for database compatibility
- `payment_status` auto-updated by application logic
- Indexes on `user_id`, `date`, `payment_status` for performance

### Relationships

```
auth.users (1) ──< (1) user_profiles
user_profiles (1) ──< (N) categories
user_profiles (1) ──< (N) expenses
user_profiles (1) ──< (N) payment_methods
user_profiles (1) ──< (N) income_categories
user_profiles (1) ──< (N) incomes
categories (1) ──< (N) expenses
income_categories (1) ──< (N) incomes
payment_methods (1) ──< (N) expenses
payment_methods (1) ──< (N) incomes
```

### Row Level Security (RLS)

All tables have RLS policies that enforce user-scoped access:

```sql
-- Example: expenses table policies
CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = user_id);
```

**Security Benefits:**
- Authorization enforced at database level
- Protection against application bugs
- Works even if ORM is bypassed
- Automatic isolation between users

---

## Navigation & Layout Architecture

### Desktop Sidebar (w-52 / 208px)

The desktop sidebar is a fixed-position navigation panel optimized for balance between navigation and content area.

**Key Specifications:**
- **Width:** 208px (`w-52`) - Reduced from 240px for more content space
- **Position:** Fixed left, full height
- **Visibility:** Hidden on mobile, visible `sm:flex` (≥640px)
- **Main content offset:** `sm:pl-52` applied to content container

**Structure:**
```
┌─────────────────────┐
│ Logo/Brand (link)   │  ← Dashboard access
├─────────────────────┤
│                     │
│ NavSection (Gasto)  │  ← Collapsible with localStorage state
│   ├ Todos           │
│   ├ Categorías      │
│   ├ Métodos de pago │
│   └ ...             │
│                     │
│ NavSection (Ingreso)│  ← Collapsible with localStorage state
│   ├ Todos           │
│   └ ...             │
│                     │
├─────────────────────┤
│ User Profile        │  ← Avatar, name, plan + dropdown
│   • Configuración   │     (Settings, Account, Security,
│   • Mi cuenta       │      Export, Logout)
│   • ...             │
└─────────────────────┘
```

**Design Decisions:**
- No Dashboard link in navigation (accessible via logo)
- No vertical separators on nested items (cleaner visual)
- User profile integrated in sidebar (removed from header)
- Auto-expand section if contains active route

**Implementation:** See `DesktopNav()` function in `/app/[locale]/dashboard/layout.tsx`

### Mobile Navigation (Dual Pattern)

Mobile uses two complementary navigation systems:

#### 1. Bottom Navigation Bar (`MobileNavBottom`)
- **Location:** Fixed bottom, full width
- **Visibility:** Only on mobile (`sm:hidden`)
- **Items:** 3 primary actions (Inicio, Gastos, Más)
- **Sheet "Más":** Contains secondary navigation grouped by section

**Pattern:**
```
┌─────────────────────────────────┐
│  [Inicio]  [Gastos]  [Más...]  │  ← Bottom bar (fixed)
└─────────────────────────────────┘
```

#### 2. Hamburger Sidebar Sheet (`MobileNav`)
- **Trigger:** PanelLeft button in header
- **Pattern:** Radix UI Sheet (slide from left)
- **Structure:** Identical to desktop sidebar (Logo, Dashboard, NavSections, User Profile)
- **Purpose:** Full navigation access on mobile

**Design Decision:** Dual navigation provides flexibility - bottom bar for quick access, hamburger for complete navigation tree.

**Implementation:** See `MobileNav()` function in `/app/[locale]/dashboard/layout.tsx` and `/components/mobile-nav-bottom.tsx`

### NavSection Pattern

Collapsible navigation sections with persistent state:

**Features:**
- Radix UI Collapsible component
- State persisted in localStorage (key: `nav-{section}-open`)
- Auto-expand if contains active route
- Chevron rotation animation (180deg when open)
- No border-left on nested items (previous versions had vertical line)

**Touch Targets (WCAG AA):**
- Section trigger: 40px (`min-h-[40px]`)
- Nested links: 36px (`min-h-[36px]`)

**Implementation:** See `/app/[locale]/dashboard/nav-section.tsx`

### Responsive Breakpoints

```
Mobile (< 640px):
  - MobileNavBottom visible
  - Hamburger sheet for full navigation
  - Sidebar hidden

Desktop (≥ 640px):
  - Sidebar visible (w-52)
  - MobileNavBottom hidden
  - Content offset by pl-52
```

---

## Component Patterns

### Server Components (Default)

**When to use:**
- Displaying data
- Static content
- SEO-critical pages
- No user interaction needed

**Pattern:**
```typescript
// app/dashboard/page.tsx
import { getUser } from '@/lib/auth'
import { getMonthlySummary } from '@/lib/db'

export default async function DashboardPage() {
  const user = await getUser()
  const summary = await getMonthlySummary(user.id)

  return (
    <div>
      <h1>Balance: {summary.balance}</h1>
      {/* Pass data to client components */}
      <ExpenseChart data={summary.expenses} />
    </div>
  )
}
```

**Benefits:**
- Zero JavaScript bundle
- Fast initial page load
- SEO-friendly
- Direct database access

### Client Components ('use client')

**When to use:**
- Forms and inputs
- Interactive UI (dropdowns, modals, tabs)
- Browser APIs (localStorage, geolocation)
- Event handlers (onClick, onChange)
- State management (useState, useReducer)

**Pattern:**
```typescript
// components/add-expense-dialog.tsx
'use client'

import { useState } from 'react'
import { saveExpense } from '@/app/dashboard/actions'

export function AddExpenseDialog({ categories }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add Expense</DialogTrigger>
      <DialogContent>
        <form action={saveExpense}>
          <Input name="description" />
          <Input name="amount" type="number" />
          <Select name="categoryId">
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

**Best Practices:**
- Keep client components small and focused
- Pass data from Server Components as props
- Use Server Actions for mutations (not API routes)
- Minimize client-side state

### Dialog Pattern

All CRUD operations use Radix UI dialogs with progressive enhancement:

```typescript
'use client'

export function CRUDDialog() {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await serverAction(formData)
      if (!result.error) {
        setOpen(false)
        toast.success('Success!')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <form action={handleSubmit}>
          {/* Form fields */}
          <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Styling Architecture

### Design System

Based on the Tallify Design System (see `/docs/design/design-system.md`):

- **Primary Color**: Verde vibrante `#9FFF66` (hsl(98 100% 70%))
- **Semantic Colors**:
  - `transaction-income` - Green for income
  - `transaction-expense` - Red for expenses
  - `transaction-transfer` - Blue for transfers

### CSS Architecture

**Design Tokens** (`app/globals.css`):
```css
:root {
  --primary: 98 100% 70%;
  --foreground: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  --transaction-income: 142 76% 36%;
  --transaction-expense: 0 84% 60%;
  /* ... other tokens */
}

.dark {
  --primary: 98 100% 70%;
  --foreground: 210 40% 98%;
  --background: 224 71% 4%;
  /* ... dark mode overrides */
}
```

**Tailwind Usage:**
```typescript
// ✅ Good: Use design tokens
<div className="bg-primary text-foreground" />

// ❌ Bad: Hardcoded colors
<div className="bg-[#9FFF66] text-black" />
```

### Component Styling

**Pattern:**
```typescript
import { cn } from '@/lib/utils' // clsx + tailwind-merge

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'rounded-md font-medium transition-colors',
        // Focus styles (accessibility)
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        // Size
        'h-11 px-8',
        // Allow overrides
        className
      )}
      {...props}
    />
  )
}
```

### Responsive Design

**Mobile-First Approach:**
```typescript
<div className={cn(
  // Mobile (default)
  'flex flex-col gap-2',
  // Tablet (640px+)
  'sm:flex-row sm:gap-4',
  // Desktop (1024px+)
  'lg:gap-6 lg:px-8'
)} />
```

**Breakpoints:**
- `sm`: 640px (tablet)
- `md`: 768px (small desktop)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)
- `2xl`: 1536px (extra large)

---

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/hooks/*": ["hooks/*"],
      "@/app/*": ["app/*"]
    }
  }
}
```

**Usage:**
```typescript
// ✅ Good: Use aliases
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/auth'

// ❌ Bad: Relative paths
import { Button } from '../../../components/ui/button'
import { getUser } from '../../lib/auth'
```

---

## Performance Optimizations

### Server Components
- Default to Server Components
- Fetch data close to where it's used
- Parallel data fetching with Promise.all()

### Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Lazy load modals and dialogs

### Database
- Indexed columns for frequent queries
- Composite indexes for complex queries
- Connection pooling via Supabase

### Caching
- React `cache()` for request-level deduplication
- `getUserCurrency()` cached per request
- Static page generation where possible

---

## Security

### Authentication
- Supabase Auth with Magic Links
- Session stored in HTTP-only cookies
- CSRF protection via SameSite cookies

### Authorization
- Row Level Security (RLS) at database level
- Server-side auth checks in all Server Actions
- `withAuth()` wrapper ensures authentication

### Data Validation
- Zod schemas for all user inputs
- Type-safe database queries via Drizzle
- SQL injection prevention (parameterized queries)

### Environment Variables
- Secrets stored in `.env.local` (gitignored)
- Public variables prefixed with `NEXT_PUBLIC_`
- Validation at build time

---

## Deployment Architecture

### Production Stack
- **Hosting**: Vercel (recommended) or any Node.js host
- **Database**: Supabase (managed PostgreSQL)
- **CDN**: Automatic via Vercel/Cloudflare
- **Monitoring**: Vercel Analytics, Supabase Dashboard

### Build Process
```bash
pnpm build:prod  # Runs migrations + Next.js build
```

**Steps:**
1. Apply Drizzle migrations to production database
2. Type check entire codebase
3. Build Next.js application
4. Optimize assets and images
5. Generate static pages

### Environment Variables (Production)
```env
# Required
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# For migrations
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres?sslmode=require
```

---

## Migration Strategy

### Database Migrations

**100% Drizzle Approach** - All schema changes via Drizzle:

1. Edit `lib/drizzle/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Review SQL in `lib/drizzle/migrations/`
4. Apply locally: `pnpm db:migrate`
5. Deploy to production: `pnpm build:prod`

**For Complex Migrations:**
Include raw SQL in generated migration files:

```sql
-- Migration 0001_add_user_plan_enum_and_triggers.sql

-- 1. Create ENUM
CREATE TYPE user_plan AS ENUM ('free', 'pro', 'plus', 'admin');

-- 2. Add column
ALTER TABLE user_profiles ADD COLUMN plan user_plan DEFAULT 'free';

-- 3. Create trigger function
CREATE FUNCTION handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, plan)
  VALUES (NEW.id, NEW.email, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

See [MIGRATION-GUIDE.md](./deployment/MIGRATION-GUIDE.md) for complete instructions.

---

## Related Documentation

- **[CLAUDE.md](../CLAUDE.md)** - Development patterns and conventions
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[TESTING.md](./TESTING.md)** - Testing strategies
- **[COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md)** - UI component catalog
- **[design-system.md](./design/design-system.md)** - Design system specifications
- **[DEPLOYMENT.md](./deployment/DEPLOYMENT.md)** - Production deployment guide
- **[MIGRATION-GUIDE.md](./deployment/MIGRATION-GUIDE.md)** - Database migration guide

---

**Last Updated:** January 7, 2026
**Version:** 0.1.0-beta
