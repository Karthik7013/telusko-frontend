import { SignupForm } from '@/components/features/SignupForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='bg-primary/10'>
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
            <SignupForm />
        </div>
    )
}

export default Signup