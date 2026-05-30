import FooterPresenter from '@/components/common/Footer'
import { AppNavbar } from '@/components/features/AppNavbar'
import CookieBanner from '@/components/common/CookieBanner'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <AppNavbar />
            <CookieBanner />
            <Outlet />
            <FooterPresenter />
        </div>
    )
}

export default MainLayout