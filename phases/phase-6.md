# Phase 6: Admin & Management Features

## Overview
Build comprehensive admin and instructor management features for content creation, user management, and platform oversight. This phase enables instructors to create and manage courses, and administrators to manage the entire platform.

## Goals
- Implement complete course creation and management
- Build instructor dashboard and tools
- Create admin panel for platform management
- Enable user management and moderation
- Add content approval workflows
- Implement system analytics and reporting

## API Endpoints to Implement

### 1. Course Management (Instructor/Admin)
- `POST /courses` - Create course
- `PUT /courses/:slug` - Update course
- `DELETE /courses/:slug` - Delete course
- `GET /courses/instructor/:instructorId` - Get instructor's courses

### 2. Section Management (Instructor/Admin)
- `POST /sections` - Create section
- `PUT /sections/:id` - Update section
- `DELETE /sections/:id` - Delete section
- `POST /sections/:id/reorder` - Reorder sections

### 3. Lecture Management (Instructor/Admin)
- `POST /lectures` - Create lecture
- `PUT /lectures/:id` - Update lecture
- `DELETE /lectures/:id` - Delete lecture

### 4. User Management (Admin)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/email/:email` - Get user by email
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `PUT /users/:id/password` - Update user password

### 5. Role Management (Admin)
- `GET /roles` - Get all roles
- `POST /roles` - Create role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### 6. User Role Assignment (Admin)
- `GET /user-roles/user/:userId` - Get user roles
- `POST /user-roles` - Assign role to user
- `PUT /user-roles/:id` - Update user role
- `DELETE /user-roles/user/:userId` - Remove all user roles

### 7. Review Moderation (Admin)
- `GET /reviews` - Get all reviews
- `DELETE /reviews/:id` - Delete any review

### 8. Order Management (Admin)
- `GET /orders` - Get all orders
- `PUT /orders/:id` - Update order status

## Components to Build/Enhance

### 1. Instructor Dashboard Components
- **InstructorDashboard** (`src/pages/dashboard/InstructorDashboard.tsx`)
  - Overview of instructor's courses
  - Total students and revenue
  - Recent enrollments
  - Course performance metrics
  - Quick actions

- **CourseManagement** (`src/features/admin/CourseManagement.tsx`)
  - List of instructor's courses
  - Create new course
  - Edit existing courses
  - Course status (draft, published, archived)
  - Quick stats per course

- **CourseBuilder** (`src/features/admin/CourseBuilder.tsx`)
  - Multi-step course creation wizard
  - Basic information (title, description, category, price)
  - Course thumbnail upload
  - Curriculum builder (sections and lectures)
  - Preview and publish

### 2. Course Creation Components
- **CourseWizard** (`src/features/admin/CourseWizard.tsx`)
  - Step 1: Basic Info
  - Step 2: Curriculum
  - Step 3: Pricing & Publishing
  - Step 4: Review & Publish

- **CurriculumBuilder** (`src/features/admin/CurriculumBuilder.tsx`)
  - Drag-and-drop section/lecture ordering
  - Add/edit/delete sections
  - Add/edit/delete lectures
  - Preview mode
  - Bulk operations

- **LectureEditor** (`src/features/admin/LectureEditor.tsx`)
  - Rich text editor for content
  - Video upload/URL input
  - Duration setting
  - Preview option
  - Resource attachments
  - Mark as preview lecture

### 3. Admin Dashboard Components
- **AdminDashboard** (`src/pages/dashboard/AdminDashboard.tsx`)
  - Platform overview
  - Total users, courses, revenue
  - Recent activity
  - System health
  - Quick actions

- **UserManagement** (`src/features/admin/UserManagement.tsx`)
  - List all users with pagination
  - Search and filter users
  - View user details
  - Edit user information
  - Assign/remove roles
  - Impersonate user (optional)
  - Deactivate/delete user

- **RoleManagement** (`src/features/admin/RoleManagement.tsx`)
  - List all roles
  - Create/edit/delete roles
  - Assign permissions to roles
  - View role assignments
  - System roles protection

- **PlatformAnalytics** (`src/features/admin/PlatformAnalytics.tsx`)
  - Total platform metrics
  - Revenue charts
  - User growth
  - Course statistics
  - Enrollment trends
  - Popular categories

