import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface DescriptionCollapseProps {
    description: string;
    maxHeight?: number; // Optional prop for custom max height
}

const DescriptionCollapse: React.FC<DescriptionCollapseProps> = ({
    description,
    maxHeight = 300, // Default to 300px
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    // Effect to determine if the description content overflows the maxHeight
    useEffect(() => {
        if (descriptionRef.current) {
            // Only set isDescriptionOverflowing once based on the full content height
            // This state should not change when showFullDescription is toggled
            setIsDescriptionOverflowing(descriptionRef.current.scrollHeight > maxHeight);
        }
    }, [description, maxHeight]); // Dependencies: description content and max height

    return (
        <>
            <div
                ref={descriptionRef}
                className={`text-md flex justify-center text-muted-foreground leading-relaxed ${!showFullDescription && isDescriptionOverflowing ? 'relative overflow-hidden' : ''}`}
                style={!showFullDescription && isDescriptionOverflowing ? { maxHeight: `${maxHeight}px` } : {}}
            >
                {description}
                {!showFullDescription && isDescriptionOverflowing && (
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent pointer-events-none" />
                )}
            </div>
            {isDescriptionOverflowing && (
                <Button size={'xs'} variant="outline" onClick={() => setShowFullDescription(!showFullDescription)} className="rounded-full h-auto">
                    {showFullDescription ? "Show less" : "Show more"}
                </Button>
            )}
        </>
    );
};

export default DescriptionCollapse;