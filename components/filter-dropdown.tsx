"use client"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

enum FilterStatus {
  Pending = "pending",
  Completed = "completed",
  All = "",
}

export default function FilterDropdown() {
  const [filterStatus, setFilterStatus] = React.useState(FilterStatus.All)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleChangeFilter = (value: FilterStatus) => {
    const params = new URLSearchParams(searchParams)
    setFilterStatus(value)
    if (value) {
      params.set("status", value)
    } else {
      params.delete("status")
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"default"}
          className="flex gap-2 text-slate-600">
          <Filter className="h-4 w-4" />
          Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterStatus}
          onValueChange={(value) => handleChangeFilter(value as FilterStatus)}>
          <DropdownMenuRadioItem value={FilterStatus.All}>
            Todos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={FilterStatus.Pending}>
            Pendente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={FilterStatus.Completed}>
            Completo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
