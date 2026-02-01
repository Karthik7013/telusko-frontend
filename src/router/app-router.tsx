import CourseDetailPage from "@/components/course-detail"
import DashboardLayout from "@/layouts/DashboardLayout"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/home"
import Login from "@/pages/Login"
import NotFound from "@/pages/not-found"
import Signup from "@/pages/Signup"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { GuestRoute } from "@/components/auth/guest-route"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={MainLayout}>
                    <Route index Component={Home} />
                    <Route path="course/:id" Component={CourseDetailPage} />
                    <Route path="search" element={<>search</>} />
                    <Route path="*" Component={NotFound} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" Component={DashboardLayout} >
                        <Route index element={<>analytics</>} />
                        <Route path="my-learnings" element={<>my-courses</>} />
                        <Route path="whishlist" element={<>whishlist</>} />
                        <Route path="transactions" element={<>transactions</>} />
                        <Route path="settings" element={<>settings</>} />
                        <Route path="*" Component={NotFound} />
                    </Route>
                </Route>

                {/* Public Auth Routes */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" Component={Login} />
                    <Route path="/signup" Component={Signup} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter