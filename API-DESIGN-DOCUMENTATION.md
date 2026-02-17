# Telusko Learning Platform API Documentation

## Overview

This is a comprehensive REST API documentation for the Telusko Learning Platform, a complete e-learning system built with NestJS. The API provides endpoints for user authentication, course management, content delivery, and e-commerce functionality.

## Base URL

```
https://api.telusko.com
```

## Authentication

### JWT Token
All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## API Endpoints

### 1. Authentication (`/auth`)

#### Login
```bash
curl -X POST "https://api.telusko.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Register
```bash
curl -X POST "https://api.telusko.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "isInstructor": false
  }'
```

#### Get Profile
```bash
curl -X GET "https://api.telusko.com/auth/profile" \
  -H "Authorization: Bearer <access_token>"
```

#### Refresh Token
```bash
curl -X POST "https://api.telusko.com/auth/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<refresh_token>"
  }'
```

### 2. Categories (`/categories`)

#### Get All Categories
```bash
curl -X GET "https://api.telusko.com/categories"
```

#### Get Category by Slug
```bash
curl -X GET "https://api.telusko.com/categories/technology"
```

#### Get Category Hierarchy
```bash
curl -X GET "https://api.telusko.com/categories/technology/hierarchy"
```

#### Create Category
```bash
curl -X POST "https://api.telusko.com/categories" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "slug": "new-category",
    "description": "Description of new category"
  }'
```

#### Update Category
```bash
curl -X PUT "https://api.telusko.com/categories/technology" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Category",
    "description": "Updated description"
  }'
```

#### Delete Category
```bash
curl -X DELETE "https://api.telusko.com/categories/technology" \
  -H "Authorization: Bearer <access_token>"
```

### 3. Courses (`/courses`)

#### Get All Courses
```bash
curl -X GET "https://api.telusko.com/courses"
```

#### Search Courses
```bash
curl -X GET "https://api.telusko.com/courses/search?q=javascript"
```

#### Get Featured Courses
```bash
curl -X GET "https://api.telusko.com/courses/featured?limit=10"
```

#### Get Popular Courses
```bash
curl -X GET "https://api.telusko.com/courses/popular?limit=10"
```

#### Get Courses by Category
```bash
curl -X GET "https://api.telusko.com/courses/category/1"
```

#### Get Courses by Instructor
```bash
curl -X GET "https://api.telusko.com/courses/instructor/1"
```

#### Get Course by Slug
```bash
curl -X GET "https://api.telusko.com/courses/nestjs-for-beginners"
```

#### Create Course
```bash
curl -X POST "https://api.telusko.com/courses" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "NestJS for Beginners",
    "slug": "nestjs-for-beginners",
    "description": "Learn NestJS from scratch",
    "categoryId": 1,
    "price": 99.99,
    "isPublished": false
  }'
```

#### Update Course
```bash
curl -X PUT "https://api.telusko.com/courses/nestjs-for-beginners" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Course Title",
    "price": 79.99,
    "isPublished": true
  }'
```

#### Delete Course
```bash
curl -X DELETE "https://api.telusko.com/courses/nestjs-for-beginners" \
  -H "Authorization: Bearer <access_token>"
```

### 4. Sections (`/sections`)

#### Get All Sections
```bash
curl -X GET "https://api.telusko.com/sections"
```

#### Get Section by ID
```bash
curl -X GET "https://api.telusko.com/sections/1"
```

#### Get Sections by Course
```bash
curl -X GET "https://api.telusko.com/sections/course/1"
```

#### Create Section
```bash
curl -X POST "https://api.telusko.com/sections" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction",
    "courseId": 1,
    "order": 1
  }'
```

#### Update Section
```bash
curl -X PUT "https://api.telusko.com/sections/1" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Section Title",
    "order": 2
  }'
```

#### Delete Section
```bash
curl -X DELETE "https://api.telusko.com/sections/1" \
  -H "Authorization: Bearer <access_token>"
```

#### Reorder Sections
```bash
curl -X POST "https://api.telusko.com/sections/1/reorder" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sectionIds": ["2", "1", "3"]
  }'
