import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type UserAvatarProps = {
    avatarUrl?: string
    displayName?: string
    className?: string
    fallbackClassName?: string
}

export function UserAvatar({ avatarUrl, displayName, className = "h-8 w-8", fallbackClassName }: UserAvatarProps) {
    return (
        <Avatar className={className}>
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className={fallbackClassName}>
                {displayName?.substring(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
        </Avatar>
    )
}
