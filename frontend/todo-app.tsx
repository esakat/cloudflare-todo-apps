"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task, User, CompletionFilter } from "./types"
import { getAllLabelsFromTasks } from "./utils"
import { UserMenu } from "./components/user-menu"
import { TaskForm } from "./components/task-form"
import { FilterControls } from "./components/filter-controls"
import { TaskList } from "./components/task-list"

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "買い物リストを作成する", completed: false, labels: ["買い物", "重要"] },
    { id: 2, text: "プレゼンテーションの準備", completed: false, labels: ["仕事", "緊急"] },
    { id: 3, text: "ジムに行く", completed: true, labels: ["健康"] },
    { id: 4, text: "週次レポートを提出", completed: false, labels: ["仕事"] },
    { id: 5, text: "家族との夕食", completed: true, labels: ["家族", "重要"] },
  ])

  const [availableLabels, setAvailableLabels] = useState<string[]>(["仕事", "買い物", "健康", "重要", "緊急", "家族"])
  const [user, setUser] = useState<User>({
    name: "山田太郎",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  // Filters
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>("all")
  const [labelFilter, setLabelFilter] = useState<string[]>([])

  // Add a new task
  const addTask = (text: string, labels: string[]) => {
    const newTaskObj: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
      text,
      completed: false,
      labels: [...labels],
    }

    setTasks([...tasks, newTaskObj])
  }

  // Toggle task completion
  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Add a new label
  const addLabel = (label: string) => {
    if (label.trim() === "" || availableLabels.includes(label)) return
    setAvailableLabels([...availableLabels, label])
  }

  // Toggle a label filter
  const toggleLabelFilter = (label: string) => {
    if (labelFilter.includes(label)) {
      setLabelFilter(labelFilter.filter((l) => l !== label))
    } else {
      setLabelFilter([...labelFilter, label])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setLabelFilter([])
    setCompletionFilter("all")
  }

  // Logout function
  const logout = () => {
    alert("ログアウトしました")
    // In a real app, you would handle actual logout logic here
  }

  // Get all unique labels from tasks
  const taskLabels = getAllLabelsFromTasks(tasks)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">タスク管理アプリ</CardTitle>
          <UserMenu user={user} onLogout={logout} />
        </CardHeader>
        <CardContent className="space-y-6">
          <TaskForm availableLabels={availableLabels} onAddTask={addTask} onAddLabel={addLabel} />

          <FilterControls
            completionFilter={completionFilter}
            labelFilter={labelFilter}
            availableLabels={taskLabels}
            onCompletionFilterChange={setCompletionFilter}
            onLabelFilterToggle={toggleLabelFilter}
            onClearFilters={clearFilters}
          />

          <TaskList
            tasks={tasks}
            completionFilter={completionFilter}
            labelFilter={labelFilter}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onLabelClick={toggleLabelFilter}
          />
        </CardContent>
      </Card>
    </div>
  )
}

