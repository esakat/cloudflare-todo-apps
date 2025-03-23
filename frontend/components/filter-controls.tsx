"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { CompletionFilter } from "../types"
import { getLabelColor } from "../utils"

interface FilterControlsProps {
  completionFilter: CompletionFilter
  labelFilter: string[]
  availableLabels: string[]
  onCompletionFilterChange: (value: CompletionFilter) => void
  onLabelFilterToggle: (label: string) => void
  onClearFilters: () => void
}

export function FilterControls({
  completionFilter,
  labelFilter,
  availableLabels,
  onCompletionFilterChange,
  onLabelFilterToggle,
  onClearFilters,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Tabs value={completionFilter} onValueChange={(value) => onCompletionFilterChange(value as CompletionFilter)}>
          <TabsList>
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="active">未完了</TabsTrigger>
            <TabsTrigger value="completed">完了済み</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={labelFilter.length > 0 ? "bg-primary/20" : ""}>
                <Filter className="h-4 w-4 mr-2" />
                ラベルでフィルター
                {labelFilter.length > 0 && <Badge className="ml-2">{labelFilter.length}</Badge>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">ラベルでフィルター</h4>
                <div className="flex flex-wrap gap-1 pt-2">
                  {availableLabels.map((label) => (
                    <Badge
                      key={label}
                      variant={labelFilter.includes(label) ? "default" : "outline"}
                      className={`cursor-pointer ${labelFilter.includes(label) ? getLabelColor(label) : ""}`}
                      onClick={() => onLabelFilterToggle(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
                {(labelFilter.length > 0 || completionFilter !== "all") && (
                  <Button variant="ghost" size="sm" className="w-full mt-2" onClick={onClearFilters}>
                    フィルターをクリア
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {labelFilter.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">フィルター中:</span>
          {labelFilter.map((label) => (
            <Badge
              key={label}
              className={`cursor-pointer ${getLabelColor(label)}`}
              onClick={() => onLabelFilterToggle(label)}
            >
              {label} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