```

### 5. Lectures (`/lectures`)

#### Get All Lectures
```bash
curl -X GET "https://api.telusko.com/lectures"
```

#### Get Lecture by ID
```bash
curl -X GET "https://api.telusko.com/lectures/1"
```

#### Get Lectures by Section
```bash
curl -X GET "https://api.telusko.com/lectures/section/1"
```

#### Get Preview Lectures
```bash
curl -X GET "https://api.telusko.com/lectures/course/1/preview?limit=5"
```

#### Create Lecture
```bash
curl -X POST "https://api.telusko.com/lectures" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to NestJS",
    "sectionId": 1,
    "content": "Lecture content here",
    "duration": 15,
    "isPreview": true
  }'
```

#### Update Lecture
```bash
curl -X PUT "https://api.telusko.com/lectures/1" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Lecture Title",
    "content": "Updated content"
  }'
```

#### Delete Lecture
```bash
curl -X DELETE "https://api.telusko.com/lectures/1" \
  -H "Authorization: Bearer <access_token>"
```

### 6. Reviews (`/reviews`)

#### Get All Reviews
```bash
curl -X GET "https://api.telusko.com/reviews"
```

#### Get Reviews by Course
```bash
curl -X GET "https://api.telusko.com/reviews/course/1"
```

#### Get Reviews by User
```bash
curl -X GET "https://api.telusko.com/reviews/user/1"
```

#### Get Course Rating
```bash
curl -X GET "https://api.telusko.com/reviews/course/1/rating"
```

#### Create Review
```bash
curl -X POST "https://api.telusko.com/reviews" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": 1,
    "rating": 5,
    "comment": "Great course!"
  }'
```

#### Update Review
```bash
curl -X PUT "https://api.telusko.com/reviews/1" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "comment": "Good course"
  }'
```

#### Delete Review
```bash
curl -X DELETE "https://api.telusko.com/reviews/1" \
  -H "Authorization: Bearer <access_token>"
```

### 7. Users (`/users`)

#### Get All Users
```bash
curl -X GET "https://api.telusko.com/users"
```

#### Get User by ID
```bash
curl -X GET "https://api.telusko.com/users/1"
```

#### Get User by Email
```bash
curl -X GET "https://api.telusko.com/users/email/john@example.com"
```

#### Create User
```bash
curl -X POST "https://api.telusko.com/users" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "passwordHash": "<hashed_password>",
    "fullName": "John Doe",
    "isInstructor": false
  }'
```

#### Update User
```bash
curl -X PUT "https://api.telusko.com/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Updated",
    "isInstructor": true
  }'
```

#### Delete User
```bash
curl -X DELETE "https://api.telusko.com/users/1"
```

#### Update Password
```bash
curl -X PUT "https://api.telusko.com/users/1/password" \
  -H "Content-Type: application/json" \
  -d '{
    "passwordHash": "<new_hashed_password>"
  }'
```

### 8. Roles (`/roles`)

#### Get All Roles
```bash
curl -X GET "https://api.telusko.com/roles"
```

#### Get Role by ID
```bash
curl -X GET "https://api.telusko.com/roles/1"
```

#### Get Role by Name
```bash
curl -X GET "https://api.telusko.com/roles/name/ADMIN"
```

#### Create Role
```bash
curl -X POST "https://api.telusko.com/roles" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MODERATOR",
    "description": "Content moderator"
  }'
```

#### Update Role
```bash
curl -X PUT "https://api.telusko.com/roles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated role description"
  }'
```

#### Delete Role
```bash
curl -X DELETE "https://api.telusko.com/roles/1"
```

### 9. User Roles (`/user-roles`)

#### Get All User Roles
```bash
curl -X GET "https://api.telusko.com/user-roles"
```

#### Get User Role by ID
```bash
curl -X GET "https://api.telusko.com/user-roles/1"
```

#### Get User Roles by User
```bash
curl -X GET "https://api.telusko.com/user-roles/user/1"
```

#### Get User Roles by Role
```bash
curl -X GET "https://api.telusko.com/user-roles/role/1"
```

#### Create User Role
```bash
curl -X POST "https://api.telusko.com/user-roles" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "roleId": 2
  }'
