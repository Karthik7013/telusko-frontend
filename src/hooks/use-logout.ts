import { useNavigate } from "react-router-dom";
import { authApi } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        // 1. Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // 2. Clear Redux state
        dispatch(authApi.util.resetApiState());

        // 3. Redirect to login page
        navigate('/auth/login', { replace: true });
    };

    return logout;
};
