# Phase 5: Advanced Features & Analytics

## Overview
Add advanced features that enhance the learning experience and provide valuable insights to both students and instructors. This phase focuses on reviews, ratings, analytics, and personalized recommendations.

## Goals
- Implement comprehensive review and rating system
- Build analytics dashboards for students and instructors
- Add personalized course recommendations
- Create learning path suggestions
- Implement achievement and milestone tracking

## API Endpoints to Implement

### 1. Reviews Endpoints
- `GET /reviews` - Get all reviews
- `GET /reviews/course/:courseId` - Get reviews by course
- `GET /reviews/user/:userId` - Get reviews by user
- `GET /reviews/course/:courseId/rating` - Get course rating summary
- `POST /reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### 2. Progress Endpoints (already implemented in Phase 3, but enhanced here)
- `GET /progress/user/:userId` - Get detailed progress
- `GET /progress/lecture/:lectureId` - Get lecture completion stats

### 3. Notifications Endpoints (will be enhanced in Phase 7)
- `GET /notifications` - Get all notifications
- `GET /notifications/user/:userId` - Get user notifications
- `POST /notifications` - Create notification (admin/system)
- `PUT /notifications/:id` - Update notification
- `DELETE /notifications/:id` - Delete notification
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/user/:userId/read` - Mark all as read

## Components to Build/Enhance

### 1. Review System Components
- **CourseReviews** (`src/features/reviews/CourseReviews.tsx`)
  - Display all reviews for a course
  - Review filtering (by rating, date)
  - Sort options (helpful, recent, highest, lowest)
  - Pagination or infinite scroll

- **ReviewForm** (`src/features/reviews/ReviewForm.tsx`)
  - Star rating component
  - Comment textarea
  - Submit review
  - Edit existing review
  - Delete review (own reviews only)

- **ReviewCard** (`src/components/common/ReviewCard.tsx`)
  - User avatar and name
  - Rating display
  - Review text
  - Date posted
  - Helpful button
  - Instructor reply (if exists)

- **RatingSummary** (`src/components/common/RatingSummary.tsx`)
  - Average rating
  - Total review count
  - Rating breakdown (5-star, 4-star, etc.)
  - Rating distribution chart

### 2. Analytics Components

#### Student Analytics
- **StudentAnalytics** (`src/features/analytics/StudentAnalytics.tsx`)
  - Learning progress overview
  - Courses completed
  - Time spent learning
  - Knowledge areas covered
  - Learning streaks
  - Weekly/monthly activity

- **ProgressCharts** (`src/features/analytics/ProgressCharts.tsx`)
  - Line chart: Learning activity over time
  - Bar chart: Time per course
  - Pie chart: Course categories distribution
  - Completion rate trends

- **SkillAssessment** (`src/features/analytics/SkillAssessment.tsx`)
  - Skills gained from courses
  - Proficiency levels
  - Skill gaps
  - Recommended courses to fill gaps

#### Instructor Analytics
- **InstructorAnalytics** (`src/features/analytics/InstructorAnalytics.tsx`)
  - Course performance metrics
  - Student enrollment numbers
  - Completion rates
  - Revenue overview
  - Student satisfaction (ratings)

- **CourseAnalytics** (`src/features/analytics/CourseAnalytics.tsx`)
  - Student progress distribution
  - Drop-off points
  - Most/least popular lectures
  - Quiz performance (if applicable)
  - Engagement metrics

### 3. Recommendation Components
- **CourseRecommendations** (`src/features/recommendations/CourseRecommendations.tsx`)
  - "Recommended for You" section
  - Based on:
    - Enrolled courses
    - Completed courses
    - Wishlist
    - Similar user behavior
    - Category preferences

- **LearningPath** (`src/features/recommendations/LearningPath.tsx`)
  - Suggested course sequences
  - Skill-based paths
  - Career-oriented paths
  - Prerequisite relationships
  - Estimated time to complete

- **PersonalizedHomepage** (`src/pages/Home.tsx` - enhance)
  - Dynamic content based on user
  - Continue learning section
  - Recommended courses
  - Popular in your interests

### 4. Achievement System Components
- **AchievementBadge** (`src/components/common/AchievementBadge.tsx`)
  - Badge display
  - Unlocked/locked states
  - Tooltip with description

- **AchievementSystem** (`src/features/achievements/AchievementSystem.tsx`)
  - List of achievements
  - Progress tracking
  - Unlock notifications
  - Share achievements

- **MilestoneTracker** (`src/features/achievements/MilestoneTracker.tsx`)
  - Learning milestones
  - Streak counter
  - Course completion celebrations
  - Time-based achievements

### 5. Dashboard Enhancements
- **StudentDashboard** (`src/pages/dashboard/StudentDashboard.tsx`)
  - Overview of enrolled courses
  - Recent activity
  - Upcoming deadlines
  - Quick stats
  - Recommended next steps

