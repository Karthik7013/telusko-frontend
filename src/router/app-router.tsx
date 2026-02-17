import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Lazy load layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

// Lazy load pages
const Home = lazy(() => import("../pages/Home"))
// const CourseDetailPage = lazy(() => import("@/pages/CourseDetail"))
// const SearchCoursesPage = lazy(() => import("@/pages/SearchCourses"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"))
const NotFound = lazy(() => import("@/pages/NotFound"))

// Dashboard pages
const AnalyticsPage = lazy(() => import("../pages/dashboard/Analytics"))
const MyLearningsPage = lazy(() => import("../pages/dashboard/MyLearnings"))
const WishlistPage = lazy(() => import("../pages/dashboard/Wishlist"))
// const TransactionsPage = lazy(() => import("@/pages/dashboard/Transactions"))
const SettingsPage = lazy(() => import("../pages/dashboard/Settings"))

import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { GuestRoute } from "@/features/auth/GuestRoute"
import CoursePlayer from "@/pages/dashboard/CoursePlayer"
import PageLoader from "@/components/common/PageLoader"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" Component={MainLayout}>
                        <Route index Component={Home} />
                        {/* <Route path="course/:id" Component={CourseDetailPage} /> */}
                        {/* <Route path="search" Component={SearchCoursesPage} /> */}
                        <Route path="*" Component={NotFound} />
                    </Route>

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" Component={DashboardLayout} >
                            <Route index Component={AnalyticsPage} />
                            <Route path="my-learnings" Component={MyLearningsPage} />
                            <Route path="wishlist" Component={WishlistPage} />
                            {/* <Route path="transactions" Component={TransactionsPage} /> */}
                            <Route path="settings" Component={SettingsPage} />
                            <Route path="course-player" Component={CoursePlayer} />
                            <Route path="*" Component={NotFound} />
                        </Route>
                    </Route>

                    {/* Public Auth Routes */}
                    <Route element={<GuestRoute />}>
                        <Route path="/login" Component={Login} />
                        <Route path="/signup" Component={Signup} />
                        <Route path="/forgot-password" Component={ForgotPassword} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRouter
