
# App Directory Guidelines

- **Server Components**: All pages and layouts are Server Components by default.
- **Client Components**: Add `'use client'` at the top of the file only when using hooks (`useState`, `useEffect`) or event listeners.
- **Data Fetching**: Fetch data directly in Server Components using `supabase` server client or `fetch`.
- **Metadata**: Export `metadata` object for SEO.
- **Route Handlers**: Place API logic in `route.ts`.
