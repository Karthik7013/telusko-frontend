# Telusko Learning Platform - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication using JWT Bearer token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All responses follow this standard format:

```typescript
{
  "success": boolean,
  "message": string | null,
  "data": any | null,
  "meta": {
    "total": number | null,
    "page": number | null,
    "limit": number | null,
    "totalPages": number | null
  } | null,
  "errors": any[] | null
}
```

---

# 1. Authentication Module

## 1.1 User Registration
**POST** `/auth/register`

Register a new user account.

### Request Body
```typescript
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)",
  "fullName": "string (required)",
  "phoneNumber": "string (optional)",
  "dateOfBirth": "string (optional, ISO date format)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "isInstructor": false,
    "roles": []
  }
}
```

---

## 1.2 User Login
**POST** `/auth/login`

Authenticate user and receive access/refresh tokens.

### Request Body
```typescript
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "roles": ["string"],
      "isInstructor": boolean
    }
  }
}
```

---

## 1.3 Get User Profile
**GET** `/auth/profile`

Get the authenticated user's profile information.

### Headers
```
Authorization: Bearer <token>
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "profilePictureUrl": "string | null",
    "bio": "string | null",
    "timezone": "string | null",
    "languagePreference": "string",
    "emailVerifiedAt": "string | null",
    "lastLoginAt": "string | null",
    "isActive": boolean,
    "isInstructor": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

## 1.4 Refresh Token
**POST** `/auth/refresh-token`

Get new access and refresh tokens using existing refresh token.

### Request Body
```typescript
{
  "refreshToken": "string (required)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "roles": ["string"],
      "isInstructor": boolean
    }
  }
}
```

---

# 2. Catalog Module

## 2.1 Categories

### 2.1.1 Get All Categories
**GET** `/categories`

Retrieve all categories.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "description": "string | null",
      "parentId": "number | null",
      "isVisible": boolean,
      "color": "string | null",
      "icon": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.1.2 Get Category by Slug
**GET** `/categories/:categorySlug`

Retrieve a specific category by its slug.

### Path Parameters
- `categorySlug` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string",
    "slug": "string",
    "description": "string | null",
    "parentId": "number | null",
    "isVisible": boolean,
    "color": "string | null",
    "icon": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.1.3 Get Category Hierarchy
**GET** `/categories/:categorySlug/hierarchy`

Retrieve the full hierarchy of a category.

### Path Parameters
- `categorySlug` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "description": "string | null",
      "parentId": "number | null",
      "isVisible": boolean,
      "children": []
    }
  ]
}
```

---

### 2.1.4 Create Category
**POST** `/categories`

Create a new category. (Admin/Staff only)

### Request Body
```typescript
{
  "name": "string (required, max 100)",
  "slug": "string (required, max 100, unique)",
  "description": "string (optional, max 500)",
  "parentId": "number (optional)",
  "isVisible": "boolean (default: true)",
  "color": "string (optional, max 7, e.g., #FF5733)",
  "icon": "string (optional, max 100)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "number",
    "name": "string",
    "slug": "string",
    "description": "string | null",
    "parentId": "number | null",
    "isVisible": boolean,
    "color": "string | null",
    "icon": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.1.5 Update Category
**PUT** `/categories/:categorySlug`

Update an existing category. (Admin/Staff only)

### Path Parameters
- `categorySlug` (string, required)

### Request Body
```typescript
{
  "name": "string (optional, max 100)",
  "slug": "string (optional, max 100)",
  "description": "string (optional, max 500)",
  "parentId": "number (optional)",
  "isVisible": "boolean (optional)",
  "color": "string (optional, max 7)",
  "icon": "string (optional, max 100)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "id": "number",
    "name": "string",
    "slug": "string",
    "description": "string | null",
    "parentId": "number | null",
    "isVisible": boolean,
    "color": "string | null",
    "icon": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.1.6 Delete Category
**DELETE** `/categories/:categorySlug`

Delete a category. (Admin/Staff only)

### Path Parameters
- `categorySlug` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "message": "Category deleted successfully"
  }
}
```

---

## 2.2 Courses

### 2.2.1 Get All Courses
**GET** `/courses`

Retrieve all courses with optional filtering and pagination.

### Query Parameters
- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)
- `categoryId` (number, optional)
- `instructorId` (string, optional)
- `level` (enum: beginner|intermediate|advanced, optional)
- `language` (enum: english|spanish|french|german|chinese|japanese|korean|portuguese|russian|arabic, optional)
- `isPublished` (boolean, optional)
- `isFeatured` (boolean, optional)
- `hasCertificate` (boolean, optional)
- `minPrice` (number, optional)
- `maxPrice` (number, optional)
- `search` (string, optional)
- `sortBy` (enum: rating|createdAt|price|title, optional)
- `sortOrder` (enum: ASC|DESC, optional)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid",
        "instructorId": "uuid | null",
        "categoryId": "number | null",
        "title": "string",
        "slug": "string",
        "description": "string | null",
        "shortDescription": "string | null",
        "whatYouWillLearn": "string[] | null",
        "requirements": "string[] | null",
        "targetAudience": "string[] | null",
        "thumbnailUrl": "string | null",
        "previewVideoUrl": "string | null",
        "level": "beginner|intermediate|advanced",
        "durationHours": "number",
        "rating": "number (0-5)",
        "ratingCount": "number",
        "enrollmentCount": "number",
        "isFeatured": boolean,
        "tags": "string[] | null",
        "certificateAvailable": boolean,
        "basePrice": "number",
        "salePrice": "number",
        "currency": "string (default: USD)",
        "isPublished": boolean,
        "publishedAt": "string | null",
        "expiresAt": "string | null",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "total": "number"
  }
}
```

---

### 2.2.2 Search Courses
**GET** `/courses/search`

Search courses by query string.

### Query Parameters
- `q` (string, required) - Search query

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "thumbnailUrl": "string | null",
      "level": "string",
      "rating": "number",
      "enrollmentCount": "number",
      "basePrice": "number",
      "salePrice": "number",
      "currency": "string"
    }
  ]
}
```

---

### 2.2.3 Get Featured Courses
**GET** `/courses/featured`

Retrieve featured courses.

### Query Parameters
- `limit` (number, optional, default: 10)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "thumbnailUrl": "string | null",
      "level": "string",
      "rating": "number",
      "enrollmentCount": "number",
      "basePrice": "number",
      "salePrice": "number",
      "currency": "string"
    }
  ]
}
```

