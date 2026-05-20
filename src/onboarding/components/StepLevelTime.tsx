import { motion } from "framer-motion"
import { LEVELS } from "@/data/courses-data"
import type { ExperienceLevel, TimeCommitment } from "../types"

const TIME_OPTIONS: { value: TimeCommitment; label: string; description: string }[] = [
  { value: "casual", label: "Casual", description: "1–2 hours / week" },
  { value: "moderate", label: "Moderate", description: "3–5 hours / week" },
  { value: "intensive", label: "Intensive", description: "5+ hours / week" },
]

interface StepLevelTimeProps {
  experienceLevel: ExperienceLevel | null
  timeCommitment: TimeCommitment | null
  onExperienceChange: (level: ExperienceLevel) => void
  onTimeChange: (commitment: TimeCommitment) => void
}

export function StepLevelTime({
  experienceLevel,
  timeCommitment,
  onExperienceChange,
  onTimeChange,
}: StepLevelTimeProps) {
  const levelValues: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced']

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">Your experience & commitment</h2>
        <p className="text-muted-foreground mt-1">
          Tell us about your current level and how much time you can dedicate.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Experience Level
        </h3>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map((label, index) => {
            const level = levelValues[index]
            const isSelected = experienceLevel === level

            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => onExperienceChange(level)}
                className={`px-6 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {label}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Time Commitment
        </h3>
        <div className="flex flex-wrap gap-3">
          {TIME_OPTIONS.map((option, index) => {
            const isSelected = timeCommitment === option.value

            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                onClick={() => onTimeChange(option.value)}
                className={`px-6 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span className="block">{option.label}</span>
                <span className="block text-xs opacity-70 mt-0.5">{option.description}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
