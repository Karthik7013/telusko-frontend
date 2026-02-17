# Phase 2: Course Catalog & Browsing

## Overview
Build a comprehensive course catalog system that allows users to discover, search, and filter courses. This phase focuses on creating an intuitive browsing experience with category navigation, search functionality, and featured content.

## Goals
- Implement complete course listing with pagination
- Create category-based navigation
- Add search and filtering capabilities
- Display featured and popular courses
- Build responsive course cards and detail views

## API Endpoints to Implement

### 1. Courses Endpoints
- `GET /courses` - Get all courses (with pagination, sorting, filtering)
- `GET /courses/search?q=:query` - Search courses
- `GET /courses/featured?limit=:n` - Get featured courses
- `GET /courses/popular?limit=:n` - Get popular courses
- `GET /courses/category/:categoryId` - Get courses by category
- `GET /courses/instructor/:instructorId` - Get courses by instructor
- `GET /courses/:slug` - Get course by slug

### 2. Categories Endpoints
- `GET /categories` - Get all categories
- `GET /categories/:slug` - Get category by slug
- `GET /categories/:slug/hierarchy` - Get category hierarchy

## Components to Build/Enhance

### 1. Course Catalog Components
- **CourseCatalogPage** (`src/pages/CourseCatalog.tsx`)
  - Main course listing page
  - Grid/list view toggle
  - Filters sidebar (category, price, level, rating, duration)
  - Sort options (popularity, rating, newest, price)
  - Pagination or infinite scroll
  - Loading skeleton states

- **CourseCard** (`src/components/common/CourseCard.tsx`)
  - Course thumbnail
  - Title and instructor name
  - Rating and review count
  - Price display (with discount if applicable)
  - Progress indicator (if enrolled)
  - Wishlist button
  - Quick view option

- **CourseGrid** (`src/features/courses/CourseGrid.tsx`)
  - Reusable grid component
  - Responsive layout
  - Empty state handling
  - Loading states

### 2. Category Navigation Components
- **CategorySidebar** (`src/features/courses/CategorySidebar.tsx`)
  - Hierarchical category display
  - Expandable/collapsible subcategories
  - Active category highlighting
  - Course count per category
  - Search within categories

- **CategoryBreadcrumb** (`src/components/dashboard/DashboardBreadcrumb.tsx` - enhance)
  - Show navigation path
  - Clickable breadcrumbs

- **CategoryPage** (`src/pages/CategoryPage.tsx`)
  - Display courses in selected category
  - Category description and metadata
  - Subcategory navigation

### 3. Search Components
- **SearchBar** (`src/components/common/SearchBar.tsx`)
  - Global search input
  - Search suggestions/autocomplete
  - Recent searches
  - Clear search option

- **SearchResultsPage** (`src/pages/SearchResults.tsx`)
  - Display search results
  - Show search query
  - Filter and sort options
  - Result count

### 4. Featured Content Components
- **FeaturedCoursesCarousel** (`src/features/courses/FeaturedCoursesCarousel.tsx`)
  - Horizontal scrolling carousel
  - Auto-play option
  - Navigation arrows
  - Course cards in carousel format

- **PopularCoursesSection** (`src/features/courses/PopularCoursesSection.tsx`)
  - Grid of popular courses
  - "Most Enrolled" or "Highest Rated" tabs
  - Refresh on interval (optional)

### 5. Course Detail Enhancements
- **CourseDetailPage** (`src/pages/CourseDetail.tsx` - enhance)
  - Add instructor information
  - Course curriculum preview
  - Student testimonials
  - Related courses
  - Enrollment CTA with price

## State Management (Redux)

### Create courseSlice (`src/features/courses/courseSlice.ts`)
```typescript
interface CourseState {
  courses: Course[];
  featuredCourses: Course[];
  popularCourses: Course[];
  categories: Category[];
  currentCategory: Category | null;
  searchResults: Course[];
  filters: CourseFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

interface CourseFilters {
  category?: string;
  priceRange?: [number, number];
  level?: string[];
  duration?: [number, number];
  rating?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### Create categorySlice (`src/features/courses/categorySlice.ts`)
```typescript
interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  categoryHierarchy: CategoryHierarchy | null;
  loading: boolean;
  error: string | null;
}
```

## Type Definitions

### Create/Update Types (`src/types/`)
- `course.ts` - Course interface and related types
- `category.ts` - Category interface and related types

Example types:
```typescript
// course.ts
export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  currency: string;
  categoryId: number;
  category?: Category;
  instructorId: number;
  instructor?: User;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  duration: number; // in minutes
  totalLectures: number;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  prerequisites: string[];
  learning Outcomes: string[];
  createdAt: string;
  updatedAt: string;
}

