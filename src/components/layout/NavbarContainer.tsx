import { useGetUserQuery } from "@/features/auth/authApi";
import NavbarPresenter from "@/components/layout/NavbarPresenter";

const NavbarContainer = () => {
    const { data } = useGetUserQuery()
    const isAuthenticated = !!data;
    return (
        <NavbarPresenter isLogin={isAuthenticated} data={data} />
    )
}

export default NavbarContainer;