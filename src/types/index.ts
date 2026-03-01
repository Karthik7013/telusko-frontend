
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


// course card props
export type CourseCardProps = {
  id: string,
  slug: string,
  title: string,
  description: string,
  rating: string,
  durationHours: string,
  instructor: string,
  thumbnailUrl: string
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