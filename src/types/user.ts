export interface User {
  id: number;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  isInstructor: boolean;
  avatar?: string;
  image?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}