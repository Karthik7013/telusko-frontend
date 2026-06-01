// src/auth/hooks/useAuthStatus.ts
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Custom hook to check the authentication status of the user.
 * @returns {boolean} True if the user is logged in (has an accessToken), false otherwise.
 */
export const useAuthStatus = (): boolean => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    return !!accessToken;
};
