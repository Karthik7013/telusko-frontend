import { useState, useEffect } from "react";
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
import { useGetPreferencesQuery, useUpdatePreferencesMutation } from "@/features/preferences/preferencesApi";
import type { UserPreferences } from "@/onboarding/types";
import { StepRole } from "@/onboarding/components/StepRole";
import { StepInterests } from "@/onboarding/components/StepInterests";
import { StepGoals } from "@/onboarding/components/StepGoals";
import { StepLevelTime } from "@/onboarding/components/StepLevelTime";
import { SwitchTheme } from "@/components/common/ToggleTheme";
import { ApiError } from "@/components/common/ApiError";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
    displayName: z.string().min(2, "Full name must be at least 2 characters"),
    avatarUrl: z.string().url("Invalid image URL").or(z.literal("")).optional(),
    bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
    const { data: user, isLoading, error, refetch } = useMeQuery();
    const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
    });

    const watchedAvatarUrl = watch("avatarUrl");


    useEffect(() => {
        if (user?.data) {
            reset({
                displayName: user.data.displayName || "",
                avatarUrl: user.data.avatarUrl || "",
                bio: user.data.bio || "",
            });
        }
    }, [user, reset]);

    if (isLoading) return <ProfileSettingsSkeleton />;
    if (error) return <ApiError error="Failed to load profile" onRetry={refetch} />;

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            await updateProfile(values).unwrap();
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
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-muted">
                            <img
                                src={watchedAvatarUrl || ""}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                            <Input
                                id="avatarUrl"
                                placeholder="https://example.com/avatar.jpg"
                                {...register("avatarUrl")}
                            />
                            {errors.avatarUrl && <p className="text-sm text-destructive">{errors.avatarUrl.message}</p>}
                            <p className="text-[0.8rem] text-muted-foreground">
                                Paste a URL to your profile image.
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
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePassword, { isLoading: isPending }] = useChangePasswordMutation();

    const handleSubmit = async () => {
        if (!currentPassword || !newPassword) {
            toast.error("Both fields are required");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters");
            return;
        }
        try {
            await changePassword({ currentPassword, newPassword }).unwrap();
            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to change password");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input
                        id="current"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input
                        id="new"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Updating..." : "Update Password"}
                </Button>
            </CardFooter>
        </Card>
    );
};

function LearningPreferences() {
    const { data, isLoading, error, refetch } = useGetPreferencesQuery();
    const [updatePreferences, { isLoading: isSaving }] = useUpdatePreferencesMutation();
    const [prefs, setPrefs] = useState<UserPreferences>({
        role: null, interests: [], goal: null, experienceLevel: null, timeCommitment: null
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (data?.data && !loaded) {
            setPrefs(data.data);
            setLoaded(true);
        }
    }, [data, loaded]);

    const handleSave = async () => {
        try {
            await updatePreferences(prefs).unwrap();
            localStorage.removeItem("telusko-onboarding-skipped");
            toast.success("Learning preferences saved");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to save preferences");
        }
    };

    if (isLoading) return <PrefSettingsSkeleton />;
    if (error) return <ApiError error="Failed to load preferences" onRetry={refetch} />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                    Tell us about yourself so we can recommend the right courses.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label>I am a...</Label>
                    <StepRole
                        value={prefs.role}
                        onChange={(role) => setPrefs({ ...prefs, role })}
                    />
                </div>
                <div className="space-y-4">
                    <Label>Topics I'm interested in</Label>
                    <StepInterests
                        value={prefs.interests}
                        onChange={(interests) => setPrefs({ ...prefs, interests })}
                    />
                </div>
                <div className="space-y-4">
                    <Label>My goal</Label>
                    <StepGoals
                        value={prefs.goal}
                        onChange={(goal) => setPrefs({ ...prefs, goal })}
                    />
                </div>
                <div className="space-y-4">
                    <Label>Experience & Time</Label>
                    <StepLevelTime
                        experienceLevel={prefs.experienceLevel}
                        timeCommitment={prefs.timeCommitment}
                        onExperienceChange={(experienceLevel) => setPrefs({ ...prefs, experienceLevel })}
                        onTimeChange={(timeCommitment) => setPrefs({ ...prefs, timeCommitment })}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
            </CardFooter>
        </Card>
    );
}

function PrefSettingsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    );
}

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