- **InstructorDashboard** (`src/pages/dashboard/InstructorDashboard.tsx`)
  - Course overview
  - Student metrics
  - Recent enrollments
  - Revenue summary
  - Recent reviews

## State Management (Redux)

### Create reviewSlice (`src/features/reviews/reviewSlice.ts`)
```typescript
interface ReviewState {
  reviews: Review[];
  courseRatings: { [courseId: number]: CourseRating };
  userReviews: Review[];
  isLoading: boolean;
  error: string | null;
}

interface Review {
  id: number;
  courseId: number;
  userId: number;
  user?: User;
  rating: number;
  comment: string;
  isEdited: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CourseRating {
  courseId: number;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
```

### Create analyticsSlice (`src/features/analytics/analyticsSlice.ts`)
```typescript
interface AnalyticsState {
  studentAnalytics: StudentAnalytics | null;
  instructorAnalytics: InstructorAnalytics | null;
  courseAnalytics: { [courseId: number]: CourseAnalytics };
  isLoading: boolean;
  error: string | null;
}

interface StudentAnalytics {
  userId: number;
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  totalLearningTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: WeeklyActivity[];
  categoryProgress: CategoryProgress[];
  skillLevels: SkillLevel[];
}

interface InstructorAnalytics {
  userId: number;
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageCourseRating: number;
  coursePerformance: CoursePerformance[];
  monthlyEnrollments: MonthlyEnrollment[];
}
```

### Create recommendationsSlice (`src/features/recommendations/recommendationsSlice.ts`)
```typescript
interface RecommendationsState {
  recommendedCourses: Course[];
  learningPaths: LearningPath[];
  basedOn: {
    enrolledCourses: number[];
    completedCourses: number[];
    wishlist: number[];
    interests: string[];
  };
  isLoading: boolean;
  error: string | null;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  estimatedHours: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  careerOutcomes: string[];
}
```

## Type Definitions

### Create/Update Types (`src/types/`)
- `review.ts` - Review interface and related types
- `analytics.ts` - Analytics interfaces
- `recommendation.ts` - Recommendation and learning path types
- `achievement.ts` - Achievement and milestone types

Example types:
```typescript
// review.ts
export interface Review {
  id: number;
  courseId: number;
  userId: number;
  user?: User;
  rating: number;
  comment: string;
  isEdited: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

// analytics.ts
export interface StudentAnalytics {
  userId: number;
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  totalLearningTime: number;
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: WeeklyActivity[];
  categoryProgress: CategoryProgress[];
}

export interface WeeklyActivity {
  weekStart: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

// recommendation.ts
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  estimatedHours: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  careerOutcomes: string[];
  prerequisites: string[];
}

// achievement.ts
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: AchievementCriteria;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

export interface AchievementCriteria {
  type: 'course_completion' | 'streak' | 'time_spent' | 'courses_enrolled' | 'reviews_written';
  target: number;
  current: number;
}
```

## API Integration

### Create API Services
- `src/features/reviews/reviewsApi.ts`
  ```typescript
  export const reviewsApi = {
    getReviewsByCourse: (courseId: number, params?: PaginationParams) => ...
    getReviewsByUser: (userId: number) => ...
    getCourseRating: (courseId: number) => ...
    createReview: (data: ReviewData) => ...
    updateReview: (id: number, data: ReviewData) => ...
    deleteReview: (id: number) => ...
    markHelpful: (reviewId: number) => ...
  };
  ```

- `src/features/analytics/analyticsApi.ts`
  ```typescript
  export const analyticsApi = {
    getStudentAnalytics: (userId: number) => ...
    getInstructorAnalytics: (userId: number) => ...
    getCourseAnalytics: (courseId: number) => ...
    getProgressOverTime: (userId: number, period: 'week' | 'month' | 'year') => ...
  };
  ```

- `src/features/recommendations/recommendationsApi.ts`
  ```typescript
  export const recommendationsApi = {
    getRecommendedCourses: (userId: number) => ...
    getLearningPaths: (userId: number, skill?: string) => ...
    getSimilarCourses: (courseId: number) => ...
  };
  ```

## Pages to Create/Enhance

1. **Course Reviews Page** (`src/pages/CourseReviews.tsx`)
   - Route: `/course/:slug/reviews`
   - All reviews for a course

2. **Analytics Dashboard** (`src/pages/AnalyticsDashboard.tsx`)
   - Route: `/analytics`
   - Student or instructor analytics based on role

3. **Recommendations Page** (`src/pages/Recommendations.tsx`)
   - Route: `/recommendations`
   - Personalized course recommendations

4. **Achievements Page** (`src/pages/Achievements.tsx`)
   - Route: `/achievements`
   - User achievements and milestones

