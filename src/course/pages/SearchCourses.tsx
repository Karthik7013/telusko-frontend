import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CourseCard, { CourseCardSkeleton } from "@/course/components/CourseCard";
import { FilterSidebar } from "@/course/components/FilterSidebar";
import { useGetCoursesQuery } from "@/features/courses/coursesApi";
import { ApiError } from "@/components/common/ApiError";
import { CourseCardProps } from "@/types";

export default function SearchCourses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [selectedInstructor, setSelectedInstructor] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [isFeatured, setIsFeatured] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                if (searchQuery) {
                    newParams.set("q", searchQuery);
                } else {
                    newParams.delete("q");
                }
                return newParams;
            });
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery, setSearchParams]);

    const { data: courses, isLoading, error, refetch } = useGetCoursesQuery({
        search: queryParam,
        category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        level: selectedLevels.length > 0 ? selectedLevels[0].toLowerCase() : undefined,
        instructor: selectedInstructor || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        isFeatured: isFeatured || undefined,
        isPublished: isPublished || undefined,
    });

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

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategories([]);
        setSelectedLevels([]);
        setSelectedInstructor("");
        setMinPrice("");
        setMaxPrice("");
        setIsFeatured(false);
        setIsPublished(false);
        setSearchParams({});
    };

    const filterProps = {
        selectedCategories, selectedLevels, selectedInstructor, minPrice, maxPrice,
        isFeatured, isPublished,
        onToggleCategory: toggleCategory, onToggleLevel: toggleLevel,
        onInstructorChange: setSelectedInstructor,
        onMinPriceChange: setMinPrice, onMaxPriceChange: setMaxPrice,
        onFeaturedChange: setIsFeatured, onPublishedChange: setIsPublished,
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                {/* --- HEADER --- */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {queryParam ? `Search results for "${queryParam}"` : "Explore Courses"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isLoading ? "Finding courses..." : `${courses?.data?.courses?.length || 0} courses found`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 md:w-75">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                className="pl-9 h-11"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" className="h-11 w-11">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="p-4 pt-0">
                                        <FilterSidebar {...filterProps} />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* --- DESKTOP SIDEBAR --- */}
                    <aside className="hidden lg:block w-65 shrink-0">
                        <div className="sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal className="h-4 w-4" />
                                <h2 className="font-semibold text-lg">Filters</h2>
                            </div>
                            <FilterSidebar {...filterProps} />
                        </div>
                    </aside>

                    {/* --- COURSE GRID --- */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <CourseCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="max-w-2xl mx-auto">
                                <ApiError
                                    error="Failed to load courses. Please try again."
                                    onRetry={refetch}
                                />
                            </div>
                        ) : courses?.data?.courses && courses?.data?.courses?.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {courses.data.courses.map((course: CourseCardProps) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-primary text-primary-foreground p-6 rounded-full mb-6">
                                    <PackageOpen className="h-8 w-8" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">No courses found</h2>
                                <p className="text-muted-foreground max-w-100">
                                    We couldn't find any courses matching your search. Try adjusting your filters or search terms.
                                </p>
                                <Button
                                    variant="ghost"
                                    className="mt-4"
                                    onClick={handleClearFilters}
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