---

### 2.2.4 Get Popular Courses
**GET** `/courses/popular`

Retrieve popular courses based on enrollment count.

### Query Parameters
- `limit` (number, optional, default: 10)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "thumbnailUrl": "string | null",
      "level": "string",
      "rating": "number",
      "enrollmentCount": "number",
      "basePrice": "number",
      "salePrice": "number",
      "currency": "string"
    }
  ]
}
```

---

### 2.2.5 Get Courses by Category
**GET** `/courses/category/:categoryId`

Retrieve all courses in a specific category.

### Path Parameters
- `categoryId` (number, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "thumbnailUrl": "string | null",
      "level": "string",
      "rating": "number",
      "enrollmentCount": "number",
      "basePrice": "number",
      "salePrice": "number",
      "currency": "string"
    }
  ]
}
```

---

### 2.2.6 Get Courses by Instructor
**GET** `/courses/instructor/:instructorId`

Retrieve all courses by a specific instructor.

### Path Parameters
- `instructorId` (string, required) - User ID

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "thumbnailUrl": "string | null",
      "level": "string",
      "rating": "number",
      "enrollmentCount": "number",
      "basePrice": "number",
      "salePrice": "number",
      "currency": "string",
      "isPublished": boolean
    }
  ]
}
```

---

### 2.2.7 Get Course by Slug
**GET** `/courses/:courseSlug`

Retrieve a specific course by its slug.

### Path Parameters
- `courseSlug` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "instructorId": "uuid | null",
    "categoryId": "number | null",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "shortDescription": "string | null",
    "whatYouWillLearn": "string[] | null",
    "requirements": "string[] | null",
    "targetAudience": "string[] | null",
    "thumbnailUrl": "string | null",
    "previewVideoUrl": "string | null",
    "level": "beginner|intermediate|advanced",
    "durationHours": "number",
    "rating": "number",
    "ratingCount": "number",
    "enrollmentCount": "number",
    "isFeatured": boolean,
    "tags": "string[] | null",
    "certificateAvailable": boolean,
    "basePrice": "number",
    "salePrice": "number",
    "currency": "string",
    "isPublished": boolean,
    "publishedAt": "string | null",
    "expiresAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string",
    "category": {
      "id": "number",
      "name": "string",
      "slug": "string"
    } | null,
    "instructor": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "profilePictureUrl": "string | null"
    } | null,
    "sections": [
      {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "description": "string | null",
        "orderIndex": "number",
        "isVisible": boolean,
        "isPreview": boolean,
        "lectures": [
          {
            "id": "uuid",
            "title": "string",
            "slug": "string",
            "description": "string | null",
            "orderIndex": "number",
            "contentType": "video|pdf|quiz|article",
            "contentUrl": "string | null",
            "durationSeconds": "number",
            "isPreview": boolean,
            "isFree": boolean,
            "articleContent": "string | null",
            "quizQuestions": "any[] | null",
            "attachmentUrl": "string | null",
            "thumbnailUrl": "string | null"
          }
        ]
      }
    ]
  }
}
```

---

### 2.2.8 Create Course
**POST** `/courses`

Create a new course. (Instructor/Admin only)

### Headers
```
Authorization: Bearer <token>
```

### Request Body
```typescript
{
  "title": "string (required, max 200)",
  "slug": "string (required, max 100, unique)",
  "description": "string (required, max 2000)",
  "shortDescription": "string (optional, max 500)",
  "whatYouWillLearn": "string (optional, max 1000)",
  "requirements": "string (optional, max 1000)",
  "targetAudience": "string (optional, max 1000)",
  "categoryId": "number (optional)",
  "instructorId": "string (optional, auto-assigned from token if not provided)",
  "basePrice": "number (optional, default: 0)",
  "salePrice": "number (optional, default: 0)",
  "level": "enum (optional, default: beginner)",
  "language": "enum (optional, default: english)",
  "durationMinutes": "number (optional, default: 0)",
  "lectureCount": "number (optional, default: 0)",
  "isPublished": "boolean (optional, default: false)",
  "isFeatured": "boolean (optional, default: false)",
  "hasCertificate": "boolean (optional, default: false)",
  "tags": "string (optional, max 100, comma-separated)",
  "thumbnailUrl": "string (optional, max 500)",
  "previewVideoUrl": "string (optional, max 500)",
  "courseUrl": "string (optional, max 500)",
  "externalUrl": "string (optional, max 500)",
  "publishedAt": "string (optional, ISO date)",
  "expiresAt": "string (optional, ISO date)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "uuid",
    "instructorId": "uuid",
    "categoryId": "number | null",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "shortDescription": "string | null",
    "whatYouWillLearn": "string[] | null",
    "requirements": "string[] | null",
    "targetAudience": "string[] | null",
    "thumbnailUrl": "string | null",
    "previewVideoUrl": "string | null",
    "level": "string",
    "durationHours": "number",
    "rating": "number",
    "ratingCount": "number",
    "enrollmentCount": "number",
    "isFeatured": boolean,
    "tags": "string[] | null",
    "certificateAvailable": boolean,
    "basePrice": "number",
    "salePrice": "number",
    "currency": "string",
    "isPublished": boolean,
    "publishedAt": "string | null",
    "expiresAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.2.9 Update Course
**PUT** `/courses/:courseSlug`

Update an existing course. (Instructor who owns the course or Admin only)

### Headers
```
Authorization: Bearer <token>
```

### Path Parameters
- `courseSlug` (string, required)

### Request Body
```typescript
{
  "title": "string (optional, max 200)",
  "slug": "string (optional, max 100)",
  "description": "string (optional, max 2000)",
  "shortDescription": "string (optional, max 500)",
  "whatYouWillLearn": "string (optional, max 1000)",
  "requirements": "string (optional, max 1000)",
  "targetAudience": "string (optional, max 1000)",
  "categoryId": "number (optional)",
  "instructorId": "string (optional)",
  "basePrice": "number (optional)",
  "salePrice": "number (optional)",
  "level": "enum (optional)",
  "language": "enum (optional)",
  "durationMinutes": "number (optional)",
  "lectureCount": "number (optional)",
  "isPublished": "boolean (optional)",
  "isFeatured": "boolean (optional)",
  "hasCertificate": "boolean (optional)",
  "tags": "string (optional, max 100)",
  "thumbnailUrl": "string (optional, max 500)",
  "previewVideoUrl": "string (optional, max 500)",
  "courseUrl": "string (optional, max 500)",
  "externalUrl": "string (optional, max 500)",
  "publishedAt": "string (optional, ISO date)",
  "expiresAt": "string (optional, ISO date)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": "uuid",
    "instructorId": "uuid",
    "categoryId": "number | null",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "shortDescription": "string | null",
    "whatYouWillLearn": "string[] | null",
    "requirements": "string[] | null",
    "targetAudience": "string[] | null",
    "thumbnailUrl": "string | null",
    "previewVideoUrl": "string | null",
    "level": "string",
    "durationHours": "number",
    "rating": "number",
    "ratingCount": "number",
    "enrollmentCount": "number",
    "isFeatured": boolean,
    "tags": "string[] | null",
    "certificateAvailable": boolean,
    "basePrice": "number",
    "salePrice": "number",
    "currency": "string",
    "isPublished": boolean,
    "publishedAt": "string | null",
    "expiresAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.2.10 Delete Course
**DELETE** `/courses/:courseSlug`

Delete a course. (Instructor who owns the course or Admin only)

### Headers
```
Authorization: Bearer <token>
```

### Path Parameters
- `courseSlug` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "message": "Course deleted successfully"
  }
}
```

---

## 2.3 Sections

### 2.3.1 Get All Sections
**GET** `/sections`

Retrieve all sections.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "courseId": "uuid",
      "orderIndex": "number",
      "isVisible": boolean,
      "isPreview": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.3.2 Get Section by ID
**GET** `/sections/:sectionId`

Retrieve a specific section by its ID.

### Path Parameters
- `sectionId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "courseId": "uuid",
    "orderIndex": "number",
    "isVisible": boolean,
    "isPreview": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.3.3 Get Sections by Course
