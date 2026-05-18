import FooterPresenter from '@/components/features/Footer'
import NavbarContainer from '@/components/features/NavbarContainer'
import CookieBanner from '@/components/common/CookieBanner'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='pt-10'>
            <NavbarContainer />
            <CookieBanner />
            <Outlet />
            <FooterPresenter />
        </div>
    )
}

export default MainLayout