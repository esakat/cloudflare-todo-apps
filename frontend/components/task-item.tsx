"use client"

import { Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "../types"
import { getLabelColor } from "../utils"

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
  onLabelClick: (label: string) => void
}

export function TaskItem({ task, onToggleComplete, onDelete, onLabelClick }: TaskItemProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${task.completed ? "bg-muted/50" : ""}`}>
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="outline"
          size="icon"
          className={`h-6 w-6 rounded-full ${task.completed ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed && <Check className="h-3 w-3" />}
          <span className="sr-only">{task.completed ? "タスクを未完了にする" : "タスクを完了する"}</span>
        </Button>
        <div className="flex flex-col gap-1">
          <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.text}</span>
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label) => (
                <Badge
                  key={label}
                  className={`text-xs ${getLabelColor(label)} cursor-pointer`}
                  onClick={() => onLabelClick(label)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(task.id)}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">タスクを削除</span>
      </Button>
    </div>
  )
}

