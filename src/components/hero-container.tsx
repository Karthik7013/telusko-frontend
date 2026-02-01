
import { useGetUserQuery } from '@/features/auth/authApi'
import HeroPresenter from './hero-presenter'

const HeroContainer = () => {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <HeroPresenter />
    )
}

export default HeroContainer