**GET** `/sections/course/:courseId`

Retrieve all sections for a specific course.

### Path Parameters
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "courseId": "uuid",
      "orderIndex": "number",
      "isVisible": boolean,
      "isPreview": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.3.4 Create Section
**POST** `/sections`

Create a new section. (Instructor/Admin only)

### Request Body
```typescript
{
  "title": "string (required, max 200)",
  "slug": "string (required, max 100)",
  "description": "string (optional, max 2000)",
  "courseId": "number (required)",
  "orderIndex": "number (optional, default: 0)",
  "isVisible": "boolean (optional, default: true)",
  "isPreview": "boolean (optional, default: false)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Section created successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "courseId": "uuid",
    "orderIndex": "number",
    "isVisible": boolean,
    "isPreview": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.3.5 Update Section
**PUT** `/sections/:sectionId`

Update an existing section. (Instructor/Admin only)

### Path Parameters
- `sectionId` (string, required)

### Request Body
```typescript
{
  "title": "string (optional, max 200)",
  "slug": "string (optional, max 100)",
  "description": "string (optional, max 2000)",
  "courseId": "number (optional)",
  "orderIndex": "number (optional)",
  "isVisible": "boolean (optional)",
  "isPreview": "boolean (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Section updated successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "courseId": "uuid",
    "orderIndex": "number",
    "isVisible": boolean,
    "isPreview": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.3.6 Delete Section
**DELETE** `/sections/:sectionId`

Delete a section. (Instructor/Admin only)

### Path Parameters
- `sectionId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Section deleted successfully",
  "data": {
    "message": "Section deleted successfully"
  }
}
```

---

### 2.3.7 Reorder Sections
**POST** `/sections/:courseId/reorder`

Reorder sections for a course.

### Path Parameters
- `courseId` (string, required)

### Request Body
```typescript
{
  "sectionIds": "string[] (required) - Array of section IDs in desired order"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Sections reordered successfully",
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "courseId": "uuid",
      "orderIndex": "number",
      "isVisible": boolean,
      "isPreview": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

## 2.4 Lectures

### 2.4.1 Get All Lectures
**GET** `/lectures`

Retrieve all lectures.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "sectionId": "uuid",
      "orderIndex": "number",
      "contentType": "video|pdf|quiz|article",
      "contentUrl": "string | null",
      "durationSeconds": "number",
      "isPreview": boolean,
      "isFree": boolean,
      "articleContent": "string | null",
      "quizQuestions": "any[] | null",
      "attachmentUrl": "string | null",
      "thumbnailUrl": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.4.2 Get Lecture by ID
**GET** `/lectures/:lectureId`

Retrieve a specific lecture by its ID.

### Path Parameters
- `lectureId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "sectionId": "uuid",
    "orderIndex": "number",
    "contentType": "video|pdf|quiz|article",
    "contentUrl": "string | null",
    "durationSeconds": "number",
    "isPreview": boolean,
    "isFree": boolean,
    "articleContent": "string | null",
    "quizQuestions": "any[] | null",
    "attachmentUrl": "string | null",
    "thumbnailUrl": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.4.3 Get Lectures by Section
**GET** `/lectures/section/:sectionId`

Retrieve all lectures for a specific section.

### Path Parameters
- `sectionId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "sectionId": "uuid",
      "orderIndex": "number",
      "contentType": "video|pdf|quiz|article",
      "contentUrl": "string | null",
      "durationSeconds": "number",
      "isPreview": boolean,
      "isFree": boolean,
      "articleContent": "string | null",
      "quizQuestions": "any[] | null",
      "attachmentUrl": "string | null",
      "thumbnailUrl": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.4.4 Get Preview Lectures
**GET** `/lectures/course/:courseId/preview`

Retrieve preview lectures for a course.

### Path Parameters
- `courseId` (string, required)

### Query Parameters
- `limit` (number, optional, default: 5)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string | null",
      "sectionId": "uuid",
      "orderIndex": "number",
      "contentType": "video|pdf|quiz|article",
      "contentUrl": "string | null",
      "durationSeconds": "number",
      "isPreview": boolean,
      "isFree": boolean,
      "thumbnailUrl": "string | null"
    }
  ]
}
```

---

### 2.4.5 Create Lecture
**POST** `/lectures`

Create a new lecture. (Instructor/Admin only)

### Request Body
```typescript
{
  "title": "string (required, max 200)",
  "slug": "string (required, max 100)",
  "description": "string (optional, max 2000)",
  "sectionId": "number (required)",
  "orderIndex": "number (optional, default: 0)",
  "contentType": "enum (required) - video|pdf|quiz|article",
  "contentUrl": "string (optional, max 500)",
  "durationSeconds": "number (optional, default: 0)",
  "isPreview": "boolean (optional, default: false)",
  "isFree": "boolean (optional, default: false)",
  "articleContent": "string (optional, max 1000)",
  "quizQuestions": "any[] (optional)",
  "attachmentUrl": "string (optional, max 500)",
  "thumbnailUrl": "string (optional, max 500)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Lecture created successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "sectionId": "uuid",
    "orderIndex": "number",
    "contentType": "video|pdf|quiz|article",
    "contentUrl": "string | null",
    "durationSeconds": "number",
    "isPreview": boolean,
    "isFree": boolean,
    "articleContent": "string | null",
    "quizQuestions": "any[] | null",
    "attachmentUrl": "string | null",
    "thumbnailUrl": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.4.6 Update Lecture
**PUT** `/lectures/:lectureId`

Update an existing lecture. (Instructor/Admin only)

### Path Parameters
- `lectureId` (string, required)

### Request Body
```typescript
{
  "title": "string (optional, max 200)",
  "slug": "string (optional, max 100)",
  "description": "string (optional, max 2000)",
  "sectionId": "number (optional)",
  "orderIndex": "number (optional)",
  "contentType": "enum (optional)",
  "contentUrl": "string (optional, max 500)",
  "durationSeconds": "number (optional)",
  "isPreview": "boolean (optional)",
  "isFree": "boolean (optional)",
  "articleContent": "string (optional, max 1000)",
  "quizQuestions": "any[] (optional)",
  "attachmentUrl": "string (optional, max 500)",
  "thumbnailUrl": "string (optional, max 500)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Lecture updated successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string | null",
    "sectionId": "uuid",
    "orderIndex": "number",
    "contentType": "video|pdf|quiz|article",
    "contentUrl": "string | null",
    "durationSeconds": "number",
    "isPreview": boolean,
    "isFree": boolean,
    "articleContent": "string | null",
    "quizQuestions": "any[] | null",
    "attachmentUrl": "string | null",
    "thumbnailUrl": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.4.7 Delete Lecture
**DELETE** `/lectures/:lectureId`

Delete a lecture. (Instructor/Admin only)

### Path Parameters
- `lectureId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Lecture deleted successfully",
  "data": {
    "message": "Lecture deleted successfully"
  }
}
```

---

## 2.5 Reviews

### 2.5.1 Get All Reviews
**GET** `/reviews`

Retrieve all reviews.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "rating": "number (1-5)",
      "review": "string | null",
      "title": "string | null",
      "pros": "string | null",
      "cons": "string | null",
      "difficulty": "string | null",
      "valueForMoney": "string | null",
      "isVerified": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 2.5.2 Get Reviews by Course
**GET** `/reviews/course/:courseId`

Retrieve all reviews for a specific course.

### Path Parameters
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "rating": "number (1-5)",
      "review": "string | null",
      "title": "string | null",
      "pros": "string | null",
      "cons": "string | null",
      "difficulty": "string | null",
      "valueForMoney": "string | null",
      "isVerified": boolean,
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": "uuid",
        "fullName": "string",
        "profilePictureUrl": "string | null"
      }
    }
  ]
}
```

---

### 2.5.3 Get Reviews by User
**GET** `/reviews/user/:userId`

Retrieve all reviews by a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "rating": "number (1-5)",
      "review": "string | null",
      "title": "string | null",
      "isVerified": boolean,
      "createdAt": "string",
      "updatedAt": "string",
      "course": {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "thumbnailUrl": "string | null"
      }
    }
  ]
}
```

