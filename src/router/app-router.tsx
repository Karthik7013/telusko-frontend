import { lazy, Suspense } from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

// Auth guard components
import { ProtectedRoute } from "@/auth/components/ProtectedRoute"
import PageLoader from "@/components/common/PageLoader"
// import { useSelector } from "react-redux"
// import { RootState } from "@/store/store"

// Lazy load layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"))

// Lazy load pages
const Home = lazy(() => import("@/landing/pages/Home"))
const Login = lazy(() => import("@/auth/pages/Login"))
const Signup = lazy(() => import("@/auth/pages/Signup"))
const NotFound = lazy(() => import("@/components/common/NoRouteMatch"))
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

// Onboarding
// const OnboardingPage = lazy(() => import("@/onboarding/pages/OnboardingPage"))



const AppRouter = () => {
    // const isLogin = !!useSelector((state: RootState) => state.auth.accessToken); // get access token from store
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
                            <Route path="whishlist" element={<WishlistPage />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="course-player" element={<CoursePlayer />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Route>

                    {/* Public Auth Routes */}
                    <Route path="auth" element={<Outlet />}>
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
