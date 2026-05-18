import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/features/auth/authApi"

// 1. Login Validation Schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required")
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
}: React.ComponentProps<"div">) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form

    const isLoggingIn = isSubmitting || isLoading;

    async function onSubmit(userData: LoginFormValues) {
        try {
            const response = await login(userData).unwrap();
            if (response.data?.accessToken && response.data?.refreshToken) {
                toast.success("Welcome back!", {
                    description: "You have successfully logged in."
                })
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                navigate('/dashboard');
            } else {
                toast.error("Login Failed", {
                    description: "Authentication tokens were not provided.",
                })
            }
        } catch (error: any) {
            toast.error("Login Failed", {
                description: error.data?.message || "Please check your credentials and try again.",
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup className="">

                    {/* Email Field */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            placeholder="m@example.com"
                            {...register("email")}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <FieldError>{errors.email.message}</FieldError>
                        )}
                    </Field>

                    {/* Password Field */}
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-primary underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                            <FieldError>{errors.password.message}</FieldError>
                        )}
                    </Field>

                    {/* Action Buttons */}
                    <div className="">
                        <Button type="submit" className="w-full" disabled={isLoggingIn}>
                            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoggingIn ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </FieldGroup>
            </form>

        </div>
    )
}