---

### 2.5.4 Get Course Rating
**GET** `/reviews/course/:courseId/rating`

Get average rating and total review count for a course.

### Path Parameters
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "rating": "number (average rating, 0-5)",
    "count": "number (total reviews)"
  }
}
```

---

### 2.5.5 Get Review by ID
**GET** `/reviews/:reviewId`

Retrieve a specific review by its ID.

### Path Parameters
- `reviewId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "rating": "number (1-5)",
    "review": "string | null",
    "title": "string | null",
    "pros": "string | null",
    "cons": "string | null",
    "difficulty": "string | null",
    "valueForMoney": "string | null",
    "isVerified": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.5.6 Create Review
**POST** `/reviews`

Create a new review for a course.

### Request Body
```typescript
{
  "rating": "number (required, 1-5)",
  "review": "string (optional, max 1000)",
  "courseId": "number (required)",
  "userId": "string (required)",
  "isVerified": "boolean (optional, default: false)",
  "title": "string (optional, max 100)",
  "pros": "string (optional, max 100)",
  "cons": "string (optional, max 100)",
  "difficulty": "string (optional, max 100)",
  "valueForMoney": "string (optional, max 100)",
  "createdAt": "string (optional, ISO date)",
  "updatedAt": "string (optional, ISO date)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "rating": "number",
    "review": "string | null",
    "title": "string | null",
    "pros": "string | null",
    "cons": "string | null",
    "difficulty": "string | null",
    "valueForMoney": "string | null",
    "isVerified": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.5.7 Update Review
**PUT** `/reviews/:reviewId`

Update an existing review.

### Path Parameters
- `reviewId` (string, required)

### Request Body
```typescript
{
  "rating": "number (optional, 1-5)",
  "review": "string (optional, max 1000)",
  "title": "string (optional, max 100)",
  "pros": "string (optional, max 100)",
  "cons": "string (optional, max 100)",
  "difficulty": "string (optional, max 100)",
  "valueForMoney": "string (optional, max 100)",
  "updatedAt": "string (optional, ISO date)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "rating": "number",
    "review": "string | null",
    "title": "string | null",
    "pros": "string | null",
    "cons": "string | null",
    "difficulty": "string | null",
    "valueForMoney": "string | null",
    "isVerified": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 2.5.8 Delete Review
**DELETE** `/reviews/:reviewId`

Delete a review.

### Path Parameters
- `reviewId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {
    "message": "Review deleted successfully"
  }
}
```

---

# 3. Identity Management Module

## 3.1 Users

### 3.1.1 Get All Users
**GET** `/users`

Retrieve all users. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "phoneNumber": "string | null",
      "dateOfBirth": "string | null",
      "profilePictureUrl": "string | null",
      "bio": "string | null",
      "timezone": "string | null",
      "languagePreference": "string",
      "emailVerifiedAt": "string | null",
      "lastLoginAt": "string | null",
      "isActive": boolean,
      "isInstructor": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 3.1.2 Get User by ID
**GET** `/users/:userId`

Retrieve a specific user by their ID.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "profilePictureUrl": "string | null",
    "bio": "string | null",
    "timezone": "string | null",
    "languagePreference": "string",
    "emailVerifiedAt": "string | null",
    "lastLoginAt": "string | null",
    "isActive": boolean,
    "isInstructor": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 3.1.3 Get User by Email
**GET** `/users/email/:email`

Retrieve a user by their email address.

### Path Parameters
- `email` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "profilePictureUrl": "string | null",
    "bio": "string | null",
    "timezone": "string | null",
    "languagePreference": "string",
    "emailVerifiedAt": "string | null",
    "lastLoginAt": "string | null",
    "isActive": boolean,
    "isInstructor": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 3.1.4 Create User
**POST** `/users`

Create a new user. (Admin only)

### Request Body
```typescript
{
  "email": "string (required, valid email)",
  "passwordHash": "string (required, min 6 chars)",
  "fullName": "string (required)",
  "phoneNumber": "string (optional)",
  "dateOfBirth": "string (optional, ISO date)",
  "profilePictureUrl": "string (optional)",
  "bio": "string (optional)",
  "timezone": "string (optional, max 50)",
  "languagePreference": "string (optional, default: en)",
  "isActive": "boolean (optional, default: true)",
  "isInstructor": "boolean (optional, default: false)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "profilePictureUrl": "string | null",
    "bio": "string | null",
    "timezone": "string | null",
    "languagePreference": "string",
    "emailVerifiedAt": "string | null",
    "lastLoginAt": "string | null",
    "isActive": boolean,
    "isInstructor": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 3.1.5 Update User
**PUT** `/users/:userId`

Update an existing user.

### Path Parameters
- `userId` (string, required)

### Request Body
```typescript
{
  "email": "string (optional, valid email)",
  "fullName": "string (optional)",
  "phoneNumber": "string (optional)",
  "dateOfBirth": "string (optional, ISO date)",
  "profilePictureUrl": "string (optional)",
  "bio": "string (optional)",
  "timezone": "string (optional, max 50)",
  "languagePreference": "string (optional)",
  "isActive": "boolean (optional)",
  "isInstructor": "boolean (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "phoneNumber": "string | null",
    "dateOfBirth": "string | null",
    "profilePictureUrl": "string | null",
    "bio": "string | null",
    "timezone": "string | null",
    "languagePreference": "string",
    "emailVerifiedAt": "string | null",
    "lastLoginAt": "string | null",
    "isActive": boolean,
    "isInstructor": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 3.1.6 Delete User
**DELETE** `/users/:userId`

Delete a user. (Admin only)

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "User deleted successfully"
  }
}
```

---

### 3.1.7 Update User Password
**PUT** `/users/:userId/password`

Update a user's password. (Admin only or user's own password)

### Path Parameters
- `userId` (string, required)

### Request Body
```typescript
{
  "passwordHash": "string (required, min 6 chars)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Password updated successfully"
  }
}
```

---

## 3.2 Roles

### 3.2.1 Get All Roles
**GET** `/roles`

Retrieve all roles.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```

