import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetPreferencesQuery, useUpdatePreferencesMutation } from "@/features/preferences/preferencesApi";
import type { UserPreferences } from "@/onboarding/types";
import { StepRole } from "@/onboarding/components/StepRole";
import { StepInterests } from "@/onboarding/components/StepInterests";
import { StepGoals } from "@/onboarding/components/StepGoals";
import { StepLevelTime } from "@/onboarding/components/StepLevelTime";
import { ApiError } from "@/components/common/ApiError";
import { useForm } from "react-hook-form";

const DEFAULT_PREFS: UserPreferences = {
    role: null, interests: [], goal: null, experienceLevel: null, timeCommitment: null
};

export default function LearningPreferences() {
    const { data, isLoading, error, refetch } = useGetPreferencesQuery();
    const [updatePreferences, { isLoading: isSaving }] = useUpdatePreferencesMutation();
    const { watch, setValue, handleSubmit, reset } = useForm<UserPreferences>({
        defaultValues: DEFAULT_PREFS,
    });

    const prefs = watch();

    useEffect(() => {
        if (data?.data) {
            const { id, userId, createdAt, updatedAt, ...rest } = data.data as any;
            reset(rest);
        }
    }, [data, reset]);

    const onSubmit = async (values: UserPreferences) => {
        try {
            await updatePreferences(values).unwrap();
            localStorage.removeItem("telusko-onboarding-skipped");
            toast.success("Learning preferences saved");
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to save preferences");
        }
    };

    if (isLoading) return <PrefSettingsSkeleton />;
    if (error) return <ApiError error="Failed to load preferences" onRetry={refetch} />;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            onChange={(role) => setValue("role", role)}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Topics I'm interested in</Label>
                        <StepInterests
                            value={prefs.interests}
                            onChange={(interests) => setValue("interests", interests)}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>My goal</Label>
                        <StepGoals
                            value={prefs.goal}
                            onChange={(goal) => setValue("goal", goal)}
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Experience & Time</Label>
                        <StepLevelTime
                            experienceLevel={prefs.experienceLevel}
                            timeCommitment={prefs.timeCommitment}
                            onExperienceChange={(experienceLevel) => setValue("experienceLevel", experienceLevel)}
                            onTimeChange={(timeCommitment) => setValue("timeCommitment", timeCommitment)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
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
