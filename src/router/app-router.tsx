import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"

// Auth guard components
import { ProtectedRoute } from "@/auth/components/ProtectedRoute"
import PageLoader from "@/components/common/PageLoader"
import Onboarding from "@/onboarding/pages/Onboarding"

// Sync load critical components to avoid "chunky" navigation UI
import MainLayout from "@/layouts/MainLayout"
import Home from "@/landing/pages/Home"
import Login from "@/auth/pages/Login"
import Signup from "@/auth/pages/Signup"
import NotFound from "@/components/common/NoRouteMatch"

import { useAuthStatus } from "@/hooks/useAuthStatus";

// Lazy load layouts
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

const Settings = lazy(() => import("@/dashboard/pages/Settings"))

// Lazy load course-related pages
const CourseDetailPage = lazy(() => import("@/course/pages/CourseDetail"))
const SearchCoursesPage = lazy(() => import("@/course/pages/SearchCourses"))

// Lazy load checkout pages
const CartPage = lazy(() => import("@/checkout/pages/Cart"))
const CheckoutPage = lazy(() => import("@/checkout/pages/Checkout"))
const OrderSuccessPage = lazy(() => import("@/checkout/pages/OrderSuccess"))
const OrderFailurePage = lazy(() => import("@/checkout/pages/OrderFailure"))

// Dashboard pages
const AnalyticsPage = lazy(() => import("@/dashboard/pages/Dashboard"))
const MyLearningsPage = lazy(() => import("@/dashboard/pages/MyLearnings"))
const TransactionsPage = lazy(() => import("@/dashboard/pages/Transactions"))
const WishlistPage = lazy(() => import("@/dashboard/pages/Wishlist"))
const CoursePlayer = lazy(() => import("@/dashboard/pages/CoursePlayer"))

// Redirects authenticated users away from auth pages (login/signup)
const PublicRoute = () => {
    const isLogin = useAuthStatus(); // Use the custom hook
    return isLogin ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

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
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="order/success" element={<OrderSuccessPage />} />
                        <Route path="order/failure" element={<OrderFailurePage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute requiredRole={'student'} />}>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<AnalyticsPage />} />
                            <Route path="my-learnings" element={<MyLearningsPage />} />
                            <Route path="transactions" element={<TransactionsPage />} />
                            <Route path="wishlist" element={<WishlistPage />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="course-player" element={<CoursePlayer />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route path="onboarding" element={<Onboarding />} />
                    </Route>


                    {/* Public Auth Routes */}
                    <Route path="auth" element={<PublicRoute />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter >
    )
}

export default AppRouter
