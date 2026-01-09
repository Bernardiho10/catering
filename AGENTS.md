# AGENTS.md - Crafting with Katherine

> [!IMPORTANT]
> This file serves as the source of truth for all AI agents working on this project. Follow these instructions strictly.

## Project Overview
"Crafting with Katherine" is a catering order service application (DoorDash-like) built for the US market.
- **Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe.
- **Package Manager**: pnpm.
- **Currency**: USD ($).
- **Language**: American English.

## Operational Commands
- **Install Dependencies**: `pnpm install`
- **Development Server**: `pnpm dev` (Runs on http://localhost:3000)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format` (if available) or Prettier default.

## Code Style & Conventions
- **TypeScript**: Strict mode enabled. Use interfaces for props.
- **Imports**: Use absolute imports `@/` (e.g., `@/components/ui/button`).
- **Styling**: Tailwind CSS. Use `cn()` utility for class merging.
- **Components**:
    - Place generic UI components in `src/components/ui`.
    - Place feature-specific components in `src/features/<feature-name>`.
    - Use Functional Components with named exports.
- **State Management**:
    - Global client state: Zustand.
    - Server state: React Query (if needed) or server actions.
- **Data Fetching**:
    - Server Components: Direct DB calls or fetch.
    - Client Components: SWR or React Query or generic fetch with effects.

## Architecture
- **Auth**: Supabase Auth (SSR middleware).
- **Database**: Supabase PostgreSQL.
- **Payments**: Stripe.
- **Realtime**: Supabase Realtime (Channels) for order tracking.

## Critical Rules
1. **Mobile First**: Always ensure responsive design.
2. **Accessibility**: Maintain high ARIA standards.
3. **Environment**: Never hardcode secrets. Use `process.env`.
4. **Validation**: Use Zod for all inputs.

## Directory Structure
- `/src/app`: App Router pages and API routes.
- `/src/components`: React components.
- `/src/lib`: Utilities, clients (Supabase, Stripe).
- `/src/features`: Domain-driven feature modules (Menu, Cart, Admin).
- `/supabase`: SQL migrations and types.
