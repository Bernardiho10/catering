
# Feature Directory Guidelines

- **Structure**: Each feature should have `components`, `hooks`, `types.ts`, and `index.ts` (optional).
- **Isolation**: Features should be as self-contained as possible.
- **Imports**: Import shared UI from `@/components/ui`.
- **State**: Use strictly typed Zustand stores for complex feature state.