- **ContentModeration** (`src/features/admin/ContentModeration.tsx`)
  - Pending course approvals
  - Reported reviews
  - Flagged content
  - Moderation queue
  - Bulk actions

### 4. Content Management Components
- **CourseApproval** (`src/features/admin/CourseApproval.tsx`)
  - Pending courses list
  - Course preview
  - Approve/reject actions
  - Feedback to instructor

- **ReviewModeration** (`src/features/admin/ReviewModeration.tsx`)
  - Reported reviews
  - Review content display
  - Approve/delete actions
  - Contact user option

### 5. Order Management Components (Admin)
- **OrderManagement** (`src/features/admin/OrderManagement.tsx`)
  - All orders list
  - Order details
  - Update order status
  - Refund processing
  - Order search and filters

## State Management (Redux)

### Create adminSlice (`src/features/admin/adminSlice.ts`)
```typescript
interface AdminState {
  courses: AdminCourse[];
  users: AdminUser[];
  roles: Role[];
  orders: AdminOrder[];
  pendingApprovals: PendingApproval[];
  platformMetrics: PlatformMetrics | null;
  isLoading: boolean;
  error: string | null;
}

interface AdminCourse {
  id: number;
  title: string;
  slug: string;
  instructor: User;
  status: 'draft' | 'published' | 'archived' | 'pending';
  isPublished: boolean;
  price: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  isInstructor: boolean;
  roles: Role[];
  coursesCount: number;
  enrollmentsCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

interface PlatformMetrics {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  monthlyGrowth: MonthlyGrowth[];
  topCategories: CategoryStat[];
  topInstructors: InstructorStat[];
}

interface PendingApproval {
  id: number;
  type: 'course' | 'review' | 'refund';
  item: any;
  submittedAt: string;
  submittedBy: User;
}
```

### Extend existing slices
- `courseSlice.ts` - Add admin course management
- `userSlice.ts` - Add admin user management

## Type Definitions

### Create/Update Types (`src/types/`)
- `admin.ts` - Admin-specific types
- `moderation.ts` - Content moderation types

Example types:
```typescript
// admin.ts
export interface AdminCourse extends Course {
  instructor: User;
  status: 'draft' | 'published' | 'archived' | 'pending';
  totalStudents: number;
  totalRevenue: number;
}

export interface AdminUser extends User {
  roles: Role[];
  coursesCount: number;
  enrollmentsCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface PlatformMetrics {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  monthlyGrowth: MonthlyGrowth[];
  topCategories: CategoryStat[];
  topInstructors: InstructorStat[];
}

// moderation.ts
export interface PendingApproval {
  id: string;
  type: 'course' | 'review' | 'refund' | 'content';
  item: any;
  submittedAt: string;
  submittedBy: User;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ModerationAction {
  id: string;
  type: string;
  targetId: number;
  action: 'approve' | 'reject' | 'delete' | 'suspend';
  reason?: string;
  performedBy: User;
  performedAt: string;
}
```

## API Integration

### Create API Services
- `src/features/admin/adminApi.ts`
  ```typescript
  export const adminApi = {
    // Course management
    createCourse: (data: CourseData) => ...
    updateCourse: (slug: string, data: CourseData) => ...
    deleteCourse: (slug: string) => ...
    publishCourse: (slug: string) => ...

    // User management
    getAllUsers: (params?: UserFilters) => ...
    updateUser: (id: number, data: UserData) => ...
    deleteUser: (id: number) => ...
    assignRole: (userId: number, roleId: number) => ...

    // Role management
    createRole: (data: RoleData) => ...
    updateRole: (id: number, data: RoleData) => ...
    deleteRole: (id: number) => ...

    // Order management
    getAllOrders: (params?: OrderFilters) => ...
    updateOrderStatus: (id: number, status: OrderStatus) => ...
    processRefund: (id: number, reason: string) => ...

    // Moderation
    getPendingApprovals: () => ...
    approveCourse: (courseId: number) => ...
    rejectCourse: (courseId: number, reason: string) => ...
    deleteReview: (reviewId: number) => ...

    // Analytics
    getPlatformMetrics: (period?: string) => ...
    getRevenueReport: (startDate: string, endDate: string) => ...
  };
  ```

