// Utility functions
export const getLabelColor = (label: string) => {
  // Create a simple hash of the label to get a consistent color
  const labelHash = label.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Array of Tailwind color classes
  const colors = [
    "bg-red-100 text-red-800 border-red-200",
    "bg-blue-100 text-blue-800 border-blue-200",
    "bg-green-100 text-green-800 border-green-200",
    "bg-yellow-100 text-yellow-800 border-yellow-200",
    "bg-purple-100 text-purple-800 border-purple-200",
    "bg-pink-100 text-pink-800 border-pink-200",
    "bg-indigo-100 text-indigo-800 border-indigo-200",
    "bg-orange-100 text-orange-800 border-orange-200",
    "bg-teal-100 text-teal-800 border-teal-200",
    "bg-cyan-100 text-cyan-800 border-cyan-200",
  ]

  // Use the hash to select a color
  return colors[labelHash % colors.length]
}

// Define the Task interface
interface Task {
  id: string
  title: string
  completed: boolean
  labels: string[]
}

// Define the CompletionFilter type
type CompletionFilter = "all" | "completed" | "active"

// Get all unique labels from tasks
export const getAllLabelsFromTasks = (tasks: Task[]) => {
  const labelsSet = new Set<string>()
  tasks.forEach((task) => {
    task.labels.forEach((label) => {
      labelsSet.add(label)
    })
  })
  return Array.from(labelsSet)
}

// Filter tasks based on filters
export const filterTasks = (tasks: Task[], completionFilter: CompletionFilter, labelFilter: string[]) => {
  return tasks.filter((task) => {
    // Filter by completion status
    if (completionFilter === "completed" && !task.completed) return false
    if (completionFilter === "active" && task.completed) return false

    // Filter by labels
    if (labelFilter.length > 0) {
      // Check if task has at least one of the filtered labels
      const hasFilteredLabel = task.labels.some((label) => labelFilter.includes(label))
      if (!hasFilteredLabel) return false
    }

    return true
  })
}