---

### 3.2.2 Get Role by ID
**GET** `/roles/:id`

Retrieve a specific role by its ID.

### Path Parameters
- `id` (number, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.2.3 Get Role by Name
**GET** `/roles/name/:name`

Retrieve a role by its name.

### Path Parameters
- `name` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.2.4 Create Role
**POST** `/roles`

Create a new role. (Admin only)

### Request Body
```typescript
{
  "name": "string (required, max 50)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.2.5 Update Role
**PUT** `/roles/:id`

Update an existing role. (Admin only)

### Path Parameters
- `id` (number, required)

### Request Body
```typescript
{
  "name": "string (optional, max 50)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "number",
    "name": "string"
  }
}
```

---

### 3.2.6 Delete Role
**DELETE** `/roles/:id`

Delete a role. (Admin only)

### Path Parameters
- `id` (number, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Role deleted successfully"
  }
}
```

---

## 3.3 User Roles

### 3.3.1 Get All User Roles
**GET** `/user-roles`

Retrieve all user-role assignments.

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "roleId": "number",
      "assignedAt": "string"
    }
  ]
}
```

---

### 3.3.2 Get User Role by ID
**GET** `/user-roles/:id`

Retrieve a specific user-role assignment.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "roleId": "number",
    "assignedAt": "string"
  }
}
```

---

### 3.3.3 Get User Roles by User ID
**GET** `/user-roles/user/:userId`

Retrieve all roles assigned to a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "roleId": "number",
      "role": {
        "id": "number",
        "name": "string"
      },
      "assignedAt": "string"
    }
  ]
}
```

---

### 3.3.4 Get User Roles by Role ID
**GET** `/user-roles/role/:roleId`

Retrieve all users assigned to a specific role.

### Path Parameters
- `roleId` (number, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "roleId": "number",
      "user": {
        "id": "uuid",
        "email": "string",
        "fullName": "string"
      },
      "assignedAt": "string"
    }
  ]
}
```

---

### 3.3.5 Create User Role
**POST** `/user-roles`

Assign a role to a user. (Admin only)

### Request Body
```typescript
{
  "userId": "string (required)",
  "roleId": "number (required)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "roleId": "number",
    "assignedAt": "string"
  }
}
```

---

### 3.3.6 Update User Role
**PUT** `/user-roles/:id`

Update a user-role assignment. (Admin only)

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "userId": "string (optional)",
  "roleId": "number (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "roleId": "number",
    "assignedAt": "string"
  }
}
```

---

### 3.3.7 Delete User Role
**DELETE** `/user-roles/:id`

Remove a role from a user. (Admin only)

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "UserRole deleted successfully"
  }
}
```

---

### 3.3.8 Delete All User Roles
**DELETE** `/user-roles/user/:userId`

Remove all roles from a user. (Admin only)

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "UserRoles deleted successfully"
  }
}
```

---

### 3.3.9 Delete Role from All Users
**DELETE** `/user-roles/role/:roleId`

Remove a role from all users. (Admin only)

### Path Parameters
- `roleId` (number, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "UserRoles deleted successfully"
  }
}
```

---

## 3.4 Notifications

### 3.4.1 Get All Notifications
**GET** `/notifications`

Retrieve all notifications. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "title": "string",
      "message": "string",
      "type": "string",
      "isRead": boolean,
      "createdAt": "string"
    }
  ]
}
```

---

### 3.4.2 Get Notification by ID
**GET** `/notifications/:id`

Retrieve a specific notification by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "title": "string",
    "message": "string",
    "type": "string",
    "isRead": boolean,
    "createdAt": "string"
  }
}
```

