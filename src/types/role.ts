import { User } from './user';

export interface Role {
    id: number;
    name: string; // 'ADMIN', 'INSTRUCTOR', 'STUDENT'
    description: string;
    permissions: string[];
}

export interface UserRole {
    id: number;
    userId: number;
    roleId: number;
    assignedAt: string;
}

export interface UserWithRoles extends User {
    roles: Role[];
    permissions: string[];
}