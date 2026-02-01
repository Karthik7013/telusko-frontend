import { useGetUserQuery } from "@/features/auth/authApi";
import LatestCoursePresenter from "./latest-course-presenter"

const LatestCourseContainer = () => {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <LatestCoursePresenter />
    )
}

export default LatestCourseContainer