
import { useGetUserQuery } from '@/features/auth/authApi'
import HeroPresenter from '@/components/features/HeroPresenter'

const HeroContainer = () => {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <HeroPresenter />
    )
}

export default HeroContainer