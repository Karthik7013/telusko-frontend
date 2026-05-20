import { useGetCoursesQuery } from "@/features/courses/coursesApi"
import { useGetPreferencesQuery } from "@/features/preferences/preferencesApi"
import CourseCard from "@/course/components/CourseCard"
import type { CourseCardProps } from "@/types"

export function RecommendedCourses() {
  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery(undefined as any)
  const { data: prefsData } = useGetPreferencesQuery()

  if (coursesLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Recommended for you</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!coursesData?.data?.courses) return null

  const courses: CourseCardProps[] = coursesData.data.courses
  const prefs = prefsData?.data

  let recommended = courses

  if (prefs) {
    const interestCategories = prefs.interests.map((i) =>
      i === "web_development" ? "Web Development" : i.charAt(0).toUpperCase() + i.slice(1)
    )

    recommended = courses.filter((course) => {
      const matchesInterest =
        prefs.interests.length === 0 ||
        interestCategories.some(
          (cat) =>
            course.category.toLowerCase().includes(cat.toLowerCase()) ||
            (course as any).tags?.some((t: string) => t.toLowerCase().includes(cat.toLowerCase()))
        )

      const matchesLevel =
        !prefs.experienceLevel || course.level === prefs.experienceLevel

      return matchesInterest && matchesLevel
    })

    recommended.sort((a, b) => b.rating - a.rating)
    recommended = recommended.slice(0, 8)
  }

  if (recommended.length === 0) return null

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Recommended for you</h2>
        <p className="text-sm text-muted-foreground">Based on your preferences</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recommended.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