---

### 3.4.3 Get User Notifications
**GET** `/notifications/user/:userId`

Retrieve all notifications for a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "title": "string",
      "message": "string",
      "type": "string",
      "isRead": boolean,
      "createdAt": "string"
    }
  ]
}
```

---

### 3.4.4 Create Notification
**POST** `/notifications`

Create a new notification.

### Request Body
```typescript
{
  "userId": "string (required)",
  "title": "string (required, max 255)",
  "message": "string (required)",
  "type": "string (required, max 50)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "title": "string",
    "message": "string",
    "type": "string",
    "isRead": boolean,
    "createdAt": "string"
  }
}
```

---

### 3.4.5 Update Notification
**PUT** `/notifications/:id`

Update an existing notification.

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "title": "string (optional, max 255)",
  "message": "string (optional)",
  "type": "string (optional, max 50)",
  "isRead": "boolean (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "title": "string",
    "message": "string",
    "type": "string",
    "isRead": boolean,
    "createdAt": "string"
  }
}
```

---

### 3.4.6 Delete Notification
**DELETE** `/notifications/:id`

Delete a notification.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Notification deleted successfully"
  }
}
```

---

### 3.4.7 Mark Notification as Read
**PUT** `/notifications/:id/read`

Mark a notification as read.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Notification marked as read"
  }
}
```

---

### 3.4.8 Mark All User Notifications as Read
**PUT** `/notifications/user/:userId/read`

Mark all notifications for a user as read.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "All notifications marked as read"
  }
}
```

---

# 4. Sales Module

## 4.1 Orders

### 4.1.1 Get All Orders
**GET** `/orders`

Retrieve all orders. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "orderNumber": "string (unique)",
      "userId": "uuid",
      "subtotalAmount": "number",
      "taxAmount": "number",
      "discountAmount": "number",
      "totalAmount": "number",
      "status": "pending|confirmed|completed|cancelled|refunded",
      "currency": "string (default: USD)",
      "paymentMethod": "string | null",
      "paymentTransactionId": "string | null",
      "paymentCompletedAt": "string | null",
      "notes": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 4.1.2 Get Order by ID
**GET** `/orders/:id`

Retrieve a specific order by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "string",
    "userId": "uuid",
    "subtotalAmount": "number",
    "taxAmount": "number",
    "discountAmount": "number",
    "totalAmount": "number",
    "status": "string",
    "currency": "string",
    "paymentMethod": "string | null",
    "paymentTransactionId": "string | null",
    "paymentCompletedAt": "string | null",
    "notes": "string | null",
    "createdAt": "string",
    "updatedAt": "string",
    "orderItems": [
      {
        "id": "uuid",
        "orderId": "uuid",
        "courseId": "uuid",
        "title": "string",
        "slug": "string | null",
        "unitPrice": "number",
        "quantity": "number",
        "totalAmount": "number",
        "status": "active|cancelled|refunded",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
}
```

---

### 4.1.3 Get Orders by User ID
**GET** `/orders/user/:userId`

Retrieve all orders for a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "orderNumber": "string",
      "userId": "uuid",
      "subtotalAmount": "number",
      "taxAmount": "number",
      "discountAmount": "number",
      "totalAmount": "number",
      "status": "string",
      "currency": "string",
      "paymentMethod": "string | null",
      "paymentTransactionId": "string | null",
      "paymentCompletedAt": "string | null",
      "notes": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 4.1.4 Get Order by Order Number
**GET** `/orders/number/:orderNumber`

Retrieve an order by its order number.

### Path Parameters
- `orderNumber` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "string",
    "userId": "uuid",
    "subtotalAmount": "number",
    "taxAmount": "number",
    "discountAmount": "number",
    "totalAmount": "number",
    "status": "string",
    "currency": "string",
    "paymentMethod": "string | null",
    "paymentTransactionId": "string | null",
    "paymentCompletedAt": "string | null",
    "notes": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.1.5 Create Order
**POST** `/orders`

Create a new order.

### Request Body
```typescript
{
  "userId": "string (required)",
  "subtotalAmount": "number (required)",
  "taxAmount": "number (optional, default: 0)",
  "discountAmount": "number (optional, default: 0)",
  "totalAmount": "number (required)",
  "status": "enum (optional, default: pending)",
  "currency": "string (optional, default: USD)",
  "paymentMethod": "string (optional)",
  "paymentTransactionId": "string (optional)",
  "paymentCompletedAt": "string (optional, ISO date)",
  "notes": "string (optional)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "string",
    "userId": "uuid",
    "subtotalAmount": "number",
    "taxAmount": "number",
    "discountAmount": "number",
    "totalAmount": "number",
    "status": "string",
    "currency": "string",
    "paymentMethod": "string | null",
    "paymentTransactionId": "string | null",
    "paymentCompletedAt": "string | null",
    "notes": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.1.6 Update Order
**PUT** `/orders/:id`

Update an existing order.

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "subtotalAmount": "number (optional)",
  "taxAmount": "number (optional)",
  "discountAmount": "number (optional)",
  "totalAmount": "number (optional)",
  "status": "enum (optional)",
  "currency": "string (optional)",
  "paymentMethod": "string (optional)",
  "paymentTransactionId": "string (optional)",
  "paymentCompletedAt": "string (optional, ISO date)",
  "notes": "string (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "string",
    "userId": "uuid",
    "subtotalAmount": "number",
    "taxAmount": "number",
    "discountAmount": "number",
    "totalAmount": "number",
    "status": "string",
    "currency": "string",
    "paymentMethod": "string | null",
    "paymentTransactionId": "string | null",
    "paymentCompletedAt": "string | null",
    "notes": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.1.7 Delete Order
**DELETE** `/orders/:id`

Delete an order. (Admin only)

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Order deleted successfully"
  }
}
```

---

## 4.2 Enrollments

### 4.2.1 Get All Enrollments
**GET** `/enrollments`

Retrieve all enrollments. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "couponId": "uuid | null",
      "paidAmount": "number | null",
      "status": "active|completed|dropped",
      "enrolledAt": "string | null",
      "completedAt": "string | null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 4.2.2 Get Enrollment by ID
**GET** `/enrollments/:id`

