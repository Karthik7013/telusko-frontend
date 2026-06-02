import Footer from '@/components/common/Footer'
import { AppNavbar } from '@/components/layout/AppNavbar'
// import CookieBanner from '@/components/common/CookieBanner'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <AppNavbar />
            {/* <CookieBanner /> */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout