import { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger, Accordion } from "@/components/ui/accordion";
import { ListVideo, FileVideo, PlayCircle } from "lucide-react";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function CourseContent({
    content
}: {
    content: {
        sections: {
            id: string, title: string,
            orderIndex: number,
            lectures: {
                id: string,
                title: string,
                durationMinutes: string,
                isPreviewable: boolean
            }[]
        }[]
    }
}) {
    // const loading = true;
    const [openSections, setOpenSections] = useState<string[]>([]);

    // Function to handle "Expand All" / "Collapse All" logic
    const toggleExpandAll = () => {
        if (openSections.length === content.sections.length) {
            setOpenSections([]); // Collapse all
        } else {
            setOpenSections(content.sections.map((s) => s.id)); // Expand all
        }
    };

    // if (loading) {
    //     return <section>
    //         <h2 className="text-2xl font-bold mb-4">Course content</h2>
    //         <div className='space-y-3'>
    //             <Skeleton className='w-full py-6'></Skeleton>
    //             <Skeleton className='w-full py-6'></Skeleton>
    //             <Skeleton className='w-full py-6'></Skeleton>
    //         </div>
    //     </section>
    // }

    if (content.sections.length === 0) {
        return (
            <section>
                <h2 className="text-lg font-bold mb-4">Course content</h2>
                <Empty className="border rounded-lg bg-muted/10 py-8">
                    <EmptyMedia>
                        <FileVideo className="size-8 text-muted-foreground/50" />
                    </EmptyMedia>
                    <EmptyTitle className="text-base">No sections available</EmptyTitle>
                    <EmptyDescription>Course content will appear here once added.</EmptyDescription>
                </Empty>
            </section>
        );
    }

    return <section className="border p-4 rounded-xl bg-muted/30">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ListVideo className="size-6" />Course content
        </h2>
        <div className="flex flex-col sm:flex-row justify-end text-sm mb-4 gap-2">
            <button
                onClick={toggleExpandAll}
                className="font-bold text-right"
            >
                {openSections.length === content.sections.length ? "Collapse all sections" : "Expand all sections"}
            </button>
        </div>

        <Accordion
            type="multiple"
            value={openSections}
            onValueChange={setOpenSections}
            className="border rounded-xl"
        >
            {content.sections.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="border-b last:border-0">
                    <AccordionTrigger className="px-4 py-4 hover:bg-muted/50 transition-all text-left">
                        <div className="flex justify-between w-full pr-4">
                            <span className="font-bold text-md">{section.orderIndex} {section.title}</span>
                            <span className="text-xs font-normal text-muted-foreground">
                                {section.lectures.length} lectures
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2 divide-y">
                        {section.lectures.map((lecture) => (
                            <div key={lecture.id} className="flex justify-between items-center py-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <PlayCircle className="text-primary size-4 text-muted-foreground" />
                                    <span className="hover:underline">
                                        {lecture.title}
                                    </span>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <span className="text-xs text-muted-foreground">
                                        {lecture.durationMinutes} min
                                    </span>
                                    {lecture.isPreviewable && (
                                        <span className="text-xs text-primary">Preview</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </section>
}