- `src/features/admin/courseBuilderApi.ts`
  ```typescript
  export const courseBuilderApi = {
    createSection: (courseId: number, data: SectionData) => ...
    updateSection: (id: number, data: SectionData) => ...
    deleteSection: (id: number) => ...
    reorderSections: (courseId: number, sectionIds: number[]) => ...

    createLecture: (sectionId: number, data: LectureData) => ...
    updateLecture: (id: number, data: LectureData) => ...
    deleteLecture: (id: number) => ...
    reorderLectures: (sectionId: number, lectureIds: number[]) => ...
  };
  ```

## Pages to Create

1. **Instructor Dashboard** (`src/pages/dashboard/InstructorDashboard.tsx`)
   - Route: `/instructor/dashboard`
   - Instructor-specific overview

2. **Course Management** (`src/pages/dashboard/InstructorCourses.tsx`)
   - Route: `/instructor/courses`
   - List and manage courses

3. **Course Builder** (`src/pages/dashboard/CourseBuilder.tsx`)
   - Route: `/instructor/courses/create`
   - Course creation wizard

4. **Course Editor** (`src/pages/dashboard/EditCourse.tsx`)
   - Route: `/instructor/courses/:slug/edit`
   - Edit existing course

5. **Admin Dashboard** (`src/pages/dashboard/AdminDashboard.tsx` - enhance existing)
   - Route: `/admin/dashboard`
   - Admin overview

6. **Admin Users** (`src/pages/dashboard/AdminUsers.tsx`)
   - Route: `/admin/users`
   - User management

7. **Admin Roles** (`src/pages/dashboard/AdminRoles.tsx`)
   - Route: `/admin/roles`
   - Role management

8. **Admin Orders** (`src/pages/dashboard/AdminOrders.tsx`)
   - Route: `/admin/orders`
   - Order management

9. **Admin Moderation** (`src/pages/dashboard/AdminModeration.tsx`)
   - Route: `/admin/moderation`
   - Content approval queue

10. **Admin Analytics** (`src/pages/dashboard/AdminAnalytics.tsx`)
    - Route: `/admin/analytics`
    - Platform analytics

## Routing Updates

Add to `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  // Instructor routes
  {
    path: '/instructor/dashboard',
    element: <ProtectedRoute requiredRoles={['INSTRUCTOR', 'ADMIN']}><InstructorDashboardPage /></ProtectedRoute>,
  },
  {
    path: '/instructor/courses',
    element: <ProtectedRoute requiredRoles={['INSTRUCTOR', 'ADMIN']}><InstructorCoursesPage /></ProtectedRoute>,
  },
  {
    path: '/instructor/courses/create',
    element: <ProtectedRoute requiredRoles={['INSTRUCTOR', 'ADMIN']}><CourseBuilderPage /></ProtectedRoute>,
  },
  {
    path: '/instructor/courses/:slug/edit',
    element: <ProtectedRoute requiredRoles={['INSTRUCTOR', 'ADMIN']}><EditCoursePage /></ProtectedRoute>,
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminDashboardPage /></ProtectedRoute>,
  },
  {
    path: '/admin/users',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminUsersPage /></ProtectedRoute>,
  },
  {
    path: '/admin/roles',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminRolesPage /></ProtectedRoute>,
  },
  {
    path: '/admin/orders',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminOrdersPage /></ProtectedRoute>,
  },
  {
    path: '/admin/moderation',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminModerationPage /></ProtectedRoute>,
  },
  {
    path: '/admin/analytics',
    element: <ProtectedRoute requiredRoles={['ADMIN']}><AdminAnalyticsPage /></ProtectedRoute>,
  },
  // ... existing routes
];
```

## Role-Based Access Control

### Role Hierarchy
- **STUDENT**: Can browse, purchase, and take courses
- **INSTRUCTOR**: All student permissions + create/manage own courses
- **ADMIN**: All permissions + full platform control

