# Standardized API Pattern & Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize naming conventions, API call patterns, fix bugs, and clean up inconsistencies across the codebase.

**Architecture:** Create shared utilities (`ContentLoader`, `EmptyState`, `constants.ts`), fix bugs in existing components, rename files/hooks for consistency, then apply the 6-step API pattern to every API-consuming component.

**Tech Stack:** React 19, TypeScript, RTK Query, Tailwind CSS 4

---

## File Structure Summary

### New files to create:
- `src/lib/constants.ts`
- `src/components/common/ContentLoader.tsx`

### Files to modify:
- `src/course/components/CourseCard.tsx` (bug fixes)
- `src/dashboard/components/NavUser.tsx` (avatar fix)
- `src/providers/AuthProvider.tsx` (skip logic fix)
- `src/types/index.ts` (consolidate CourseCardProps)
- 6 API files (single BASE_URL)
- All API-consuming components (apply pattern)
- Multiple components (rename exports)

### Files to delete:
- `src/types/course.ts`
- `src/types/course/index.ts`

### Files to rename:
- `src/hooks/use-mobile.ts` → `useMobile.ts`
- `src/hooks/use-redux.ts` → `useRedux.ts`

---

### Task 1: Create shared utilities

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/components/common/ContentLoader.tsx`

- [ ] **Step 1: Create `src/lib/constants.ts`**

```ts
export const BASE_URL = 'http://localhost:3000';
```

- [ ] **Step 2: Create `src/components/common/ContentLoader.tsx`**

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentLoaderProps {
  rows?: number;
  className?: string;
}

export function ContentLoader({ rows = 4, className }: ContentLoaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === 0 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  );
}
```

---

### Task 2: Fix bugs in CourseCard

**Files:**
- Modify: `src/course/components/CourseCard.tsx:27,60`

- [ ] **Step 1: Fix bestseller badge logic**

In `CourseCard.tsx`, change the condition on line 27 from `!course.isBestseller` to `course.isBestseller`.

- [ ] **Step 2: Fix star rating**

In `CourseCard.tsx`, change `Math.round(5)` to `Math.round(course.rating)` on line 60 (the star fill logic).

---

### Task 3: Fix NavUser avatar fallback

**Files:**
- Modify: `src/dashboard/components/NavUser.tsx:108-110`

- [ ] **Step 1: Fix `split('')[0]` logic**

Change `user.data.avatarUrl.split('')[0]` to `user.data.displayName?.substring(0, 2).toUpperCase() || "US"` for the fallback.

---

### Task 4: Fix AuthProvider skip logic

**Files:**
- Modify: `src/providers/AuthProvider.tsx:18`

- [ ] **Step 1: Fix skip condition**

Change `skip: !hasSessionHint && !!token` to `skip: !hasSessionHint || !!token`.

---

### Task 5: Consolidate CourseCardProps type

**Files:**
- Modify: `src/types/index.ts`
- Delete: `src/types/course/index.ts`
- Delete: `src/types/course.ts`

- [ ] **Step 1: Delete `src/types/course.ts`** (empty file with whitespace)
- [ ] **Step 2: Delete `src/types/course/index.ts`** (duplicate `CourseCardProps` — the one in `src/types/index.ts` is more complete)
- [ ] **Step 3: Update any imports** from `@/types/course` to `@/types`

---

### Task 6: Single BASE_URL constant

**Files:**
- Modify: `src/features/auth/authBaseQuery.ts`
- Modify: `src/features/courses/coursesApi.ts`
- Modify: `src/features/orders/ordersApi.ts`
- Modify: `src/features/coupons/couponsApi.ts`
- Modify: `src/features/enrollments/enrollmentsApi.ts`
- Modify: `src/features/preferences/preferencesApi.ts`

- [ ] **Step 1: Update all 6 files**

In each file, replace the local `const BASE_URL = 'http://localhost:3000'` with `import { BASE_URL } from '@/lib/constants';`

---

### Task 7: Remove dead code

**Files:**
- Modify: `src/dashboard/components/NavUser.tsx` (remove commented ProfileMenu)
- Modify: `src/providers/AuthProvider.tsx` (remove commented useEffect + imports)

- [ ] **Step 1: Clean up NavUser.tsx** — remove the entire commented `ProfileMenu` block (lines 35-90) and the second commented return block (lines 127-154)
- [ ] **Step 2: Clean up AuthProvider.tsx** — remove commented imports and useEffect block (lines 5-8, 22-31)

---

### Task 8: Rename components (Presenter / V2 / Page)

**Files to rename exports in:**
- `src/components/common/Footer.tsx` — `FooterPresenter` → `Footer`
- `src/components/features/FaqPresenter.tsx` — `FAQPresenter` → `Faq`
- `src/components/features/CtaPresenter.tsx` — `FinalCTAPresenter` → `FinalCTA`
- `src/components/features/HeroContainer.tsx` — inline HeroPresenter import directly
- `src/components/features/LearningPathPresenter.tsx` — `LearningPathPresenter` → `LearningPath`
- `src/components/features/Testimonial.tsx` — `TestimonialsPresenter` → `Testimonials`
- `src/auth/pages/Login.tsx` — `LoginV2` → `Login`
- `src/auth/pages/Signup.tsx` — `SignupV2` → `Signup`
- `src/router/app-router.tsx` — update lazy imports
- `src/layouts/MainLayout.tsx` — update imports
- `src/pages/Home.tsx` — update imports

---

### Task 9: Rename hooks

**Files:**
- Rename: `src/hooks/use-mobile.ts` → `src/hooks/useMobile.ts`
- Rename: `src/hooks/use-redux.ts` → `src/hooks/useRedux.ts`

- [ ] **Step 1: Rename files** (git mv)
- [ ] **Step 2: Update imports** in files referencing these hooks

---

### Task 10: Apply standardized pattern — Course pages

**Files:**
- Modify: `src/course/pages/CourseDetail.tsx`
- Modify: `src/course/pages/SearchCourses.tsx`

Apply the 6-step pattern: guard → loading → error → empty → success. Standardize variable names: `isFetching` → `isLoading`, `fetchError` → `error`.

---

### Task 11: Apply standardized pattern — Dashboard pages

**Files:**
- Modify: `src/dashboard/pages/Settings.tsx`
- Modify: `src/dashboard/pages/CoursePlayer.tsx`

Add loading/error guards with the standard pattern.

---

### Task 12: Apply standardized pattern — Checkout pages

**Files:**
- Modify: `src/checkout/pages/Checkout.tsx`
- Modify: `src/checkout/pages/Cart.tsx`

Add loading guard for the `directCourse` query in Checkout.

---

### Task 13: Apply standardized pattern — Other components

**Files:**
- Modify: `src/dashboard/components/RecommendedCourses.tsx`
- Modify: `src/dashboard/components/RoleSwitch.tsx`

Standardize variable names and add loading guards.
