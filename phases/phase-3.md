# Phase 3: Course Content & Learning Experience

## Overview
Build the core learning experience with course content delivery, including sections, lectures, video playback, and progress tracking. This phase transforms the platform from a course catalog into an actual learning environment.

## Goals
- Implement course player interface
- Create section and lecture navigation
- Integrate video player with progress tracking
- Build comprehensive progress tracking system
- Enable course enrollment and access management

## API Endpoints to Implement

### 1. Sections Endpoints
- `GET /sections` - Get all sections
- `GET /sections/:id` - Get section by ID
- `GET /sections/course/:courseId` - Get sections by course
- `POST /sections` - Create section (admin)
- `PUT /sections/:id` - Update section (admin)
- `DELETE /sections/:id` - Delete section (admin)
- `POST /sections/:id/reorder` - Reorder sections (admin)

### 2. Lectures Endpoints
- `GET /lectures` - Get all lectures
- `GET /lectures/:id` - Get lecture by ID
- `GET /lectures/section/:sectionId` - Get lectures by section
- `GET /lectures/course/:courseId/preview` - Get preview lectures
- `POST /lectures` - Create lecture (admin)
- `PUT /lectures/:id` - Update lecture (admin)
- `DELETE /lectures/:id` - Delete lecture (admin)

### 3. Progress Endpoints
- `GET /progress` - Get all progress
- `GET /progress/:id` - Get progress by ID
- `GET /progress/user/:userId` - Get user progress
- `GET /progress/lecture/:lectureId` - Get progress by lecture
- `POST /progress` - Create progress
- `PUT /progress/:id` - Update progress
- `DELETE /progress/:id` - Delete progress
- `POST /progress/complete` - Mark lecture as completed

### 4. Enrollments Endpoints
- `GET /enrollments` - Get all enrollments
- `GET /enrollments/:id` - Get enrollment by ID
- `GET /enrollments/user/:userId` - Get enrollments by user
- `GET /enrollments/course/:courseId` - Get enrollments by course
- `POST /enrollments` - Create enrollment
- `PUT /enrollments/:id` - Update enrollment
- `DELETE /enrollments/:id` - Delete enrollment

## Components to Build/Enhance

### 1. Course Player Components
- **CoursePlayerPage** (`src/pages/CoursePlayer.tsx` - enhance existing)
  - Main course player interface
  - Section navigation sidebar
  - Lecture player area
  - Progress tracking
  - Course completion status

- **SectionNavigation** (`src/features/courses/SectionNavigation.tsx`)
  - Collapsible section list
  - Section completion indicators
  - Current section highlighting
  - Expand/collapse all functionality

- **LecturePlayer** (`src/features/courses/LecturePlayer.tsx`)
  - Video player integration
  - Lecture content display
  - Download resources (if available)
  - Next/previous lecture navigation
  - Lecture completion button

### 2. Progress Tracking Components
- **ProgressTracker** (`src/features/courses/ProgressTracker.tsx`)
  - Overall course progress
  - Section-wise progress
  - Lecture completion status
  - Time spent tracking
  - Completion percentage

- **ProgressDashboard** (`src/features/courses/ProgressDashboard.tsx`)
  - User's learning progress overview
  - Course completion rates
  - Time spent per course
  - Learning streaks
  - Upcoming lectures

### 3. Enrollment Management Components
- **EnrollmentManager** (`src/features/courses/EnrollmentManager.tsx`)
  - Check enrollment status
  - Enroll in course
  - Access control for enrolled vs non-enrolled
  - Enrollment expiration handling

- **CourseAccessControl** (`src/features/courses/CourseAccessControl.tsx`)
  - Check if user has access to course
  - Handle preview vs full access
  - Redirect to enrollment if needed
  - Show locked content appropriately

### 4. Video Player Components
- **EnhancedMediaPlayer** (`src/components/common/MediaPlayer.tsx` - enhance)
  - Video playback controls
  - Speed control (0.5x - 2x)
  - Quality selection
  - Fullscreen mode
  - Picture-in-picture support
  - Keyboard shortcuts
  - Progress bar with click-to-seek

