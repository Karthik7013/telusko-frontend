import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
    username: z.string(),
    password: z.string().min(1, "Password is required"),
    expiresInMins: z.number().optional()
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    const [handleLoginSubmit] = useLoginMutation();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form

    async function onSubmit(data: LoginFormValues) {
        try {
            const response = await handleLoginSubmit(data).unwrap();
            console.log(response)
            toast.success("Welcome back!", {
                description: "You have successfully logged in.",
            })
            if (response.accessToken && response.refreshToken) {
                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('refreshToken', response.refreshToken)
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error)
            toast.error('failed to authenticate')

        }
    }

    return (
        <div className={cn("w-full flex flex-col gap-6 max-w-sm mx-auto", className)} {...props}>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup className="space-y-4">

                            {/* Email Field */}
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    {...register("username")}
                                    aria-invalid={!!errors.username}
                                />
                                {errors.username && (
                                    <FieldError>{errors.username.message}</FieldError>
                                )}
                            </Field>

                            {/* Password Field */}
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="text-xs text-primary underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
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
                            <div className="flex flex-col gap-3 pt-2">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                                <Button variant="outline" type="button" className="w-full">
                                    Login with Google
                                </Button>
                            </div>

                        </FieldGroup>

                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4 hover:text-primary">
                                Sign up
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}