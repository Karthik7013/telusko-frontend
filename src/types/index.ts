
// Theme Types
export type Theme = "dark" | "light" | "system"

// Theme Provider Props
export type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}


// course card props
export type CourseCardProps = {
    title: string,
    description: string,
    rating: string,
    duration: string,
    instructor: string,
    to: string,
    imageSrc: string
}