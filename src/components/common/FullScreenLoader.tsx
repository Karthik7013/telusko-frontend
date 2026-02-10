import { Spinner } from "../ui/spinner";

export default function FullScreenLoader() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Spinner className="size-10" />
        </div>
    )
}