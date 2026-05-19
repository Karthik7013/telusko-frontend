import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Auth guard components
import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { GuestRoute } from "@/features/auth/GuestRoute"
import PageLoader from "@/components/common/Loader"

// Lazy load layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/auth/pages/Login"))
const Signup = lazy(() => import("@/auth/pages/Signup"))
const NotFound = lazy(() => import("@/components/common/NotFound"))
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
const CoursePlayer = lazy(() => import("@/dashboard/pages/CoursePlayer"))

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
                        <Route path="" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRouter
