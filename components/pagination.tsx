"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { PaginationMeta } from "@/lib/types"
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

interface PaginationProps {
  meta: PaginationMeta
}

export default function Pagination({ meta }: PaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const links = meta.links.map((link, index) => ({
    ...link,
    id: index,
  }))

  const firstDisabled =
    searchParams.get("page") === "1" || !searchParams.get("page")

  const lastDisabled = meta.last_page.toString() === searchParams.get("page")

  const handleClickPage = (page: number) => {
    const params = new URLSearchParams(searchParams)

    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClickPrevious = () => {
    if (firstDisabled) return
    const currentPage = Number(searchParams.get("page"))
    handleClickPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (lastDisabled) return
    const currentPage = Number(searchParams.get("page"))
    handleClickPage(currentPage ? currentPage + 1 : 2)
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          onClick={handleClickPrevious}
          className={cn(
            !firstDisabled ? "cursor-pointer" : "cursor-auto text-slate-300"
          )}>
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (
            link.label.includes("Anterior") ||
            link.label.includes("Próximo")
          ) {
            return null
          }

          if (link.label === "...") {
            return (
              <PaginationItem key={link.id} className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={link.id} className="cursor-pointer">
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}>
                {link.label}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem
          onClick={handleNextPage}
          className={cn(
            !lastDisabled ? "cursor-pointer" : "cursor-auto text-slate-300"
          )}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
