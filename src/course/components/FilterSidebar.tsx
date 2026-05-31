import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CATEGORIES, LEVELS } from "@/data/courses-data";

interface FilterSidebarProps {
    selectedCategories: string[];
    selectedLevels: string[];
    selectedInstructor: string;
    minPrice: string;
    maxPrice: string;
    isFeatured: boolean;
    isPublished: boolean;
    onToggleCategory: (category: string) => void;
    onToggleLevel: (level: string) => void;
    onInstructorChange: (value: string) => void;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    onFeaturedChange: (checked: boolean) => void;
    onPublishedChange: (checked: boolean) => void;
}

export function FilterSidebar({
    selectedCategories, selectedLevels, selectedInstructor, minPrice, maxPrice,
    isFeatured, isPublished, onToggleCategory, onToggleLevel, onInstructorChange,
    onMinPriceChange, onMaxPriceChange, onFeaturedChange, onPublishedChange
}: FilterSidebarProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="grid gap-2">
                    {CATEGORIES.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => onToggleCategory(category)}
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
                                onCheckedChange={() => onToggleLevel(level)}
                            />
                            <Label htmlFor={`level-${level}`} className="text-sm font-medium leading-none cursor-pointer">
                                {level}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Instructor</h3>
                <Input
                    placeholder="Instructor name..."
                    value={selectedInstructor}
                    onChange={(e) => onInstructorChange(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="flex items-center gap-2">
                    <Input
                        type="number" placeholder="Min" min="0"
                        value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)}
                        className="w-full"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number" placeholder="Max" min="0"
                        value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Status</h3>
                <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured" checked={isFeatured}
                            onCheckedChange={(checked) => onFeaturedChange(checked as boolean)}
                        />
                        <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="published" checked={isPublished}
                            onCheckedChange={(checked) => onPublishedChange(checked as boolean)}
                        />
                        <Label htmlFor="published" className="text-sm font-medium leading-none cursor-pointer">Published</Label>
                    </div>
                </div>
            </div>
        </div>
    );
}
