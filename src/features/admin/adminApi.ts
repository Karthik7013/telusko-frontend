import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// --- Interfaces ---
export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
}

export interface RoleRequest {
    name: string;
    description: string;
    permissions: string[];
}

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

export interface UserRequest {
    email: string;
    fullName?: string;
    isInstructor?: boolean;
    avatar?: string;
}

export interface UserPasswordRequest {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

export interface UserEmailRequest {
    email: string;
}

export interface UserResponse {
    data: User;
}

export interface RoleResponse {
    data: Role;
}

export interface RolesResponse {
    data: Role[];
}

// --- 1. The Standard Base Query ---
const BASE_URL = 'http://localhost:3000';

// --- 2. Base Query with Error Handling ---
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// --- 3. The API Definition ---
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery,
    endpoints: (builder) => ({
        // Role Management Endpoints
        getRoles: builder.query<Role[], void>({
            query: () => '/roles',
        }),
        getRoleById: builder.query<Role, number>({
            query: (id) => `/roles/${id}`,
        }),
        getRoleByName: builder.query<Role, string>({
            query: (name) => `/roles/name/${name}`,
        }),
        createRole: builder.mutation<Role, RoleRequest>({
            query: (payload) => ({
                url: '/roles',
                method: 'POST',
                body: payload,
            }),
        }),
        updateRole: builder.mutation<Role, { id: number; data: Partial<RoleRequest> }>({
            query: ({ id, data }) => ({
                url: `/roles/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteRole: builder.mutation<void, number>({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),

        // User Management Endpoints
        getUsers: builder.query<User[], void>({
            query: () => '/users',
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`,
        }),
        getUserByEmail: builder.query<User, string>({
            query: (email) => `/users/email/${email}`,
        }),
        updateUser: builder.mutation<User, { id: number; data: Partial<UserRequest> }>({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePassword: builder.mutation<UserResponse, UserPasswordRequest>({
            query: (payload) => ({
                url: `/users/${payload.userId}/password`,
                method: 'PUT',
                body: {
                    currentPassword: payload.currentPassword,
                    newPassword: payload.newPassword,
                },
            }),
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRoleByIdQuery,
    useGetRoleByNameQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useDeleteUserMutation,
} = adminApi;

export default adminApi;