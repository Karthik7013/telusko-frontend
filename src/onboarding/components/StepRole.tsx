import { motion } from "framer-motion"
import { GraduationCap, Briefcase, RepeatIcon, Sparkles } from "lucide-react"
import type { UserRole } from "../types"

const ROLES: { value: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: "student",
    label: "Student",
    description: "Currently studying and building skills",
    icon: GraduationCap,
  },
  {
    value: "working_professional",
    label: "Working Professional",
    description: "Looking to upskill or switch domains",
    icon: Briefcase,
  },
  {
    value: "career_switcher",
    label: "Career Switcher",
    description: "Transitioning into a new career path",
    icon: RepeatIcon,
  },
  {
    value: "hobbyist",
    label: "Hobbyist",
    description: "Learning for personal projects and fun",
    icon: Sparkles,
  },
]

interface StepRoleProps {
  value: UserRole | null
  onChange: (role: UserRole) => void
}

export function StepRole({ value, onChange }: StepRoleProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">What best describes you?</h2>
        <p className="text-muted-foreground mt-1">We'll tailor recommendations based on your background.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROLES.map((role, index) => {
          const Icon = role.icon
          const isSelected = value === role.value

          return (
            <motion.button
              key={role.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onChange(role.value)}
              className={`relative flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{role.label}</span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{role.description}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
