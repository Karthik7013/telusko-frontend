import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CourseCard, { CourseCardSkeleton } from "@/components/common/CourseCard";
import { useGetCoursesQuery } from "@/features/courses/coursesApi";
import { ApiError } from "@/components/common/ApiError";
import { CATEGORIES, LEVELS } from "@/data/courses-data";

export default function SearchCoursesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const { data: allCourses = [], isLoading, error, refetch } = useGetCoursesQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    const filteredCourses = useMemo(() => {
        return allCourses.filter(course => {
            const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase()) ||
                course.description.toLowerCase().includes(query.toLowerCase()) ||
                course.instructor.toLowerCase().includes(query.toLowerCase());

            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(course.category);

            const matchesLevel = selectedLevels.length === 0 ||
                selectedLevels.includes(course.level);

            return matchesQuery && matchesCategory && matchesLevel;
        });
    }, [allCourses, query, selectedCategories, selectedLevels]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ q: e.target.value });
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const toggleLevel = (level: string) => {
        setSelectedLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );
    };

    const FilterSidebar = () => (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="grid gap-2">
                    {CATEGORIES.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none cursor-pointer">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Level</h3>
                <div className="grid gap-2">
                    {LEVELS.map(level => (
                        <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                                id={`level-${level}`}
                                checked={selectedLevels.includes(level)}
                                onCheckedChange={() => toggleLevel(level)}
                            />
                            <Label htmlFor={`level-${level}`} className="text-sm font-medium leading-none cursor-pointer">
                                {level}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-32">
            <div className="container mx-auto px-4">
                {/* --- HEADER --- */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {query ? `Search results for "${query}"` : "Explore Courses"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isLoading ? "Finding courses..." : `${filteredCourses.length} courses found`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 md:w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                className="pl-9 h-11"
                                value={query}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-11 w-11">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="p-6 pt-0">
                                        <FilterSidebar />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* --- DESKTOP SIDEBAR --- */}
                    <aside className="hidden lg:block w-[260px] shrink-0">
                        <div className="sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal className="h-4 w-4" />
                                <h2 className="font-semibold text-lg">Filters</h2>
                            </div>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* --- COURSE GRID --- */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <CourseCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="max-w-2xl mx-auto">
                                <ApiError
                                    error="Failed to load courses. Please try again."
                                    onRetry={() => refetch()}
                                />
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course.id} course={{
                                        ...course,
                                        to: `/course/${course.id}`,
                                        rating: course.rating.average.toString(),
                                        duration: `${course.features.video_hours} Hours`
                                    }} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-muted p-6 rounded-full mb-6">
                                    <PackageOpen className="h-12 w-12 text-muted-foreground" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">No courses found</h2>
                                <p className="text-muted-foreground max-w-[400px]">
                                    We couldn't find any courses matching your search. Try adjusting your filters or search terms.
                                </p>
                                <Button
                                    variant="ghost"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchParams({});
                                        setSelectedCategories([]);
                                        setSelectedLevels([]);
                                    }}
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}