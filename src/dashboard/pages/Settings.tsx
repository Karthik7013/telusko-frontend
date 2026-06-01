import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useMeQuery, useChangePasswordMutation, useUpdateProfileMutation } from "@/features/identity/identityApi";
import LearningPreferences from "@/dashboard/components/LearningPreferences";
import { SwitchTheme } from "@/components/common/ToggleTheme";
import { ApiError } from "@/components/common/ApiError";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
    displayName: z.string().min(2, "Full name must be at least 2 characters"),
    bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ProfileSettings = () => {
    const { data: user, isLoading, error, refetch } = useMeQuery();
    const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
    const [avatarUrl, setAvatarUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if (user?.data) {
            setAvatarUrl(user.data.avatarUrl || "");
            reset({
                displayName: user.data.displayName || "",
                bio: user.data.bio || "",
            });
        }
    }, [user, reset]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch("http://localhost:3000/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: formData,
            });
            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            const url = data.url || data.imageUrl || data.data?.url || data.data?.imageUrl || "";
            if (url) setAvatarUrl(url);
            else throw new Error("No URL returned from upload");
            toast.success("Image uploaded");
        } catch (err: any) {
            toast.error(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (isLoading) return <ProfileSettingsSkeleton />;
    if (error) return <ApiError error="Failed to load profile" onRetry={refetch} />;

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            await updateProfile({ ...values, avatarUrl }).unwrap();
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to update profile");
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your personal details and professional title.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer disabled:opacity-60 group"
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-[10px] text-center p-2">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 flex-col items-center justify-center">
                                <Camera  />
                                <span className="text-[10px] text-white font-medium">
                                    {uploading ? "Uploading..." : "Upload"}
                                </span>
                            </div>
                        </button>
                        <div className="space-y-2 flex-1">
                            <Label>Profile Picture</Label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={uploading}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploading ? "Uploading..." : "Choose image"}
                                </Button>
                                {avatarUrl && (
                                    <button
                                        type="button"
                                        onClick={() => setAvatarUrl("")}
                                        className="text-xs text-destructive hover:underline"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Upload a profile image. JPG, PNG or GIF up to 5MB.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Full Name</Label>
                            <Input
                                id="displayName"
                                placeholder="Your full name"
                                {...register("displayName")}
                            />
                            {errors.displayName && <p className="text-sm text-destructive">{errors.displayName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user?.data?.email} disabled className="bg-muted" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none min-h-25 focus-visible:ring-primary"
                            {...register("bio")}
                        />
                        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
                        <p className="text-[0.8rem] text-muted-foreground">
                            Brief description for your profile. URLs are hyperlinked.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

function ProfileSettingsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-25 w-full" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    );
}

const AppearanceSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose your preferred theme for the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <SwitchTheme />
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">Theme changes are applied automatically.</p>
            </CardFooter>
        </Card>
    )
}

const PasswordSettings = () => {
    const [changePassword, { isLoading: isPending }] = useChangePasswordMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = async (values: PasswordFormValues) => {
        try {
            await changePassword(values).unwrap();
            toast.success("Password changed successfully");
            reset();
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to change password");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="currentPassword">Current password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            {...register("newPassword")}
                        />
                        {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Updating..." : "Update Password"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-4">
                    <ProfileSettings />
                </TabsContent>
                <TabsContent value="preferences">
                    <LearningPreferences />
                </TabsContent>
                <TabsContent value="appearance" className="space-y-4">
                    <AppearanceSettings />
                </TabsContent>
                <TabsContent value="password">
                    <PasswordSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}
