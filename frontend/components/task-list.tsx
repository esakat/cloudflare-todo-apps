"use client"

import { TaskItem } from "./task-item"
import type { Task, CompletionFilter } from "../types"
import { filterTasks } from "../utils"

interface TaskListProps {
  tasks: Task[]
  completionFilter: CompletionFilter
  labelFilter: string[]
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
  onLabelClick: (label: string) => void
}

export function TaskList({
  tasks,
  completionFilter,
  labelFilter,
  onToggleComplete,
  onDelete,
  onLabelClick,
}: TaskListProps) {
  const filteredTasks = filterTasks(tasks, completionFilter, labelFilter)

  if (filteredTasks.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        {tasks.length === 0 ? "タスクがありません" : "条件に一致するタスクがありません"}
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onLabelClick={onLabelClick}
        />
      ))}
    </div>
  )
}

