# Phase 1: Core Authentication & User Management

## Overview
Complete the user authentication system and basic user management features. This phase focuses on making the authentication flow production-ready and adding user profile management capabilities.

## Current State
- ✅ Basic authentication setup with JSON API
- ✅ Login and Signup pages exist
- ✅ Dashboard layout is ready

## Goals
- Complete authentication flow with proper error handling
- Implement user profile management
- Add role-based access control
- Enable password management
- Prepare for admin features

## API Endpoints to Implement

### 1. Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user profile
- `POST /auth/refresh-token` - Refresh JWT token

### 2. User Management Endpoints
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `PUT /users/:id/password` - Update password
- `GET /users/email/:email` - Get user by email

### 3. Role Management Endpoints (Admin)
- `GET /roles` - Get all roles
- `GET /roles/:id` - Get role by ID
- `GET /roles/name/:name` - Get role by name
- `POST /roles` - Create role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### 4. User Role Assignment (Admin)
- `GET /user-roles/user/:userId` - Get user roles
- `POST /user-roles` - Assign role to user
- `PUT /user-roles/:id` - Update user role
- `DELETE /user-roles/user/:userId` - Remove all user roles

## Components to Build/Enhance

### 1. Authentication Components
- **Enhanced Login Form** (`src/features/auth/LoginForm.tsx`)
  - Form validation with proper error messages
  - Remember me functionality
  - Forgot password link
  - Social login placeholders
  - Loading states and error handling

- **Enhanced Registration Form** (`src/features/auth/RegistrationForm.tsx`)
  - Complete form with all fields (email, password, fullName, isInstructor)
  - Terms and conditions acceptance
  - Email verification status
  - Instructor application flow
  - Password strength indicator

- **Auth Guard Components**
  - `ProtectedRoute.tsx` - Already exists, enhance with role-based protection
  - `GuestRoute.tsx` - Already exists, enhance
  - Add role-based route protection (e.g., admin-only routes)

### 2. User Profile Components
- **Profile Page** (`src/pages/Profile.tsx`)
  - Display user information
  - Edit profile form
  - Avatar upload (placeholder for future)
  - Account settings

- **Password Change** (`src/features/auth/PasswordChange.tsx`)
  - Current password verification
  - New password with confirmation
  - Password strength validation
  - Success/error feedback

- **User Settings** (`src/pages/Settings.tsx` or enhance existing)
  - Notification preferences
  - Privacy settings
  - Account deletion option

### 3. Admin Components (if user is admin)
- **Role Management** (`src/features/admin/RoleManagement.tsx`)
  - List all roles
  - Create/edit/delete roles
  - Assign roles to users
  - View role permissions

- **User Management** (`src/features/admin/UserManagement.tsx`)
  - List all users with pagination
  - Search and filter users
  - View user details
  - Edit user information
  - Assign/remove roles

## State Management (Redux)

### Extend Existing Slices
- **authSlice.ts** - Already exists, enhance with:
  - User profile data
  - Token refresh logic
  - Logout cleanup
  - Auth error handling

- **Create userSlice.ts** (`src/features/auth/userSlice.ts`)
  ```typescript
  interface UserState {
    profile: User | null;
    roles: Role[];
    permissions: string[];
    loading: boolean;
    error: string | null;
  }
  ```

## Type Definitions

### Create/Update Types (`src/types/`)
- `user.ts` - User interface and related types
- `role.ts` - Role interface and related types
- `auth.ts` - Authentication types (login, register, tokens)

Example types:
```typescript
// user.ts
export interface User {
  id: number;
  email: string;
  fullName: string;
  isInstructor: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// role.ts
export interface Role {
  id: number;
  name: string; // 'ADMIN', 'INSTRUCTOR', 'STUDENT'
  description: string;
  permissions: string[];
}
```

## API Integration

### Create/Update API Services
- `src/features/auth/authApi.ts` - Already exists, enhance with:
  - All auth endpoints
  - User profile endpoints
  - Token management utilities

- `src/features/admin/adminApi.ts` (new)
  - Role management endpoints
  - User management endpoints

## Pages to Create

1. **Profile Page** (`src/pages/Profile.tsx`)
   - Route: `/profile`
   - Shows user information and settings

2. **Settings Page** (`src/pages/Settings.tsx`)
   - Route: `/settings`
   - Account and preference settings

3. **Admin Dashboard** (if admin) (`src/pages/admin/AdminDashboard.tsx`)
   - Route: `/admin`
   - Overview of system metrics
   - Quick links to admin features

## Routing Updates

Update `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  {
    path: '/profile',
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><SettingsPage /></ProtectedRoute>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>,
  },
  // ... existing routes
];
```

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials shows error
- [ ] Registration creates new user
- [ ] Logout clears tokens and redirects
- [ ] Profile page loads user data
- [ ] Profile update works
- [ ] Password change works
- [ ] Role-based access control works
- [ ] Token refresh on expiry
- [ ] Protected routes redirect to login when not authenticated

## Deliverables

### Files to Create
```
src/features/auth/
├── PasswordChange.tsx
├── ProfileForm.tsx
└── SettingsForm.tsx

src/features/admin/
├── RoleManagement.tsx
├── UserManagement.tsx
└── adminApi.ts

src/pages/
├── Profile.tsx
├── Settings.tsx
└── admin/
    └── AdminDashboard.tsx

src/types/
├── user.ts
├── role.ts
└── auth.ts

src/store/
└── userSlice.ts
```

### Files to Modify
- `src/features/auth/authApi.ts` - Add all auth and user endpoints
- `src/features/auth/authSlice.ts` - Enhance with user data
- `src/router/app-router.tsx` - Add new routes
- `src/App.tsx` - Ensure proper routing structure

## Success Criteria

1. Users can successfully register, login, and logout
2. User profile is displayed and editable
3. Password can be changed securely
4. Role-based access control is functional
5. Admin users can manage roles and users
6. All API calls have proper error handling
7. Loading states are shown during API calls
8. JWT tokens are properly stored and refreshed

## Notes

- Use existing API utility functions from `src/lib/api-utils.ts`
- Follow the existing component patterns in your codebase
- Maintain consistent styling with existing components
- Implement proper TypeScript types for all data structures
- Add proper form validation using your preferred library (React Hook Form recommended)
- Ensure all protected endpoints handle 401/403 errors appropriately

## Next Phase Preparation

After completing this phase, you'll have a solid authentication foundation. The next phase will build the course catalog and browsing experience using the courses and categories APIs.