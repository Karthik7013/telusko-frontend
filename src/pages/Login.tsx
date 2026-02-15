import { LoginForm } from '@/components/features/LoginForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='h-svh flex flex-col'>
            {/* Top Branding Bar */}
            <header>
                <div className="flex h-16 items-center px-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl tracking-tight">Telusko</span>
                    </Link>
                </div>
            </header>

            {/* Login Form Container */}
            <div className='flex-1 flex items-center justify-center'>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login