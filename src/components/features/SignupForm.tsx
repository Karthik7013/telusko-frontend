"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

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
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// 1. Enhanced Validation Schema
const formSchema = z.object({
    full_name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50),
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Sets the error to this specific field
})

import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useSignUpMutation } from "@/features/auth/authApi"

export function SignupForm({ className, ...props }: React.ComponentProps<typeof Card>) {
    const navigate = useNavigate()
    const [signUp, { isLoading: isRegistering }] = useSignUpMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    })

    const { register, handleSubmit, formState: { errors } } = form

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const [firstName, ...lastNameParts] = data.full_name.split(' ');
            const lastName = lastNameParts.join(' ') || 'User';

            await signUp({
                firstName,
                lastName,
                email: data.email,
                username: data.email.split('@')[0], // Mock username
                password: data.password
            }).unwrap();

            toast.success("Account created successfully!", {
                description: `Welcome, ${firstName}! Please sign in to continue.`,
            })

            navigate('/login');
        } catch (error: any) {
            toast.error("Signup failed", {
                description: error.data?.message || "Something went wrong during registration.",
            })
        }
    }

    const isSubmitting = isRegistering || form.formState.isSubmitting;

    return (
        <div className={cn("w-full flex flex-col gap-6 max-w-xs lg:max-w-sm mx-auto", className)} {...props}>
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to Home
                </Link>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup className="">

                            {/* Full Name */}
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input
                                    placeholder="John Doe"
                                    {...register("full_name")}
                                    aria-invalid={!!errors.full_name}
                                />
                                {errors.full_name && <FieldError>{errors.full_name.message}</FieldError>}
                            </Field>

                            {/* Email */}
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <FieldError>{errors.email.message}</FieldError>}
                            </Field>

                            {/* Password */}
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    type="password"
                                    {...register("password")}
                                    aria-invalid={!!errors.password}
                                />
                                <FieldDescription>Min. 8 characters with 1 number.</FieldDescription>
                                {errors.password && <FieldError>{errors.password.message}</FieldError>}
                            </Field>

                            {/* Confirm Password */}
                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input
                                    type="password"
                                    {...register("confirm_password")}
                                    aria-invalid={!!errors.confirm_password}
                                />
                                {errors.confirm_password && <FieldError>{errors.confirm_password.message}</FieldError>}
                            </Field>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 pt-2">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating account..." : "Create Account"}
                                </Button>
                                <Button variant="outline" type="button" className="w-full">
                                    Sign up with Google
                                </Button>
                            </div>
                        </FieldGroup>

                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}