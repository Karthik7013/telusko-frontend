import type { WishlistItem } from '@/types';
import type { Course } from '@/types/course';
import type { Transaction, UserProfile } from '@/types';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: 'success' | 'error';
}

export interface FakeApiConfig {
  shouldFail?: boolean;
  failRate?: number; // 0-1 probability of failure
  delay?: number; // ms delay
  emptyData?: boolean; // return empty array/object
}

const DEFAULT_CONFIG: FakeApiConfig = {
  shouldFail: false,
  failRate: 0,
  delay: 1000,
  emptyData: false,
};

export class FakeApiService {
  private config: FakeApiConfig;

  constructor(config: FakeApiConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private async simulateDelay(): Promise<void> {
    const delay = this.config.delay || 0;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private shouldFail(): boolean {
    if (this.config.shouldFail) return true;
    if (this.config.failRate && Math.random() < this.config.failRate) {
      return true;
    }
    return false;
  }

  private getErrorMessage(endpoint: string): string {
    const errors = {
      'courses': 'Failed to fetch courses',
      'course': 'Failed to fetch course details',
      'wishlist': 'Failed to fetch wishlist',
      'transactions': 'Failed to fetch transactions',
      'profile': 'Failed to fetch user profile',
      'default': 'An error occurred while fetching data',
    };
    return errors[endpoint as keyof typeof errors] || errors.default;
  }

  // Wishlist APIs
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: [],
        error: this.getErrorMessage('wishlist'),
        status: 'error'
      };
    }

    // Import data dynamically to avoid circular dependencies
    const { ALL_WISHLIST } = await import('@/data/wishlist-data');
    const data = this.config.emptyData ? [] : ALL_WISHLIST;

    return {
      data,
      status: 'success'
    };
  }

  async addToWishlist(_courseId: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: { success: false, message: 'Failed to add to wishlist' },
        error: this.getErrorMessage('wishlist'),
        status: 'error'
      };
    }

    // In a real implementation, we would add the course to the wishlist data
    return {
      data: { success: true, message: 'Added to wishlist' },
      status: 'success'
    };
  }

  async removeFromWishlist(_courseId: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: { success: false, message: 'Failed to remove from wishlist' },
        error: this.getErrorMessage('wishlist'),
        status: 'error'
      };
    }

    // In a real implementation, we would remove the course from the wishlist data
    return {
      data: { success: true, message: 'Removed from wishlist' },
      status: 'success'
    };
  }

  // Course APIs
  async getCourses(): Promise<ApiResponse<Course[]>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: [],
        error: this.getErrorMessage('courses'),
        status: 'error'
      };
    }

    const { ALL_COURSES } = await import('@/data/courses-data');
    const data = this.config.emptyData ? [] : ALL_COURSES;

    return {
      data,
      status: 'success'
    };
  }

  async getCourseById(id: string): Promise<ApiResponse<Course | null>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: null,
        error: this.getErrorMessage('course'),
        status: 'error'
      };
    }

    const { ALL_COURSES } = await import('@/data/courses-data');
    const course = ALL_COURSES.find(c => c.id === id);
    if (!course) {
      return {
        data: null,
        error: 'Course not found',
        status: 'error'
      };
    }

    return {
      data: course,
      status: 'success'
    };
  }

  async getCoursesByCategory(category: string): Promise<ApiResponse<Course[]>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: [],
        error: this.getErrorMessage('courses'),
        status: 'error'
      };
    }

    const { ALL_COURSES } = await import('@/data/courses-data');
    const filtered = ALL_COURSES.filter(c => c.category === category);

    return {
      data: filtered,
      status: 'success'
    };
  }

  async getCoursesByLevel(level: string): Promise<ApiResponse<Course[]>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: [],
        error: this.getErrorMessage('courses'),
        status: 'error'
      };
    }

    const { ALL_COURSES } = await import('@/data/courses-data');
    const filtered = ALL_COURSES.filter(c => c.level === level);

    return {
      data: filtered,
      status: 'success'
    };
  }

  // Transaction APIs
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: [],
        error: this.getErrorMessage('transactions'),
        status: 'error'
      };
    }

    const { ALL_TRANSACTIONS } = await import('@/data/transactions-data');
    const data = this.config.emptyData ? [] : ALL_TRANSACTIONS;

    return {
      data,
      status: 'success'
    };
  }

  async getTransactionById(id: string): Promise<ApiResponse<Transaction | null>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: null,
        error: this.getErrorMessage('transactions'),
        status: 'error'
      };
    }

    const { ALL_TRANSACTIONS } = await import('@/data/transactions-data');
    const transaction = ALL_TRANSACTIONS.find(t => t.id === id);

    if (!transaction) {
      return {
        data: null,
        error: 'Transaction not found',
        status: 'error'
      };
    }

    return {
      data: transaction,
      status: 'success'
    };
  }

  // User Profile APIs
  async getUserProfile(): Promise<ApiResponse<UserProfile | null>> {
    await this.simulateDelay();

    if (this.shouldFail()) {
      return {
        data: null,
        error: this.getErrorMessage('profile'),
        status: 'error'
      };
    }

    const { USER_PROFILE } = await import('@/data/user-profile-data');
    const data = this.config.emptyData ? null : USER_PROFILE;

    return {
      data,
      status: 'success'
    };
  }
}

// Singleton instance for easy access
export const fakeApi = new FakeApiService();

// Factory function to create configured instances
export const createFakeApi = (config?: FakeApiConfig) => new FakeApiService(config);