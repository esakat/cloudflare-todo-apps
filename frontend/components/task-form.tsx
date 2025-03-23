"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getLabelColor } from "../utils"

interface TaskFormProps {
  availableLabels: string[]
  onAddTask: (text: string, labels: string[]) => void
  onAddLabel: (label: string) => void
}

export function TaskForm({ availableLabels, onAddTask, onAddLabel }: TaskFormProps) {
  const [newTask, setNewTask] = useState("")
  const [newLabel, setNewLabel] = useState("")
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim() === "") return

    onAddTask(newTask, selectedLabels)
    setNewTask("")
    setSelectedLabels([])
  }

  const toggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label))
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  const handleAddLabel = () => {
    if (newLabel.trim() === "" || availableLabels.includes(newLabel)) return
    onAddLabel(newLabel)
    setNewLabel("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="新しいタスクを入力..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Tag className="h-4 w-4" />
              <span className="sr-only">ラベルを追加</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ラベルを選択</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-wrap gap-2">
                {availableLabels.map((label) => (
                  <Badge
                    key={label}
                    variant={selectedLabels.includes(label) ? "default" : "outline"}
                    className={`cursor-pointer ${selectedLabels.includes(label) ? getLabelColor(label) : ""}`}
                    onClick={() => toggleLabel(label)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="新しいラベル..." value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
                <Button type="button" onClick={handleAddLabel} size="sm">
                  追加
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button type="submit">
          <PlusCircle className="h-4 w-4 mr-2" />
          追加
        </Button>
      </div>
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Label className="text-sm text-muted-foreground">選択中のラベル:</Label>
          {selectedLabels.map((label) => (
            <Badge key={label} className={`cursor-pointer ${getLabelColor(label)}`} onClick={() => toggleLabel(label)}>
              {label} ×
            </Badge>
          ))}
        </div>
      )}
    </form>
  )
}

