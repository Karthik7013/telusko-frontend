
// Theme Types
export type Theme = "dark" | "light" | "system"

// Theme Provider Props
export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

type Instructor = {
  id: string;
  fullName: string;
  email: string;
  profilePictureUrl: string;
}

export type CourseEnrollment = {
  id: string;
  enrolledAt: string;
  lastAccessedAt: string;
  progressPercentage: number;
  completedLecturesCount: number;
  completedLectureIds: string[]; // Useful for marking checkmarks in the sidebar
  status: 'active' | 'completed' | 'expired';
}

// course card props
export type CourseCardProps = {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  instructor: Instructor;
  category: string;
  isBestseller?: boolean;
  rating: number;
  totalReviews: number;
  totalStudents?: number;
  durationInHours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalLessons: number;
  basePrice: number;
  discountPercentage?: number;
  discountedPrice?: number;
  lastUpdated?: string;
}

export type Lecture = {
  id: string;
  title: string;
  duration: string;
  isPreviewable: boolean;
  url?: string
};

export type Section = {
  id: string;
  title: string;
  lectures: Lecture[];
  totalDuration: string;
};


// course detail props
export type CourseDetailProps = CourseCardProps & {
  description: string;
  previewVideoUrl: string;
  instructor: Instructor & {
    bio: string;
  };
  language: string;
  whatYouLearn: string[];
  requirements: string[];
  targetedAudience: string[];
  sections: Section[]
  tags: string[];
  enrollment?: CourseEnrollment | null;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  courseId: string;
  title: string;
  addedAt: string;
}

export interface AddToWishlistRequest {
  courseId: string;
}

export interface AddToWishlistResponse {
  success: boolean;
  message: string;
}

export interface RemoveFromWishlistRequest {
  courseId: string;
}

export interface RemoveFromWishlistResponse {
  success: boolean;
  message: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  date: string;
  course: string;
  amount: string;
  status: string;
  method: string;
}

// User Profile Types
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: string;
  address: Address;
  company: Company;
}