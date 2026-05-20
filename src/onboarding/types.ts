export type UserRole = 'student' | 'working_professional' | 'career_switcher' | 'hobbyist'

export type InterestTopic =
  | 'java'
  | 'python'
  | 'web_development'
  | 'cloud'
  | 'mobile'
  | 'security'
  | 'microservices'
  | 'blockchain'

export type Goal = 'get_job' | 'upskill' | 'personal_project' | 'academic'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export type TimeCommitment = 'casual' | 'moderate' | 'intensive'

export interface OnboardingData {
  role: UserRole | null
  interests: InterestTopic[]
  goal: Goal | null
  experienceLevel: ExperienceLevel | null
  timeCommitment: TimeCommitment | null
}

export type UserPreferences = OnboardingData
