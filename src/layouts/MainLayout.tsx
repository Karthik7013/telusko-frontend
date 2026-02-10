import FooterPresenter from '@/components/layout/Footer'
import NavbarContainer from '@/components/layout/NavbarContainer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <NavbarContainer />
            <Outlet />
            <FooterPresenter />
        </div>
    )
}

export default MainLayout