- **VideoProgressOverlay** (`src/features/courses/VideoProgressOverlay.tsx`)
  - Show lecture progress
  - Completion percentage
  - Time remaining
  - Speed indicator

## State Management (Redux)

### Create courseContentSlice (`src/features/courses/courseContentSlice.ts`)
```typescript
interface CourseContentState {
  currentCourse: Course | null;
  currentSection: Section | null;
  currentLecture: Lecture | null;
  sections: Section[];
  lectures: Lecture[];
  progress: Progress[];
  enrollments: Enrollment[];
  isEnrolled: boolean;
  isLoading: boolean;
  error: string | null;
}

interface Section {
  id: number;
  title: string;
  courseId: number;
  order: number;
  lectures: Lecture[];
  isCompleted: boolean;
  completionPercentage: number;
}

interface Lecture {
  id: number;
  title: string;
  sectionId: number;
  content: string;
  duration: number;
  isPreview: boolean;
  isCompleted: boolean;
  completedAt?: string;
  resources?: Resource[];
}

interface Progress {
  id: number;
  userId: number;
  lectureId: number;
  completed: boolean;
  completedAt?: string;
  timeSpent: number;
}

interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'expired';
  accessUntil?: string;
}
```

## Type Definitions

### Create/Update Types (`src/types/`)
- `section.ts` - Section interface and related types
- `lecture.ts` - Lecture interface and related types
- `progress.ts` - Progress interface and related types
- `enrollment.ts` - Enrollment interface and related types

Example types:
```typescript
// section.ts
export interface Section {
  id: number;
  title: string;
  courseId: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// lecture.ts
export interface Lecture {
  id: number;
  title: string;
  sectionId: number;
  content: string;
  duration: number; // in minutes
  isPreview: boolean;
  resources?: Resource[];
  createdAt: string;
  updatedAt: string;
}

// progress.ts
export interface Progress {
  id: number;
  userId: number;
  lectureId: number;
  completed: boolean;
  completedAt?: string;
  timeSpent: number; // in seconds
}

// enrollment.ts
export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'expired';
  accessUntil?: string;
}

// resource.ts
export interface Resource {
  id: number;
  lectureId: number;
  title: string;
  url: string;
  type: 'pdf' | 'document' | 'image' | 'code' | 'other';
  size?: number; // in bytes
}
```

## API Integration

### Create/Update API Services
- `src/features/courses/courseContentApi.ts` (new)
  ```typescript
  export const courseContentApi = {
    getSectionsByCourse: (courseId: number) => ...
    getLecturesBySection: (sectionId: number) => ...
    getProgressByUser: (userId: number) => ...
    getProgressByLecture: (lectureId: number) => ...
    createProgress: (data: ProgressData) => ...
    updateProgress: (id: number, data: ProgressData) => ...
    markLectureAsCompleted: (userId: number, lectureId: number) => ...
    getEnrollmentsByUser: (userId: number) => ...
    getEnrollmentsByCourse: (courseId: number) => ...
    enrollInCourse: (courseId: number) => ...
  };
  ```

- `src/features/courses/sectionsApi.ts` (new)
- `src/features/courses/lecturesApi.ts` (new)
- `src/features/courses/progressApi.ts` (new)
- `src/features/courses/enrollmentsApi.ts` (new)

## Pages to Create/Enhance

1. **Course Player Page** (`src/pages/CoursePlayer.tsx` - enhance existing)
   - Route: `/course/:slug/player`
   - Main learning interface

2. **Progress Dashboard** (`src/pages/ProgressDashboard.tsx`)
   - Route: `/progress`
   - User's learning progress overview

3. **My Enrollments** (`src/pages/MyEnrollments.tsx`)
   - Route: `/enrollments`
   - List of enrolled courses
   - Access to course players

## Routing Updates

Add to `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  {
    path: '/course/:slug/player',
    element: <ProtectedRoute><CoursePlayerPage /></ProtectedRoute>,
  },
  {
    path: '/progress',
    element: <ProtectedRoute><ProgressDashboardPage /></ProtectedRoute>,
  },
  {
    path: '/enrollments',
    element: <ProtectedRoute><MyEnrollmentsPage /></ProtectedRoute>,
  },
  // ... existing routes
];
```