5. **Home Page** (enhance existing `src/pages/Home.tsx`)
   - Add personalized sections
   - Continue learning
   - Recommended courses

## Routing Updates

Add to `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  {
    path: '/course/:slug/reviews',
    element: <ProtectedRoute><CourseReviewsPage /></ProtectedRoute>,
  },
  {
    path: '/analytics',
    element: <ProtectedRoute><AnalyticsDashboardPage /></ProtectedRoute>,
  },
  {
    path: '/recommendations',
    element: <ProtectedRoute><RecommendationsPage /></ProtectedRoute>,
  },
  {
    path: '/achievements',
    element: <ProtectedRoute><AchievementsPage /></ProtectedRoute>,
  },
  // ... existing routes
];
```

## UI/UX Features

### Review System
- **Star Rating**: Interactive 5-star rating
- **Review Text**: Character limit with counter
- **Edit Reviews**: Edit within 24 hours
- **Helpful Votes**: Mark review as helpful
- **Report Reviews**: Flag inappropriate content
- **Instructor Responses**: Show instructor replies

### Analytics Display
- **Charts**: Use chart library (Chart.js, Recharts, or Victory)
- **Cards**: Metric cards with icons
- **Progress Bars**: Visual progress indicators
- **Timeline**: Activity timeline
- **Export**: PDF/CSV export of analytics (future)

### Recommendations
- **Multiple Sections**:
  - "Based on your interests"
  - "Students who took X also took"
  - "Popular in your network"
  - "New courses matching your profile"
- **Explainability**: Show why each course is recommended
- **Dismiss**: Allow dismissing recommendations

### Achievements
- **Badge Types**:
  - Completion badges (first course, 5 courses, etc.)
  - Streak badges (7-day, 30-day, etc.)
  - Engagement badges (reviews written, hours learned)
  - Social badges (referrals, sharing)
- **Unlock Animations**: Celebrate achievements
- **Share**: Share achievements on social media

## Testing Checklist

- [ ] Review submission works
- [ ] Review editing works
- [ ] Review deletion works
- [ ] Helpful vote works
- [ ] Rating summary displays correctly
- [ ] Analytics dashboard loads data
- [ ] Charts render correctly
- [ ] Recommendations are personalized
- [ ] Learning paths are logical
- [ ] Achievement system tracks progress
- [ ] Badges unlock correctly
- [ ] Homepage personalization works
- [ ] Responsive design on all devices
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Deliverables

### Files to Create
```
src/pages/
├── CourseReviews.tsx
├── AnalyticsDashboard.tsx
├── Recommendations.tsx
├── Achievements.tsx
└── Home.tsx (enhance)

src/features/
├── reviews/
│   ├── CourseReviews.tsx
│   ├── ReviewForm.tsx
│   ├── ReviewCard.tsx
│   ├── reviewsApi.ts
│   └── reviewSlice.ts
├── analytics/
│   ├── StudentAnalytics.tsx
│   ├── InstructorAnalytics.tsx
│   ├── ProgressCharts.tsx
│   ├── SkillAssessment.tsx
│   ├── analyticsApi.ts
│   └── analyticsSlice.ts
├── recommendations/
│   ├── CourseRecommendations.tsx
│   ├── LearningPath.tsx
│   ├── recommendationsApi.ts
│   └── recommendationsSlice.ts
└── achievements/
    ├── AchievementSystem.tsx
    ├── MilestoneTracker.tsx
    ├── AchievementBadge.tsx
    ├── achievementsSlice.ts
    └── achievementsApi.ts

src/components/common/
├── RatingSummary.tsx
├── ReviewCard.tsx
├── AchievementBadge.tsx
└── ProgressChart.tsx

src/types/
├── review.ts
├── analytics.ts
├── recommendation.ts
└── achievement.ts
```

### Files to Modify
- `src/router/app-router.tsx` - Add new routes
- `src/pages/Home.tsx` - Enhance with recommendations
- `src/App.tsx` - Ensure proper routing

## Success Criteria

1. Users can write and edit reviews
2. Reviews are displayed with ratings
3. Analytics provide meaningful insights
4. Recommendations are relevant and personalized
5. Learning paths help users progress
6. Achievement system motivates learning
7. Dashboards are informative and easy to understand
8. All features are responsive and performant
9. Data visualizations are clear and accurate
10. User engagement increases with these features

## Notes

- Use appropriate charting library (Recharts recommended for React)
- Implement proper caching for analytics data
- Consider privacy implications of analytics
- Add data export functionality
- Implement A/B testing for recommendations (future)
- Add machine learning for better recommendations (future)
- Consider gamification elements
- Plan for scalability of analytics queries
- Add proper error handling for data fetching

## Next Phase Preparation

After adding advanced features, Phase 6 will implement admin and management features for content creators and platform administrators.