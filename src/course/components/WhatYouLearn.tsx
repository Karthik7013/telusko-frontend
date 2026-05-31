import { Check, Target } from "lucide-react";

interface WhatYouLearnProps {
    items: string[];
}

export function WhatYouLearn({ items }: WhatYouLearnProps) {
    if (!items?.length) return null;

    return (
        <section id="what-you-learn" className="border p-4 rounded-xl bg-muted/30">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Target className="size-6" />What you'll learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-4 text-sm leading-relaxed">
                        <Check className="size-5 mt-0.5 shrink-0 text-primary" />
                        <span className="font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
