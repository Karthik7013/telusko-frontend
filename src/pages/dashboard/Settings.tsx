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
    return <Card>
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
                Update your personal details and professional title.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">Full Name</Label>
                    <Input id="first-name" defaultValue={user?.data?.fullName} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" defaultValue={user?.data?.email} disabled />
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
