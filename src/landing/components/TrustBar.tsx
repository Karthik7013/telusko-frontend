import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
];

export function TrustBar() {
    return (
        <section id="mastry-path" className="py-12 bg-muted/10">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
                    Our Alumni Work At
                </p>

                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[
                        AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true }),
                    ]}
                    className="w-full relative [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
                >
                    <CarouselContent className="flex items-center">
                        {[...companies, ...companies].map((company, index) => (
                            <CarouselItem
                                key={`${company.name}-${index}`}
                                className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-8"
                            >
                                <div className="flex items-center justify-center h-12 outline-none">
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="h-7 md:h-9 w-auto object-contain opacity-60 grayscale hover:grayscale-0 transition-all"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