Retrieve a specific enrollment by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "couponId": "uuid | null",
    "paidAmount": "number | null",
    "status": "string",
    "enrolledAt": "string | null",
    "completedAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.2.3 Get Enrollments by User ID
**GET** `/enrollments/user/:userId`

Retrieve all enrollments for a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "couponId": "uuid | null",
      "paidAmount": "number | null",
      "status": "string",
      "enrolledAt": "string | null",
      "completedAt": "string | null",
      "createdAt": "string",
      "updatedAt": "string",
      "course": {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "thumbnailUrl": "string | null"
      }
    }
  ]
}
```

---

### 4.2.4 Get Enrollments by Course ID
**GET** `/enrollments/course/:courseId`

Retrieve all enrollments for a specific course.

### Path Parameters
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "couponId": "uuid | null",
      "paidAmount": "number | null",
      "status": "string",
      "enrolledAt": "string | null",
      "completedAt": "string | null",
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": "uuid",
        "email": "string",
        "fullName": "string"
      }
    }
  ]
}
```

---

### 4.2.5 Create Enrollment
**POST** `/enrollments`

Create a new enrollment.

### Request Body
```typescript
{
  "userId": "string (required)",
  "courseId": "string (required)",
  "couponId": "string (optional)",
  "paidAmount": "number (optional)",
  "status": "enum (optional, default: active)",
  "enrolledAt": "string (optional, ISO date)",
  "completedAt": "string (optional, ISO date)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "couponId": "uuid | null",
    "paidAmount": "number | null",
    "status": "string",
    "enrolledAt": "string | null",
    "completedAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.2.6 Update Enrollment
**PUT** `/enrollments/:id`

Update an existing enrollment.

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "userId": "string (optional)",
  "courseId": "string (optional)",
  "couponId": "string (optional)",
  "paidAmount": "number (optional)",
  "status": "enum (optional)",
  "enrolledAt": "string (optional, ISO date)",
  "completedAt": "string (optional, ISO date)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "couponId": "uuid | null",
    "paidAmount": "number | null",
    "status": "string",
    "enrolledAt": "string | null",
    "completedAt": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.2.7 Delete Enrollment
**DELETE** `/enrollments/:id`

Delete an enrollment.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Enrollment deleted successfully"
  }
}
```

---

## 4.3 Coupons

### 4.3.1 Get All Coupons
**GET** `/coupons`

Retrieve all coupons. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "code": "string (unique)",
      "name": "string | null",
      "description": "string | null",
      "discountPercent": "number (0-100)",
      "discountAmount": "number | null",
      "usageLimit": "number",
      "usageCount": "number",
      "validFrom": "string | null",
      "validUntil": "string | null",
      "isActive": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 4.3.2 Get Coupon by ID
**GET** `/coupons/:id`

Retrieve a specific coupon by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "string",
    "name": "string | null",
    "description": "string | null",
    "discountPercent": "number",
    "discountAmount": "number | null",
    "usageLimit": "number",
    "usageCount": "number",
    "validFrom": "string | null",
    "validUntil": "string | null",
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.3.3 Get Coupon by Code
**GET** `/coupons/code/:code`

Retrieve a coupon by its code.

### Path Parameters
- `code` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "string",
    "name": "string | null",
    "description": "string | null",
    "discountPercent": "number",
    "discountAmount": "number | null",
    "usageLimit": "number",
    "usageCount": "number",
    "validFrom": "string | null",
    "validUntil": "string | null",
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.3.4 Create Coupon
**POST** `/coupons`

Create a new coupon. (Admin only)

### Request Body
```typescript
{
  "code": "string (required, max 50, unique)",
  "name": "string (optional, max 100)",
  "description": "string (optional)",
  "discountPercent": "number (required, 0-100)",
  "discountAmount": "number (optional)",
  "usageLimit": "number (optional, default: 0 = unlimited)",
  "usageCount": "number (optional, default: 0)",
  "validFrom": "string (optional, ISO date)",
  "validUntil": "string (optional, ISO date)",
  "isActive": "boolean (optional, default: true)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "message": "Coupon created successfully",
  "data": {
    "id": "uuid",
    "code": "string",
    "name": "string | null",
    "description": "string | null",
    "discountPercent": "number",
    "discountAmount": "number | null",
    "usageLimit": "number",
    "usageCount": "number",
    "validFrom": "string | null",
    "validUntil": "string | null",
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.3.5 Update Coupon
**PUT** `/coupons/:id`

Update an existing coupon. (Admin only)

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "code": "string (optional, max 50)",
  "name": "string (optional, max 100)",
  "description": "string (optional)",
  "discountPercent": "number (optional, 0-100)",
  "discountAmount": "number (optional)",
  "usageLimit": "number (optional)",
  "usageCount": "number (optional)",
  "validFrom": "string (optional, ISO date)",
  "validUntil": "string (optional, ISO date)",
  "isActive": "boolean (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "message": "Coupon updated successfully",
  "data": {
    "id": "uuid",
    "code": "string",
    "name": "string | null",
    "description": "string | null",
    "discountPercent": "number",
    "discountAmount": "number | null",
    "usageLimit": "number",
    "usageCount": "number",
    "validFrom": "string | null",
    "validUntil": "string | null",
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.3.6 Delete Coupon
**DELETE** `/coupons/:id`

Delete a coupon. (Admin only)

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Coupon deleted successfully"
  }
}
```

---

### 4.3.7 Validate Coupon
**GET** `/coupons/validate/:code`

Validate a coupon code to check if it's applicable.

### Path Parameters
- `code` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "string",
    "name": "string | null",
    "description": "string | null",
    "discountPercent": "number",
    "discountAmount": "number | null",
    "usageLimit": "number",
    "usageCount": "number",
    "validFrom": "string | null",
    "validUntil": "string | null",
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**404 Not Found** - If coupon is invalid or expired

---

## 4.4 Wishlists

### 4.4.1 Get All Wishlists
**GET** `/wishlists`

Retrieve all wishlists. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "addedAt": "string"
    }
  ]
}
```

---

### 4.4.2 Get Wishlist by ID
**GET** `/wishlists/:id`

Retrieve a specific wishlist item by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "addedAt": "string"
  }
}
```

---

### 4.4.3 Get User Wishlist
**GET** `/wishlists/user/:userId`