// category.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: number;
  parent?: Category;
  children?: Category[];
  courseCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryHierarchy {
  category: Category;
  children: Category[];
  ancestors: Category[];
}
```

## API Integration

### Create/Update API Services
- `src/features/courses/coursesApi.ts` (new or enhance existing)
  ```typescript
  export const coursesApi = {
    getAllCourses: (params?: CourseFilters) => ...
    getCourseBySlug: (slug: string) => ...
    searchCourses: (query: string, params?: CourseFilters) => ...
    getFeaturedCourses: (limit?: number) => ...
    getPopularCourses: (limit?: number) => ...
    getCoursesByCategory: (categoryId: number, params?: PaginationParams) => ...
    getCoursesByInstructor: (instructorId: number) => ...
  };

  export const categoriesApi = {
    getAllCategories: () => ...
    getCategoryBySlug: (slug: string) => ...
    getCategoryHierarchy: (slug: string) => ...
  };
  ```

## Pages to Create

1. **Course Catalog Page** (`src/pages/CourseCatalog.tsx`)
   - Route: `/courses`
   - Full course listing with filters

2. **Category Page** (`src/pages/CategoryPage.tsx`)
   - Route: `/category/:slug`
   - Courses in specific category

3. **Search Results Page** (`src/pages/SearchResults.tsx`)
   - Route: `/search`
   - Search results display

4. **Course Detail Page** (enhance existing `src/pages/CourseDetail.tsx`)
   - Route: `/course/:slug`
   - Complete course information

## Routing Updates

Add to `src/router/app-router.tsx`:
```typescript
const routes: RouteObject[] = [
  {
    path: '/courses',
    element: <CourseCatalogPage />,
  },
  {
    path: '/category/:slug',
    element: <CategoryPage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/course/:slug',
    element: <CourseDetailPage />,
  },
  // ... existing routes
];
```

## UI/UX Considerations

### Responsive Design
- Mobile: Single column course cards
- Tablet: 2-3 column grid
- Desktop: 3-4 column grid
- Carousels should work on touch devices

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Focus management
- Alt text for images
- High contrast support

### Performance
- Lazy load course images
- Implement virtual scrolling for long lists
- Debounce search input
- Cache API responses
- Optimize images

## Testing Checklist

- [ ] Course catalog loads with courses
- [ ] Filters work correctly (category, price, level)
- [ ] Sorting options work
- [ ] Pagination works
- [ ] Search returns relevant results
- [ ] Category navigation works
- [ ] Course cards display correctly
- [ ] Course detail page shows all information
- [ ] Featured courses carousel works
- [ ] Popular courses section loads
- [ ] Responsive design on all screen sizes
- [ ] Loading states display properly
- [ ] Error states handled gracefully

## Deliverables

### Files to Create
```
src/pages/
├── CourseCatalog.tsx
├── CategoryPage.tsx
├── SearchResults.tsx
└── CourseDetail.tsx (enhance)

src/features/courses/
├── CourseGrid.tsx
├── CourseCard.tsx (enhance)
├── CategorySidebar.tsx
├── FeaturedCoursesCarousel.tsx
├── PopularCoursesSection.tsx
├── courseSlice.ts
├── categorySlice.ts
└── coursesApi.ts

src/components/common/
├── SearchBar.tsx
└── CourseCard.tsx (if not exists)

src/types/
├── course.ts
└── category.ts
```

### Files to Modify
- `src/router/app-router.tsx` - Add new routes
- `src/components/dashboard/DashboardBreadcrumb.tsx` - Enhance
- `src/App.tsx` - Ensure proper routing

## Success Criteria

1. Users can browse all courses with filters
2. Search functionality returns accurate results
3. Category navigation is intuitive
4. Featured and popular courses are prominently displayed
5. Course detail pages are informative and engaging
6. Responsive design works on all devices
7. Fast loading with proper loading states
8. Error handling is user-friendly

## Notes

- Reuse existing CourseCard component if available
- Follow existing design system and component patterns
- Implement proper TypeScript types
- Use Redux for global state management
- Add proper error boundaries
- Consider implementing caching strategy
- Plan for SEO optimization (meta tags, structured data)

## Next Phase Preparation

Once course catalog is complete, Phase 3 will build the course content delivery system with sections, lectures, and the course player interface.