// Shared type definitions
export type Task = {
  id: number
  text: string
  completed: boolean
  labels: string[]
}

export type User = {
  name: string
  avatar: string
}

export type CompletionFilter = "all" | "completed" | "active"

