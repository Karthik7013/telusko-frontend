import { useMeQuery } from "@/features/identity/identityApi";
import NavbarPresenter from "@/components/features/NavbarPresenter";

const NavbarContainer = () => {
    const { data } = useMeQuery(undefined)
    const isAuthenticated = !!data;
    return (
        <NavbarPresenter isLogin={isAuthenticated} />
    )
}

export default NavbarContainer;