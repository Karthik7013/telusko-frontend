import { useState } from "react";
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
import { useMeQuery, useChangePasswordMutation } from "@/features/identity/identityApi";
import { SwitchTheme } from "@/components/common/ToggleTheme";
import { ApiError } from "@/components/common/ApiError";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProfileSettings = () => {
    const { data: user, isLoading, error, refetch } = useMeQuery(undefined);
    
    if (isLoading) return <ProfileSettingsSkeleton />;
    if (error) return <ApiError error="Failed to load profile" onRetry={refetch} />;
    
    return <Card>
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
                        src={user?.data?.avatarUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="space-y-2 flex-1">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input id="picture" type="file" accept="image/*" className="cursor-pointer" />
                    <p className="text-[0.8rem] text-muted-foreground">
                        Recommended: Square JPG, PNG, or GIF, at least 1000x1000 pixels.
                    </p>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue={user?.data?.displayName} placeholder="Your full name" />
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
                    className="resize-none min-h-25"
                    defaultValue={user?.data?.displayName}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                    Brief description for your profile. URLs are hyperlinked.
                </p>
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
    </Card>
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

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>

                </TabsList>
                <TabsContent value="account" className="space-y-4">
                    <ProfileSettings />
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
