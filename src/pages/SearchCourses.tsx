import { useState, useEffect } from "react";
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
import { CourseCardProps } from "@/types";

export default function SearchCoursesPage() {
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

    const { data: courses, isLoading: isFetching, error: fetchError } = useGetCoursesQuery({
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

    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Category Filter */}
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

            {/* Level Filter */}
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

            {/* Instructor Filter */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Instructor</h3>
                <Input
                    placeholder="Instructor name..."
                    value={selectedInstructor}
                    onChange={(e) => setSelectedInstructor(e.target.value)}
                />
            </div>

            {/* Price Range Filter */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Status Filters */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Status</h3>
                <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={isFeatured}
                            onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                        />
                        <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer">
                            Featured
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="published"
                            checked={isPublished}
                            onCheckedChange={(checked) => setIsPublished(checked as boolean)}
                        />
                        <Label htmlFor="published" className="text-sm font-medium leading-none cursor-pointer">
                            Published
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );

    console.log(courses?.data?.courses, "courses")
    return (
        <div className="py-32">
            <div className="container mx-auto px-4">
                {/* --- HEADER --- */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {queryParam ? `Search results for "${queryParam}"` : "Explore Courses"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isFetching ? "Finding courses..." : `${courses?.data?.courses?.length || 0} courses found`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 md:w-[300px]">
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
                                    <Button variant="outline" size="icon" className="h-11 w-11">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="p-4 pt-0">
                                        {FilterSidebar()}
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
                            {FilterSidebar()}
                        </div>
                    </aside>

                    {/* --- COURSE GRID --- */}
                    <main className="flex-1">
                        {isFetching ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <CourseCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : fetchError ? (
                            <div className="max-w-2xl mx-auto">
                                <ApiError
                                    error="Failed to load courses. Please try again."
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
                                <p className="text-muted-foreground max-w-[400px]">
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
