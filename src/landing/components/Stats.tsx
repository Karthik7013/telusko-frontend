export default function Stats() {
    const stats = [
        { value: "2M+", label: "Developers worldwide" },
        { value: "520+", label: "Hours of curated content" },
        { value: "94%", label: "Course completion rate" },
        { value: "4.9★", label: "Average student rating" },
    ]

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <div className="font-display text-5xl sm:text-6xl text-gradient-primary">{stat.value}</div>
                            <div className="mt-2 text-sm text-muted-foreground font-body">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}