```

#### Update User Role
```bash
curl -X PUT "https://api.telusko.com/user-roles/1" \
  -H "Content-Type: application/json" \
  -d '{
    "roleId": 3
  }'
```

#### Delete User Role
```bash
curl -X DELETE "https://api.telusko.com/user-roles/1"
```

#### Delete User Roles by User
```bash
curl -X DELETE "https://api.telusko.com/user-roles/user/1"
```

#### Delete User Roles by Role
```bash
curl -X DELETE "https://api.telusko.com/user-roles/role/1"
```

### 10. Notifications (`/notifications`)

#### Get All Notifications
```bash
curl -X GET "https://api.telusko.com/notifications"
```

#### Get Notification by ID
```bash
curl -X GET "https://api.telusko.com/notifications/1"
```

#### Get Notifications by User
```bash
curl -X GET "https://api.telusko.com/notifications/user/1"
```

#### Create Notification
```bash
curl -X POST "https://api.telusko.com/notifications" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "New Course Available",
    "message": "A new course has been published",
    "type": "info"
  }'
```

#### Update Notification
```bash
curl -X PUT "https://api.telusko.com/notifications/1" \
  -H "Content-Type: application/json" \
  -d '{
    "isRead": true
  }'
```

#### Delete Notification
```bash
curl -X DELETE "https://api.telusko.com/notifications/1"
```

#### Mark Notification as Read
```bash
curl -X PUT "https://api.telusko.com/notifications/1/read"
```

#### Mark All Notifications as Read
```bash
curl -X PUT "https://api.telusko.com/notifications/user/1/read"
```

### 11. Orders (`/orders`)

#### Get All Orders
```bash
curl -X GET "https://api.telusko.com/orders"
```

#### Get Order by ID
```bash
curl -X GET "https://api.telusko.com/orders/1"
```

#### Get Orders by User
```bash
curl -X GET "https://api.telusko.com/orders/user/1"
```

#### Get Order by Order Number
```bash
curl -X GET "https://api.telusko.com/orders/number/ORD-12345"
```

#### Create Order
```bash
curl -X POST "https://api.telusko.com/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "orderNumber": "ORD-12345",
    "totalAmount": 99.99,
    "status": "pending"
  }'
```

#### Update Order
```bash
curl -X PUT "https://api.telusko.com/orders/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### Delete Order
```bash
curl -X DELETE "https://api.telusko.com/orders/1"
```

### 12. Enrollments (`/enrollments`)

#### Get All Enrollments
```bash
curl -X GET "https://api.telusko.com/enrollments"
```

#### Get Enrollment by ID
```bash
curl -X GET "https://api.telusko.com/enrollments/1"
```

#### Get Enrollments by User
```bash
curl -X GET "https://api.telusko.com/enrollments/user/1"
```

#### Get Enrollments by Course
```bash
curl -X GET "https://api.telusko.com/enrollments/course/1"
```

#### Create Enrollment
```bash
curl -X POST "https://api.telusko.com/enrollments" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "courseId": 1,
    "enrollmentDate": "2024-01-01T00:00:00Z",
    "status": "active"
  }'
```

#### Update Enrollment
```bash
curl -X PUT "https://api.telusko.com/enrollments/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### Delete Enrollment
```bash
curl -X DELETE "https://api.telusko.com/enrollments/1"
```

### 13. Coupons (`/coupons`)

#### Get All Coupons
```bash
curl -X GET "https://api.telusko.com/coupons"
```

#### Get Coupon by ID
```bash
curl -X GET "https://api.telusko.com/coupons/1"
```

#### Get Coupon by Code
```bash
curl -X GET "https://api.telusko.com/coupons/code/SUMMER2024"
```

#### Validate Coupon
```bash
curl -X GET "https://api.telusko.com/coupons/validate/SUMMER2024"
```

#### Create Coupon
```bash
curl -X POST "https://api.telusko.com/coupons" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SUMMER2024",
    "discount": 20,
    "type": "percentage",
    "startDate": "2024-06-01T00:00:00Z",
    "endDate": "2024-08-31T23:59:59Z",
    "maxUses": 100,
    "isActive": true
  }'
