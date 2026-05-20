# Onboarding Preferences Flow — Design Document

## Overview

After a user signs up, guide them through a multi-step wizard to collect their learning preferences (role, interests, goals, experience level, time commitment). On completion, save preferences and redirect to the dashboard where personalized course recommendations are shown.

## Flow

```
/auth/signup  →  /auth/login  →  /onboarding  →  /dashboard (with recommendations)
                                         ↓ (if refresh)
                                       Resume from saved step (sessionStorage)
```

## Routes

| Route | Component | Guard |
|---|---|---|
| `/onboarding` | `OnboardingPage` | `ProtectedComponent` (must be logged in) |
| `/dashboard` | Dashboard pages | Check `GET /preferences` — if empty, redirect to `/onboarding` |

## Directory Structure

```
src/
  onboarding/
    pages/
      OnboardingPage.tsx          # Wizard container with step state
    components/
      OnboardingStepper.tsx       # Step progress indicator (4 dots with labels)
      StepRole.tsx                # Step 1: Who are you?
      StepInterests.tsx           # Step 2: Topics of interest
      StepGoals.tsx               # Step 3: Learning goal
      StepLevelTime.tsx           # Step 4: Experience level + time commitment
    types.ts                      # Preference-related types
  features/
    preferences/
      preferencesApi.ts           # RTK Query API for preferences CRUD
  dashboard/
    components/
      RecommendedCourses.tsx      # Course recommendation section on dashboard
```

## Types (`src/onboarding/types.ts`)

```typescript
export type UserRole = 'student' | 'working_professional' | 'career_switcher' | 'hobbyist'

export type InterestTopic =
  | 'java' | 'python' | 'web_development' | 'cloud'
  | 'mobile' | 'security' | 'microservices' | 'blockchain'

export type Goal = 'get_job' | 'upskill' | 'personal_project' | 'academic'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export type TimeCommitment = 'casual' | 'moderate' | 'intensive'

export interface OnboardingData {
  role: UserRole | null
  interests: InterestTopic[]
  goal: Goal | null
  experienceLevel: ExperienceLevel | null
  timeCommitment: TimeCommitment | null
}

// What gets sent to the API
export interface UserPreferences extends OnboardingData {}
```

## Component Design

### Wizard Container (`OnboardingPage`)
- Uses `useReducer` for step state
- Tracks current step (0-3) and `OnboardingData`
- Wraps children with Framer Motion `AnimatePresence` for step transitions
- Persists current step + partial data to `sessionStorage` so refresh doesn't lose progress
- On final step "Finish": calls `savePreferences` mutation → navigates to `/dashboard`

### Stepper (`OnboardingStepper`)
- Horizontal 4-step progress bar
- Completed steps = filled circle + checkmark
- Current step = active highlight
- Future steps = outline only
- Step labels: "Your Role", "Interests", "Goal", "Level & Time"

### Step 1 — Role (`StepRole.tsx`)
- 4 large cards with icons (Student, Working Professional, Career Switcher, Hobbyist)
- Single-select, visually prominent
- Framer Motion staggered entrance

### Step 2 — Interests (`StepInterests.tsx`)
- Chip/toggle buttons, multi-select
- Topics derived from `CATEGORIES` in `src/data/courses-data.ts`
- "Not sure yet" skip option

### Step 3 — Goals (`StepGoals.tsx`)
- Radio card group, single-select
- 4 options: Get a job, Upskill, Personal project, Academic

### Step 4 — Level & Time (`StepLevelTime.tsx`)
- Two sections on same step:
  - Experience: Beginner / Intermediate / Advanced (chip buttons)
  - Time: Casual / Moderate / Intensive (chip buttons)

### Recommended Courses (`RecommendedCourses.tsx`)
- Shows on `/dashboard` homepage below stats
- Grid of `CourseCard` components
- Filtered by matching `course.category` ∩ `user.interests`, then sorted by `course.level` proximity to `user.experienceLevel`
- Uses existing `useGetCoursesQuery`

## API Integration

### New RTK Query API: `preferencesApi`

| Endpoint | Method | Purpose |
|---|---|---|
| `/preferences` | POST | Save onboarding preferences |
| `/preferences` | GET | Fetch saved preferences |
| `/preferences` | PUT | Update preferences |
| `/courses/recommended` | GET | Get recommended courses (query params: interests, level, goal) |

### Integration in Dashboard

- `DashboardLayout` (via `OnboardingGuard` component) calls `useGetPreferencesQuery()`
- If error (404/no data) → `<Navigate to="/onboarding" />`
- If data exists → render children + `<RecommendedCourses />`

## State Management

- **Wizard form state:** Local `useReducer`, persisted to `sessionStorage` for crash recovery
- **Saved preferences:** RTK Query cache (`preferencesApi`)
- **No new Redux slices needed**

## Course Matching Logic (Client-Side Fallback)

```typescript
function getRecommendedCourses(courses: Course[], prefs: UserPreferences): Course[] {
  return courses
    .filter(c => {
      const matchesInterest = prefs.interests.length === 0 ||
        prefs.interests.some(i => c.category.toLowerCase().includes(i) || c.tags?.some(t => t.includes(i)))
      const matchesLevel = !prefs.experienceLevel || c.level === prefs.experienceLevel
      return matchesInterest && matchesLevel
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)
}
```

## Scope Summary

| Item | Status |
|---|---|
| `/onboarding` route in router | Build |
| `OnboardingPage` wizard container | Build |
| `OnboardingStepper` component | Build |
| `StepRole` component | Build |
| `StepInterests` component | Build |
| `StepGoals` component | Build |
| `StepLevelTime` component | Build |
| `preferencesApi` RTK Query | Build |
| `RecommendedCourses` on dashboard | Build |
| Dashboard redirect via OnboardingGuard | Build |
| Course matching logic | Build |
| Types and data contracts | Build |
