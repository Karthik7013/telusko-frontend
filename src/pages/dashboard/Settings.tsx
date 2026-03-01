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
import { useGetUserQuery } from "@/features/auth/authApi";
import { SwitchTheme } from "@/components/common/ToggleTheme";



const ProfileSettings = () => {
    const { data: user } = useGetUserQuery();
    console.log(user, "user-1");
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
                        src={user?.data?.profilePictureUrl || "https://github.com/shadcn.png"}
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
                    <Input id="full-name" defaultValue={user?.data?.fullName} placeholder="Your full name" />
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
                    className="resize-none min-h-[100px]"
                    defaultValue={user?.data?.bio}
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
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Update Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
