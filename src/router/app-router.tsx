import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Lazy load layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

// Lazy load pages
const Home = lazy(() => import("@/pages/home"))
const CourseDetailPage = lazy(() => import("@/pages/CourseDetail"))
const SearchCoursesPage = lazy(() => import("@/pages/SearchCourses"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"))
const NotFound = lazy(() => import("@/pages/NotFound"))

// Dashboard pages
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics"))
const MyLearningsPage = lazy(() => import("@/pages/dashboard/MyLearnings"))
const WishlistPage = lazy(() => import("@/pages/dashboard/wishlist"))
const TransactionsPage = lazy(() => import("@/pages/dashboard/transactions"))
const SettingsPage = lazy(() => import("@/pages/dashboard/settings"))

import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { GuestRoute } from "@/features/auth/GuestRoute"

// Loading fallback component
const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
)

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" Component={MainLayout}>
                        <Route index Component={Home} />
                        <Route path="course/:id" Component={CourseDetailPage} />
                        <Route path="search" Component={SearchCoursesPage} />

                        <Route path="*" Component={NotFound} />
                    </Route>

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" Component={DashboardLayout} >
                            <Route index Component={AnalyticsPage} />
                            <Route path="my-learnings" Component={MyLearningsPage} />
                            <Route path="whishlist" Component={WishlistPage} />
                            <Route path="transactions" Component={TransactionsPage} />
                            <Route path="settings" Component={SettingsPage} />
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