### Permission System
Define permissions for each role:
```typescript
const permissions = {
  STUDENT: [
    'course:read',
    'course:enroll',
    'review:create',
    'review:read:own',
    'review:update:own',
    'review:delete:own',
    'enrollment:read:own',
    'progress:read:own',
    'wishlist:read:write',
  ],
  INSTRUCTOR: [
    ...STUDENT,
    'course:create',
    'course:update:own',
    'course:delete:own',
    'section:create:own',
    'section:update:own',
    'section:delete:own',
    'lecture:create:own',
    'lecture:update:own',
    'lecture:delete:own',
    'analytics:read:own',
  ],
  ADMIN: [
    ...INSTRUCTOR,
    'user:read:all',
    'user:update:all',
    'user:delete:all',
    'role:read:all',
    'role:create',
    'role:update',
    'role:delete',
    'course:update:all',
    'course:delete:all',
    'review:read:all',
    'review:delete:all',
    'order:read:all',
    'order:update:all',
    'analytics:read:all',
    'moderation:all',
  ],
};
```

## Course Creation Workflow

### Step 1: Basic Information
- Course title and description
- Category selection
- Thumbnail upload
- Course level (beginner, intermediate, advanced)
- Tags/keywords
- Prerequisites
- Learning outcomes

### Step 2: Curriculum
- Add sections
- Add lectures to sections
- Upload video content or add text content
- Add resources (PDFs, code files, etc.)
- Set lecture durations
- Mark preview lectures

### Step 3: Pricing & Publishing
- Set price (or free)
- Discount options
- Schedule publish date
- Visibility settings
- SEO settings

### Step 4: Review & Publish
- Preview course
- Check completeness
- Publish or save as draft
- Set instructor notes

## Testing Checklist

- [ ] Instructor can create course
- [ ] Course creation wizard works smoothly
- [ ] Curriculum builder functions correctly
- [ ] Lecture creation and editing works
- [ ] Video upload works (if implemented)
- [ ] Course can be published
- [ ] Admin can view all courses
- [ ] Admin can approve/reject courses
- [ ] Admin can manage users
- [ ] Admin can assign roles
- [ ] Admin can view platform analytics
- [ ] Role-based access control works
- [ ] Permissions are enforced correctly
- [ ] Order management works for admin
- [ ] Review moderation functions
- [ ] Responsive design on all devices
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Deliverables

### Files to Create
```
src/pages/dashboard/
├── InstructorDashboard.tsx
├── InstructorCourses.tsx
├── CourseBuilder.tsx
├── EditCourse.tsx
├── AdminDashboard.tsx (enhance)
├── AdminUsers.tsx
├── AdminRoles.tsx
├── AdminOrders.tsx
├── AdminModeration.tsx
├── AdminAnalytics.tsx

src/features/admin/
├── InstructorDashboard.tsx
├── CourseManagement.tsx
├── CourseBuilder.tsx
├── CurriculumBuilder.tsx
├── LectureEditor.tsx
├── UserManagement.tsx
├── RoleManagement.tsx
├── PlatformAnalytics.tsx
├── ContentModeration.tsx
├── OrderManagement.tsx
├── adminApi.ts
├── courseBuilderApi.ts
├── adminSlice.ts
└── moderationUtils.ts

src/types/
├── admin.ts
└── moderation.ts
```

### Files to Modify
- `src/router/app-router.tsx` - Add admin/instructor routes
- `src/store/store.ts` - Add admin slice
- `src/App.tsx` - Ensure proper routing

## Success Criteria

1. Instructors can create and publish courses
2. Course creation workflow is intuitive
3. Curriculum builder is easy to use
4. Admin can manage all platform content
5. User management is comprehensive
6. Role-based permissions work correctly
7. Content moderation is effective
8. Platform analytics provide insights
9. All admin features are secure
10. Instructor experience is smooth

## Notes

- Implement proper file upload for course thumbnails and videos
- Use rich text editor for lecture content (TipTap, Quill, or similar)
- Implement drag-and-drop for curriculum builder
- Add autosave functionality for course builder
- Implement course preview before publishing
- Add course validation before publish
- Consider implementing course templates
- Add bulk operations for admin
- Implement proper logging for admin actions
- Add audit trail for sensitive operations
- Consider implementing multi-step approval workflows
- Add email notifications for course approvals
- Implement proper caching for admin data
- Add export functionality for reports

## Next Phase Preparation

After admin features are complete, Phase 7 will implement the notification system and enhance progress tracking with real-time updates.