## Video Player Integration

### Video Player Features
- **HTML5 Video Player** with custom controls
- **Adaptive streaming** support
- **Playback speed control** (0.5x - 2x)
- **Quality selection** (360p, 480p, 720p, 1080p)
- **Full screen mode**
- **Picture-in-picture support**
- **Keyboard shortcuts**:
  - Space: Play/Pause
  - Arrow keys: Seek
  - Numbers: Jump to percentage
  - F: Fullscreen
  - M: Mute

### Progress Tracking Features
- **Automatic progress tracking** when video is watched
- **Manual completion** button for lectures
- **Time spent tracking**
- **Completion percentage calculation**
- **Section completion based on lecture completion**
- **Course completion when all sections are complete**

## Learning Analytics

### Trackable Metrics
- **Time spent** per lecture, section, course
- **Completion rate** for each course
- **Streaks** (consecutive days of learning)
- **Average session duration**
- **Most active times of day**
- **Course completion rates**

### Display Components
- **Learning Streak** component
- **Time Spent** dashboard
- **Completion Rate** charts
- **Activity Timeline**

## Access Control

### Enrollment-Based Access
- **Preview lectures** available to all users
- **Full course access** requires enrollment
- **Locked content** shows enrollment CTA
- **Expired access** shows renewal options
- **Admin access** to all content

### Content Protection
- **Route guards** for course player
- **API authorization** for protected content
- **Token validation** for progress tracking
- **Session management** for learning sessions

## Testing Checklist

- [ ] Course player loads with sections and lectures
- [ ] Video player plays content correctly
- [ ] Progress tracking works automatically
- [ ] Manual completion button works
- [ ] Section completion updates correctly
- [ ] Course completion triggers when all sections complete
- [ ] Enrollment check works for access control
- [ ] Preview lectures are accessible to non-enrolled users
- [ ] Locked content shows enrollment CTA
- [ ] Progress dashboard displays accurate data
- [ ] Video controls work (play, pause, seek, speed, quality)
- [ ] Keyboard shortcuts work
- [ ] Fullscreen and picture-in-picture work
- [ ] Responsive design on all devices
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Deliverables

### Files to Create
```
src/pages/
├── CoursePlayer.tsx (enhance)
├── ProgressDashboard.tsx
└── MyEnrollments.tsx

src/features/courses/
├── CoursePlayer.tsx (enhance)
├── SectionNavigation.tsx
├── LecturePlayer.tsx
├── ProgressTracker.tsx
├── ProgressDashboard.tsx
├── EnrollmentManager.tsx
├── CourseAccessControl.tsx
├── courseContentSlice.ts
├── sectionsApi.ts
├── lecturesApi.ts
├── progressApi.ts
├── enrollmentsApi.ts
└── courseContentApi.ts

src/types/
├── section.ts
├── lecture.ts
├── progress.ts
├── enrollment.ts
└── resource.ts
```

### Files to Modify
- `src/components/common/MediaPlayer.tsx` - Enhance with learning features
- `src/router/app-router.tsx` - Add new routes
- `src/App.tsx` - Ensure proper routing

## Success Criteria

1. Users can navigate through course sections and lectures
2. Video player works with all controls and features
3. Progress is tracked automatically and manually
4. Course completion is calculated correctly
5. Enrollment system controls access appropriately
6. Progress dashboard shows accurate learning data
7. Responsive design works on all devices
8. Fast loading with proper loading states
9. Error handling is user-friendly
10. Learning experience is smooth and engaging

## Notes

- Use existing MediaPlayer component as base
- Follow existing design system and component patterns
- Implement proper TypeScript types
- Use Redux for global state management
- Add proper error boundaries
- Consider implementing offline support for downloaded resources
- Plan for mobile learning experience (touch controls, offline mode)
- Implement proper accessibility for video content

## Next Phase Preparation

After completing the learning experience, Phase 4 will implement the e-commerce system with course purchasing, order management, and payment processing.