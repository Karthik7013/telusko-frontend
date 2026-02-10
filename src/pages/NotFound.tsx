"use client";

import { Home, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // If using Next.js, otherwise use your router's hook

import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import downloadIcon from '../assets/download.svg';
export const title = "No Route Match";

const NoRouteMatch = () => {
    const navigate = useNavigate();

    return (
        <div className="h-svh flex items-center justify-center bg-background">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia>
                        <div className="relative flex items-center justify-center w-38 h-38 mx-auto mb-4">

                            <img className="w-full h-full" src={downloadIcon} alt="download.svg" />
                        </div>
                    </EmptyMedia>

                    <EmptyTitle>Page not found</EmptyTitle>
                    <EmptyDescription>
                        We couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            <MoveLeft className="size-4 mr-2" />
                            Go Back
                        </Button>
                        <Button onClick={() => navigate("/")}>
                            <Home className="size-4 mr-2" />
                            Back to Home
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
};

export default NoRouteMatch;