# Fake API Implementation

This document describes the fake API service implementation that replaces static data imports with a configurable, type-safe API layer.

## Overview

The fake API service provides a unified interface for accessing data from the `src/data/` folder with:
- **Type Safety**: Full TypeScript support for all request/response types
- **Error Handling**: Configurable error scenarios and proper error propagation
- **Empty Data Support**: Ability to simulate empty datasets
- **Network Simulation**: Configurable delays to mimic real network conditions
- **Easy Swapping**: Simple to replace with real API endpoints

## Structure

### Types (`src/types/`)

All types are defined in `src/types/index.ts`:

- `WishlistItem` - Wishlist entry structure
- `Transaction` - Transaction record structure
- `UserProfile` - User profile structure with nested address/company
- `Course` - Course details (already in `src/types/course.ts`)

### Fake API Service (`src/lib/fake-api.ts`)

The `FakeApiService` class provides methods for all API endpoints:

```typescript
class FakeApiService {
  // Wishlist
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>>
  async addToWishlist(courseId: string): Promise<ApiResponse<{ success: boolean; message: string }>>
  async removeFromWishlist(courseId: string): Promise<ApiResponse<{ success: boolean; message: string }>>

  // Courses
  async getCourses(): Promise<ApiResponse<Course[]>>
  async getCourseById(id: string): Promise<ApiResponse<Course | null>>
  async getCoursesByCategory(category: string): Promise<ApiResponse<Course[]>>
  async getCoursesByLevel(level: string): Promise<ApiResponse<Course[]>>

  // Transactions
  async getTransactions(): Promise<ApiResponse<Transaction[]>>
  async getTransactionById(id: string): Promise<ApiResponse<Transaction | null>>

  // User Profile
  async getUserProfile(): Promise<ApiResponse<UserProfile | null>>
}
```

### API Response Format

All methods return a consistent `ApiResponse<T>` type:

```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: 'success' | 'error';
}
```

## Configuration

The `FakeApiService` accepts a configuration object:

```typescript
interface FakeApiConfig {
  shouldFail?: boolean;      // Force all requests to fail (default: false)
  failRate?: number;         // Probability of failure (0-1, default: 0)
  delay?: number;            // Simulated network delay in ms (default: 1000)
  emptyData?: boolean;       // Return empty arrays/objects (default: false)
}
```

### Usage Examples

**Default instance (singleton):**
```typescript
import { fakeApi } from '@/lib/fake-api';

const response = await fakeApi.getWishlist();
if (response.status === 'success') {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

**Custom configured instance:**
```typescript
import { createFakeApi } from '@/lib/fake-api';

// Create an API that always fails
const errorApi = createFakeApi({ shouldFail: true });

// Create an API that returns empty data
const emptyApi = createFakeApi({ emptyData: true });

// Create an API with 30% failure rate and 2s delay
const flakyApi = createFakeApi({ failRate: 0.3, delay: 2000 });
```

## Integration with RTK Query

The APIs are integrated with RTK Query using the `queryFn` pattern:

```typescript
export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      queryFn: async () => {
        const response = await fakeApi.getWishlist();
        if (response.status === 'error') {
          return { error: { status: 500, data: response.error } };
        }
        return { data: response.data };
      }
    }),
    // ... other endpoints
  }),
});
```

## Swapping to Real API

To replace the fake API with a real API:

1. **Option A: Replace the baseQuery**
   - Change `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   - Update endpoint `query` functions to use real URLs
   - Remove the `fakeApi` calls

2. **Option B: Create a real API service**
   - Implement the same interface as `FakeApiService`
   - Create `RealApiService` that makes actual HTTP calls
   - Update imports: `import { realApi } from '@/lib/real-api'`
   - Or use dependency injection with a factory pattern

Example of swapping:

```typescript
// Before (fake API)
queryFn: async () => {
  const response = await fakeApi.getWishlist();
  if (response.status === 'error') {
    return { error: { status: 500, data: response.error } };
  }
  return { data: response.data };
}

// After (real API with fetchBaseQuery)
query: () => '/api/wishlist'  // Uses the baseQuery automatically
```

## Testing Scenarios

A test page is available at `src/pages/TestApi.tsx` to demonstrate:

- Normal API calls
- Empty data scenarios
- Error handling
- Not found scenarios

To use the test page, add it to your router or navigate to `/test-api`.

## Benefits

1. **Type Safety**: All data is strictly typed, catching errors at compile time
2. **Consistent Error Handling**: All errors follow the same pattern
3. **Easy Testing**: Configure different scenarios without modifying code
4. **Swappable**: Clear separation makes it easy to replace with real APIs
5. **Maintainable**: Centralized data access logic
6. **Realistic**: Simulates network delays for better development experience

## Files Modified/Created

- `src/types/index.ts` - Added Wishlist, Transaction, and UserProfile types
- `src/lib/fake-api.ts` - New fake API service implementation
- `src/features/wishlist/wishlistApi.ts` - Refactored to use fake API
- `src/features/courses/coursesApi.ts` - Refactored to use fake API
- `src/features/transactions/transactionsApi.ts` - Refactored to use fake API
- `src/pages/TestApi.tsx` - Test page for demonstrating scenarios

## Notes

- The fake API uses dynamic imports (`await import('@/data/...')`) to load data only when needed
- All methods include simulated network delays (default 1 second)
- Error responses include appropriate status codes (404 for not found, 500 for server errors)
- The implementation is fully asynchronous and returns Promises
- TypeScript strict mode is enforced throughout