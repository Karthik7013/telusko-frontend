import { LoginForm } from '@/components/features/LoginForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='h-svh flex flex-col'>
            {/* Top Branding Bar */}
            <header>
                <div className="flex h-16 items-center px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <GraduationCap className="size-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Telusko</span>
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