# Implementations Plan (Non-Negotiable Checklist)

This file is the **source of truth** for the requested feature set.

**Rule:** Do not consider the work done until every checklist item is implemented and verified.

---

## 0) Global Acceptance Criteria (applies to everything)

- **Mobile-first:** no horizontal overflow; tabs use `min-w-max`; all modals have safe padding and scroll.
- **A11y:** dialogs/sheets have readable contrast; interactive elements have `sr-only` labels where needed.
- **No sci‑fi / robot UI:** remove “system”, “protocol”, “terminal/hacker” vibes unless explicitly styled as *luxury chronicles*.
- **Gold/Ivory luxury palette:** warm ivory backgrounds + divine gold accents. No neon/cyber colors.
- **Type safety:** no `any` in new work; fix existing `any` when touched.
- **No `console.log` in production.

---

## 1) Critical Bug Fixes (must ship first)

### 1.1 Cart add from single item popup does not reflect in cart
- **Fix:** Ensure popup uses the same Zustand store instance and uses type-safe `addItem`.
- **Acceptance:** Add item from popup -> open cart sheet -> item + quantity visible immediately.

### 1.2 Popup CTA cut off on desktop + modal readability
- **Fix:** Make dialog body scrollable and keep CTA in a sticky bottom bar; increase background opacity + blur.
- **Acceptance:** On desktop and mobile:
  - Add button always visible.
  - Text readable against background.

### 1.3 Cart badge number not visible on menu/cart icon
- **Fix:** Badge must have **gold background** and **black text** with border.
- **Acceptance:** Badge is readable in light and dark.

### 1.4 Remove “Designed by Antigravity” everywhere
- **Fix:** Remove from UI and codebase.
- **Acceptance:** Searching for `Antigravity` / `Designed by` returns no hits.

---

## 2) Dummy Order + Tracking (requested)

### 2.1 Create a dummy order and tracking journey
- **Goal:** user can visit tracking and see a complete journey.
- **Implementation:**
  - Provide a seeded dummy order record (Supabase) or a deterministic mock order id.
  - Tracking view shows map + timeline + courier contact.

### 2.2 Confetti celebration on successful purchase
- **Implementation:**
  - On checkout success or when status becomes `delivered`, trigger MagicUI `Confetti`.
- **Acceptance:** Confetti fires once per success view.

---

## 3) Home Page “Today’s Menu” Experience (MagicUI)

### 3.1 Marquee of latest dishes
- **Component:** https://magicui.design/docs/components/marquee
- **Acceptance:** Dishes scroll slowly, premium spacing, hover pauses.

### 3.2 “Divine Chronicles” output (Terminal)
- **Component:** https://magicui.design/docs/components/terminal
- **Acceptance:** Looks like luxury chronicle (serif/italic gold accents), not hacker terminal.

### 3.3 Hero Video Dialog + Video Text
- **Components:**
  - https://magicui.design/docs/components/hero-video-dialog
  - https://magicui.design/docs/components/video-text
- **Acceptance:** Video-text previews today’s items; clicking opens video dialog.

### 3.4 Globe section (menu-shaped interaction)
- **Component:** https://magicui.design/docs/components/globe
- **Acceptance:** Globe spins slowly; clicking opens today’s menu modal. (If “menu-shaped globe” is not feasible, implement a globe-in-card with a culinary mask/overlay to suggest menu form.)

### 3.5 Animated pointer only when selecting an item
- **Component:** https://magicui.design/docs/components/pointer
- **Acceptance:** Pointer effect is scoped only to menu-item selection surfaces.

### 3.6 Meteors + Particles used tastefully
- **Components:**
  - https://magicui.design/docs/components/meteors
  - https://magicui.design/docs/components/particles
- **Acceptance:** “Mind-blowing” but still luxury: low opacity, gold dust, no neon.

### 3.7 BlurFade on text entrances
- **Component:** https://magicui.design/docs/components/blur-fade
- **Acceptance:** key headings materialize with misty blur.

---

## 4) Navigation (Dock)

### 4.1 Bottom dock as primary navigation
- **Component:** https://magicui.design/docs/components/dock
- **Acceptance:** Dock fixed bottom, magnifies on hover, icons map to:
  - Home
  - Menu section
  - Cart
  - Orders/Tracking
  - Admin
  - Theme/Animation toggle

### 4.2 Animated theme toggler
- **Component:** https://magicui.design/docs/components/animated-theme-toggler
- **Acceptance:** Toggles theme or animation mode (define behavior clearly in code).

---

## 5) Today’s Menu Admin + Sold Out Controls

### 5.1 Admin-only add today’s menu
- **Acceptance:**
  - Only admin can add/edit today’s dishes.
  - Non-admin cannot access admin actions.

### 5.2 “Set all sold out” action
- **Acceptance:** One action marks all today’s menu items sold out.

### 5.3 Realtime sync to homepage
- **Acceptance:** Updating sold-out toggles reflects on home without full refresh (Supabase realtime).

---

## 6) Auth / Roles / Default Admin Account

### 6.1 Create default admin account (for testing)
- **Requirement:** Provide a deterministic way to log in as admin in dev.
- **Acceptance:** Document credentials or seed method (never hardcode secrets in prod).

### 6.2 Role enforcement
- **Acceptance:**
  - Admin required to manage Today’s Menu.
  - Users can view tracking + reorder + contact admin.

---

## 7) Visual Direction (“Glory of God”)

- **Copy:** warm, reverent, premium (no “system/db/module/protocol”).
- **Palette:** ivory + gold, dark mode onyx with gold dust.
- **Typography:** Cinzel headings (uppercase, tracking wide), Manrope body.

---

## 8) Verification Command (run until green)

Use these as your “do not rest” checklist commands:

- `pnpm lint`
- `pnpm dev` and manually verify:
  - Popup add-to-cart updates cart immediately
  - Dock badge visible
  - Dialog CTA not cut off
  - Today’s Menu sections render (marquee/terminal/globe/video)
  - Confetti triggers on success/tracking delivered
  - Admin protections work
