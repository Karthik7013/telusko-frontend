import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Auth guard components
import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { GuestRoute } from "@/features/auth/GuestRoute"
import PageLoader from "@/components/common/PageLoader"

// Lazy load layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const Settings = lazy(() => import("@/pages/dashboard/Settings"))

// Lazy load course-related pages
const CourseDetailPage = lazy(() => import("@/pages/CourseDetail"))
const SearchCoursesPage = lazy(() => import("@/pages/SearchCourses"))

// Dashboard pages
const AnalyticsPage = lazy(() => import("@/pages/dashboard/Analytics"))
const MyLearningsPage = lazy(() => import("@/pages/dashboard/MyLearnings"))
const CoursePlayer = lazy(() => import("@/pages/dashboard/CoursePlayer"))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="course/:courseSlug" element={<CourseDetailPage />} />
                        <Route path="search" element={<SearchCoursesPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<AnalyticsPage />} />
                            <Route path="my-learnings" element={<MyLearningsPage />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="course-player" element={<CoursePlayer />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Route>

                    {/* Public Auth Routes */}
                    <Route path="auth" element={<GuestRoute />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRouter
