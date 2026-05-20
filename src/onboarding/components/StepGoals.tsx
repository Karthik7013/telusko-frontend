import { motion } from "framer-motion"
import { Target, TrendingUp, Hammer, Award } from "lucide-react"
import type { Goal } from "../types"

const GOALS: { value: Goal; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: "get_job",
    label: "Get a Job in Tech",
    description: "Build skills to land your first or next tech role",
    icon: Target,
  },
  {
    value: "upskill",
    label: "Upskill in My Current Role",
    description: "Level up with advanced skills and frameworks",
    icon: TrendingUp,
  },
  {
    value: "personal_project",
    label: "Build a Personal Project",
    description: "Learn by building something you care about",
    icon: Hammer,
  },
  {
    value: "academic",
    label: "Academic / Certification",
    description: "Prepare for exams, degrees, or certifications",
    icon: Award,
  },
]

interface StepGoalsProps {
  value: Goal | null
  onChange: (goal: Goal) => void
}

export function StepGoals({ value, onChange }: StepGoalsProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">What's your main goal?</h2>
        <p className="text-muted-foreground mt-1">This helps us prioritize the right courses for you.</p>
      </motion.div>

      <div className="space-y-3">
        {GOALS.map((goal, index) => {
          const Icon = goal.icon
          const isSelected = value === goal.value

          return (
            <motion.button
              key={goal.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onChange(goal.value)}
              className={`relative flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
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
                  <span className="font-semibold">{goal.label}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{goal.description}</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}
              >
                {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
