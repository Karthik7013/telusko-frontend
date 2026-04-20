import { LoginForm } from '@/components/features/LoginForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='h-svh flex flex-col bg-primary/10'>
            {/* Top Branding Bar */}
            <header>
                <div className="flex h-16 items-center px-4">
                
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-0.5 rounded-lg">
                            <GraduationCap className=" size-8 text-primary" />
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