```

#### Update Coupon
```bash
curl -X PUT "https://api.telusko.com/coupons/1" \
  -H "Content-Type: application/json" \
  -d '{
    "discount": 25,
    "isActive": false
  }'
```

#### Delete Coupon
```bash
curl -X DELETE "https://api.telusko.com/coupons/1"
```

### 14. Wishlists (`/wishlists`)

#### Get All Wishlists
```bash
curl -X GET "https://api.telusko.com/wishlists"
```

#### Get Wishlist by ID
```bash
curl -X GET "https://api.telusko.com/wishlists/1"
```

#### Get Wishlists by User
```bash
curl -X GET "https://api.telusko.com/wishlists/user/1"
```

#### Get Wishlists by Course
```bash
curl -X GET "https://api.telusko.com/wishlists/course/1"
```

#### Create Wishlist
```bash
curl -X POST "https://api.telusko.com/wishlists" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "courseId": 1,
    "addedDate": "2024-01-01T00:00:00Z"
  }'
```

#### Delete Wishlist
```bash
curl -X DELETE "https://api.telusko.com/wishlists/1"
```

#### Delete Wishlist by User and Course
```bash
curl -X DELETE "https://api.telusko.com/wishlists/user/1/course/1"
```

### 15. Progress (`/progress`)

#### Get All Progress
```bash
curl -X GET "https://api.telusko.com/progress"
```

#### Get Progress by ID
```bash
curl -X GET "https://api.telusko.com/progress/1"
```

#### Get Progress by User
```bash
curl -X GET "https://api.telusko.com/progress/user/1"
```

#### Get Progress by Lecture
```bash
curl -X GET "https://api.telusko.com/progress/lecture/1"
```

#### Create Progress
```bash
curl -X POST "https://api.telusko.com/progress" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "lectureId": 1,
    "completed": false,
    "completedAt": null
  }'
```

#### Update Progress
```bash
curl -X PUT "https://api.telusko.com/progress/1" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "completedAt": "2024-01-01T12:00:00Z"
  }'
```

#### Delete Progress
```bash
curl -X DELETE "https://api.telusko.com/progress/1"
```

#### Mark Lecture as Completed
```bash
curl -X POST "https://api.telusko.com/progress/complete" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "lectureId": 1
  }'
```

## Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

Error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

## Pagination

Endpoints that return lists support pagination with these query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Example:
```bash
curl -X GET "https://api.telusko.com/courses?page=2&limit=20"
```

## Filtering

Some endpoints support filtering through query parameters. Check individual endpoint documentation for available filters.

## Sorting

List endpoints support sorting with these query parameters:

- `sort` - Field to sort by (e.g., `createdAt`, `title`)
- `order` - Sort order (`asc` or `desc`, default: `asc`)

Example:
```bash
curl -X GET "https://api.telusko.com/courses?sort=createdAt&order=desc"
```

## Search

Search endpoints support full-text search through the `q` parameter.

Example:
```bash
curl -X GET "https://api.telusko.com/courses/search?q=nestjs"
```

## File Uploads

File upload endpoints accept multipart/form-data with the following fields:

- `file` - The file to upload
- `metadata` - Optional JSON metadata

Example:
```bash
curl -X POST "https://api.telusko.com/upload" \
  -H "Authorization: Bearer <access_token>" \
  -F "file=@/path/to/file.jpg" \
  -F "metadata={"description":"Course image"}"
```

## Webhooks

The API supports webhooks for real-time notifications. Configure webhooks in the dashboard.

## SDK Availability

Official SDKs are available for:
- JavaScript/TypeScript
- Python
- Java
- PHP

## Support

For API support, contact: support@telusko.com

## Changelog

### Version 1.0.0 (2024-01-01)
- Initial API release
- All core endpoints implemented
- Authentication and authorization
- Course management
- User management
- E-commerce functionality

---

*Documentation generated on: 2026-02-16*
*API Version: 1.0.0*