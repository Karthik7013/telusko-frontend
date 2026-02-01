import FooterPresenter from '@/components/footer'
import NavbarContainer from '@/components/navbar-container'
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