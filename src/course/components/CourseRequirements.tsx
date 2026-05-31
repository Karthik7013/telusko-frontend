import { ClipboardList } from "lucide-react";

interface CourseRequirementsProps {
    items: string[];
}

export function CourseRequirements({ items }: CourseRequirementsProps) {
    if (!items?.length) return null;

    return (
        <section className="border p-4 rounded-xl bg-muted/30">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ClipboardList className="size-6" />Requirements
            </h2>
            <ul className="grid gap-3">
                {items.map((req, i) => (
                    <li key={i} className="flex gap-4 items-center font-medium">
                        <div className="size-2 rounded-full bg-primary shrink-0" />
                        {req}
                    </li>
                ))}
            </ul>
        </section>
    );
}
