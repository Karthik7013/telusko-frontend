# Supabase LMS Backend Design

**Date:** 2026-09-03
**Project:** `demo` (Karthik7013's Org)
**Stack:** Supabase Auth + PostgREST + RLS + Edge Functions + React

---

## 1. Overview

Replace the existing NestJS LMS backend (`lms_api`) with Supabase-native services. The frontend (`telusko-frontend`) integrates directly with Supabase via `@supabase/supabase-js`.

**Why Supabase:** Built-in Auth, PostgREST auto-generates REST API, RLS enforces row-level security at the database layer, Storage for assets, Edge Functions for custom logic — all in one managed platform.

---

## 2. Auth Architecture

### Providers
- **Email/Password** — enabled by default
- **Google** — configured in Supabase dashboard
- **GitHub** — configured in Supabase dashboard

### Token Flow
1. User signs up/login → Supabase returns access token + refresh token
2. Frontend stores access token in Redux state
3. `@supabase/supabase-js` handles token refresh automatically
4. Each API call includes `Authorization: Bearer <token>` via Supabase client

### Roles
| Role | Description |
|------|-------------|
| `student` | Default role on signup |
| `instructor` | Requires admin approval |
| `admin` | System administrator |

Roles stored in `identity.user_roles` with status `active`/`pending`/`rejected`.

---

## 3. Database Schema

### `identity` Schema

**`profiles`** — extends `auth.users`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid → auth.users | Primary key |
| `display_name` | text | User's display name |
| `avatar_url` | text | Profile picture URL |
| `created_at` | timestamptz | Account creation time |

**`roles`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `name` | text | `student`, `instructor`, `admin` |

**`user_roles`**
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid → profiles | Foreign key |
| `role_id` | uuid → roles | Foreign key |
| `status` | text | `active`, `pending`, `rejected` |
| `created_at` | timestamptz | |

### `catalog` Schema

**`categories`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `name` | text | Category name |
| `slug` | text | Unique slug |

**`courses`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `instructor_id` | uuid → profiles | |
| `category_id` | uuid → categories | |
| `title` | text | |
| `slug` | text | Auto-generated from title, unique |
| `description` | text | |
| `price` | numeric | Course price |
| `status` | text | `draft`, `pending_review`, `published`, `rejected`, `archived` |
| `created_at` | timestamptz | |

**`sections`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `course_id` | uuid → courses | |
| `title` | text | |
| `order_index` | integer | |

**`lectures`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `section_id` | uuid → sections | |
| `title` | text | |
| `content_type` | text | `video`, `article`, `quiz`, `pdf` |
| `content_url` | text | |
| `duration_seconds` | integer | |
| `is_preview` | boolean | Default false |

### `sales` Schema

**`enrollments`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid → profiles | |
| `course_id` | uuid → courses | |
| `status` | text | `enrolled`, `in_progress`, `completed` |
| `enrolled_at` | timestamptz | |

**`transactions`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid → profiles | |
| `course_id` | uuid → courses | |
| `amount` | numeric | |
| `payment_status` | text | `pending`, `completed`, `failed` |
| `gateway_txn_id` | text | |
| `created_at` | timestamptz | |

**`course_approvals`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `course_id` | uuid → courses | Unique |
| `approved_by` | uuid → profiles | |
| `is_active` | boolean | Visibility gate |
| `version_meta` | jsonb | Snapshot on approval |
| `created_at` | timestamptz | |

---

## 4. RLS Policies

### Session Variables
- `app.user_id` → `auth.uid()`
- `app.current_role` → from `user_roles` lookup

### Policy Matrix

| Table | Role | SELECT | INSERT | UPDATE | DELETE |
|-------|------|--------|--------|--------|--------|
| `profiles` | Own/Admin | Own id or admin | ❌ | Own only | ❌ |
| `user_roles` | Own/Admin | Own or admin | Own (pending) | Own | ❌ |
| `categories` | All | ✅ Public | ❌ | ❌ | ❌ |
| `courses` | Guest/Student | Published + active, or enrolled | ❌ | ❌ | ❌ |
| `courses` | Instructor | Own | Own | Own (draft/pending_review/rejected) | Own (draft) |
| `courses` | Admin | All | ❌ | ❌ | ❌ |
| `sections/lectures` | All | Parent visible OR enrolled | Instructor own | Instructor own | Instructor own (draft) |
| `enrollments` | Student | Own | Self-enroll | Update progress | ❌ |
| `transactions` | Student/Admin | Own or admin | Via enrollment | Via payment | ❌ |
| `course_approvals` | Admin | All | ✅ Upsert | ✅ | ✅ |

---

## 5. API Layer

### PostgREST
Auto-generated REST API from PostgreSQL schema. All CRUD endpoints served at `/rest/v1/{schema}/{table}`.

### Edge Functions
| Function | Purpose |
|----------|---------|
| `approve-course` | Admin approves course, UPSERT `course_approvals`, set `is_active=true` |
| `apply-instructor` | Student requests instructor role |
| `enroll-student` | Atomic enrollment + mock payment transaction |
| `webhook-handler` | Future payment gateway integration |

### Supabase Storage
Bucket: `lms-assets` for course thumbnails and lecture materials (created via SQL).

---

## 6. Frontend Integration (`telusko-frontend`)

### Changes Required
1. Install `@supabase/supabase-js`
2. Replace RTK Query `fetchBaseQuery` with Supabase client
3. Replace `/auth/*` endpoints with Supabase Auth SDK methods
4. Update `BASE_URL` to Supabase project URL
5. Adapt Redux store for Supabase session state

### Supabase Client Setup
```ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

---

## 7. MVP Scope — Completed Tasks

1. ✅ Database schema + RLS policies + seed data (10 tables, 30 policies, 2 schemas seeded)
2. ✅ Supabase Auth configured (email/password enabled by default)
3. ✅ PostgREST endpoints auto-generated from schema
4. ✅ Edge Functions: approve-course, apply-instructor, enroll-student
5. ✅ Storage bucket: `lms-assets`
6. ✅ Frontend integration: `@supabase/supabase-js`, updated `authApi.ts`, `AuthProvider.tsx`, `.env`
7. ✅ SQL migration file updated

### Auth Provider Configuration (manual)
Configure Google and GitHub OAuth providers via the Supabase Dashboard:
- **Supabase Dashboard** → Auth → Providers → Enable Google/GitHub
- Set up OAuth credentials in respective developer consoles
- Add callback URLs: `https://gdfqaugmsbmccqsgfxak.supabase.co/auth/v1/callback`

### Next Steps
1. Enable email confirmation if required
2. Deploy Edge Functions to Supabase
3. Configure OAuth provider credentials
4. Test auth flows and RLS policies
5. Update remaining RTK Query API slices to use Supabase client
