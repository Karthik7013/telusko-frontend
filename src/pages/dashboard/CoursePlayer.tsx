import { useState } from "react";
import {
    Globe,
    Info,
    Star,
    Share2,
    MoreHorizontal,
    PanelRightClose,
    PanelRightOpen
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CourseContent from '@/components/features/CourseContent';
import {
    VideoPlayer,
    VideoPlayerControlBar,
    VideoPlayerPlayButton,
    VideoPlayerSeekBackwardButton,
    VideoPlayerSeekForwardButton,
    VideoPlayerTimeRange,
    VideoPlayerTimeDisplay,
    VideoPlayerMuteButton,
    VideoPlayerVolumeRange
} from "@/components/ui/video-player";
import { cn } from "@/lib/utils";

export default function CoursePlayer({

}) {
    const [isPlaylistOpen, setPlaylistOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background pb-10">
            <div className="container mx-auto">
                <div className={cn(
                    "grid gap-8 max-w-6xl mx-auto transition-all duration-500 ease-in-out",
                    isPlaylistOpen ? "lg:grid-cols-[1fr_350px]" : "max-w-4xl  lg:grid-cols-[1fr_0px] lg:gap-0"
                )}>
                    {/* Left Column: Video Player & Details */}
                    <div className="space-y-6 min-w-0">
                        {/* Video Player Wrapper */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
                            <VideoPlayer className="w-full h-full">
                                <video
                                    slot="media"
                                    src="https://res.cloudinary.com/dy0qvjkff/video/upload/v1770664244/ueke5mact6ac60hgeoii.mp4"
                                    poster="https://cdn.pixabay.com/photo/2023/12/16/00/06/mountain-8451604_1920__1b578b3c0b.jpg"
                                    className="w-full h-full object-cover"
                                    crossOrigin=""
                                    playsInline
                                />
                                <VideoPlayerControlBar>
                                    <VideoPlayerPlayButton />
                                    <VideoPlayerSeekBackwardButton />
                                    <VideoPlayerSeekForwardButton />
                                    <VideoPlayerTimeRange />
                                    <VideoPlayerTimeDisplay showDuration />
                                    <VideoPlayerMuteButton />
                                    <VideoPlayerVolumeRange />
                                </VideoPlayerControlBar>
                            </VideoPlayer>
                        </div>

                        {/* Video Info */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    Title of the Course
                                </h1>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setPlaylistOpen(!isPlaylistOpen)}
                                    className="hidden lg:flex shrink-0"
                                    title={isPlaylistOpen ? "Hide Playlist" : "Show Playlist"}
                                >
                                    {isPlaylistOpen ? <PanelRightClose /> : <PanelRightOpen />}
                                </Button>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-orange-400">
                                            <Star className="size-4 fill-current" />
                                            <Star className="size-4 fill-current" />
                                            <Star className="size-4 fill-current" />
                                            <Star className="size-4 fill-current" />
                                            <Star className="size-4 fill-current" />
                                        </div>
                                        <span className="font-medium text-foreground">4.5</span>
                                        <span>(123 ratings)</span>
                                    </div>
                                    <span>•</span>
                                    <span>1,234 Learners</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Share2 className="size-4" /> Share
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="size-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="h-px bg-border" />

                            {/* Description & Meta */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {['web', 'react', 'frontend'].map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    This is the subtitle or short description of the course. It gives a brief overview of what the current video or course is about.
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
                                    <span className="flex items-center gap-1.5">
                                        <Info className="size-4" />
                                        Last updated Nov 23, 2026
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Globe className="size-4" />
                                        English
                                    </span>
                                </div>

                                <div className="pt-2">
                                    <p className="text-sm">
                                        Created by <span className="font-medium text-primary cursor-pointer hover:underline">Instructor Name</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Playlist / Course Content */}
                    <div className={cn(
                        "lg:col-span-1 overflow-hidden transition-opacity duration-500 lg:sticky lg:top-16 lg:max-h-[calc(100vh-6rem)]",
                        isPlaylistOpen ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col h-full min-w-[350px]">

                            <div className="flex-1 overflow-y-auto p-2">
                                {/* Reusing the CourseContent component */}
                                <CourseContent content={{
                                    sections: [] // In a real app, this would be populated
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}