Retrieve all wishlist items for a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "addedAt": "string",
      "course": {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "description": "string | null",
        "thumbnailUrl": "string | null",
        "basePrice": "number",
        "salePrice": "number",
        "currency": "string",
        "rating": "number",
        "enrollmentCount": "number"
      }
    }
  ]
}
```

---

### 4.4.4 Get Course Wishlist Count
**GET** `/wishlists/course/:courseId`

Retrieve all wishlist items for a specific course.

### Path Parameters
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "addedAt": "string",
      "user": {
        "id": "uuid",
        "email": "string",
        "fullName": "string"
      }
    }
  ]
}
```

---

### 4.4.5 Add to Wishlist
**POST** `/wishlists`

Add a course to a user's wishlist.

### Request Body
```typescript
{
  "userId": "string (required)",
  "courseId": "string (required)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "addedAt": "string"
  }
}
```

---

### 4.4.6 Remove from Wishlist
**DELETE** `/wishlists/:id`

Remove an item from the wishlist.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Wishlist deleted successfully"
  }
}
```

---

### 4.4.7 Remove Course from User Wishlist
**DELETE** `/wishlists/user/:userId/course/:courseId`

Remove a specific course from a user's wishlist.

### Path Parameters
- `userId` (string, required)
- `courseId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Wishlist deleted successfully"
  }
}
```

---

## 4.5 Progress

### 4.5.1 Get All Progress
**GET** `/progress`

Retrieve all progress records. (Admin only)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "lectureId": "uuid",
      "completed": boolean,
      "completionTime": "string | null",
      "watchTimeSeconds": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### 4.5.2 Get Progress by ID
**GET** `/progress/:id`

Retrieve a specific progress record by its ID.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "lectureId": "uuid",
    "completed": boolean,
    "completionTime": "string | null",
    "watchTimeSeconds": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.5.3 Get User Progress
**GET** `/progress/user/:userId`

Retrieve all progress records for a specific user.

### Path Parameters
- `userId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "lectureId": "uuid",
      "completed": boolean,
      "completionTime": "string | null",
      "watchTimeSeconds": "number",
      "createdAt": "string",
      "updatedAt": "string",
      "lecture": {
        "id": "uuid",
        "title": "string",
        "slug": "string",
        "contentType": "video|pdf|quiz|article",
        "durationSeconds": "number"
      }
    }
  ]
}
```

---

### 4.5.4 Get Lecture Progress
**GET** `/progress/lecture/:lectureId`

Retrieve all progress records for a specific lecture.

### Path Parameters
- `lectureId` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "lectureId": "uuid",
      "completed": boolean,
      "completionTime": "string | null",
      "watchTimeSeconds": "number",
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": "uuid",
        "email": "string",
        "fullName": "string"
      }
    }
  ]
}
```

---

### 4.5.5 Create Progress
**POST** `/progress`

Create a new progress record.

### Request Body
```typescript
{
  "userId": "string (required)",
  "lectureId": "string (required)",
  "completed": "boolean (optional, default: false)",
  "completionTime": "string (optional, ISO date)",
  "watchTimeSeconds": "number (optional, default: 0)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "lectureId": "uuid",
    "completed": boolean,
    "completionTime": "string | null",
    "watchTimeSeconds": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.5.6 Update Progress
**PUT** `/progress/:id`

Update an existing progress record.

### Path Parameters
- `id` (string, required)

### Request Body
```typescript
{
  "userId": "string (optional)",
  "lectureId": "string (optional)",
  "completed": "boolean (optional)",
  "completionTime": "string (optional, ISO date)",
  "watchTimeSeconds": "number (optional)"
}
```

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "lectureId": "uuid",
    "completed": boolean,
    "completionTime": "string | null",
    "watchTimeSeconds": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

### 4.5.7 Delete Progress
**DELETE** `/progress/:id`

Delete a progress record.

### Path Parameters
- `id` (string, required)

### Response
**200 OK**

```typescript
{
  "success": true,
  "data": {
    "message": "Progress deleted successfully"
  }
}
```

---

### 4.5.8 Mark Lecture as Completed
**POST** `/progress/complete`

Mark a lecture as completed for a user.

### Request Body
```typescript
{
  "userId": "string (required)",
  "lectureId": "string (required)"
}
```

### Response
**201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "lectureId": "uuid",
    "completed": true,
    "completionTime": "string",
    "watchTimeSeconds": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

# 5. Common Response Codes

## Success Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully

## Error Codes
- `400 Bad Request` - Invalid request parameters or body
- `401 Unauthorized` - Authentication required or token invalid
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Standard Error Response
```typescript
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

---

# 6. Notes

1. **Authentication**: All endpoints except `/auth/register` and `/auth/login` require a valid JWT token in the Authorization header.
2. **Role-based Access**: Certain endpoints require specific roles (Admin, Instructor, Student). These are enforced by the application.
3. **Pagination**: For endpoints that return lists, pagination is supported via `page` and `limit` query parameters.
4. **Date Format**: All dates are returned in ISO 8601 format (UTC).
5. **UUIDs**: All IDs are UUIDs unless specified otherwise (some legacy IDs may be numbers).
6. **Enums**: Enum values are case-sensitive and should match the specified values exactly.
7. **Soft Deletes**: Some entities may support soft deletes (isActive flag) rather than hard deletes.
8. **Validation**: All request bodies are validated using class-validator decorators. Invalid requests will return 422 with validation errors.

---

# 7. Quick Reference

## Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Profile: `GET /auth/profile`
- Refresh: `POST /auth/refresh-token`

## Catalog
- Categories: `GET|POST|PUT|DELETE /categories`
- Courses: `GET|POST|PUT|DELETE /courses`
- Sections: `GET|POST|PUT|DELETE /sections`
- Lectures: `GET|POST|PUT|DELETE /lectures`
- Reviews: `GET|POST|PUT|DELETE /reviews`

## Identity
- Users: `GET|POST|PUT|DELETE /users`
- Roles: `GET|POST|PUT|DELETE /roles`
- User Roles: `GET|POST|PUT|DELETE /user-roles`
- Notifications: `GET|POST|PUT|DELETE /notifications`

## Sales
- Orders: `GET|POST|PUT|DELETE /orders`
- Enrollments: `GET|POST|PUT|DELETE /enrollments`
- Coupons: `GET|POST|PUT|DELETE|GET /coupons/validate/:code`
- Wishlists: `GET|POST|DELETE /wishlists`
- Progress: `GET|POST|PUT|DELETE /progress` + `POST /progress/complete`

---

**Last Updated**: 2025-02-26
**API Version**: 1.0
**Base Path**: `/api`
