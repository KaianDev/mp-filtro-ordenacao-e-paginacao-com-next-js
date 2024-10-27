"use client"

import type { Order } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface OrdersTableProps {
  orders: Order[]
}

const formatCurrency = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
})

enum SortKey {
  amount = "amount_in_cents",
  date = "order_date",
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSort = (key: SortKey) => {
    const params = new URLSearchParams(searchParams)

    if (params.get("sort") === key) {
      params.set("sort", `-${key}`)
    } else if (params.get("sort") === `-${key}`) {
      params.delete("sort")
    } else if (key) {
      params.set("sort", key)
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const getSortIcon = (key: SortKey) => {
    if (searchParams.get("sort") === key) {
      return <ChevronDown className="w-4" />
    } else if (searchParams.get("sort") === `-${key}`) {
      return <ChevronUp className="w-4" />
    } else {
      return <ChevronsUpDown className="w-4" />
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="hidden md:table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSort(SortKey.date)}>
            <div className="flex items-center gap-1">
              Data
              {getSortIcon(SortKey.date)}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleSort(SortKey.amount)}>
            Valor
            {getSortIcon(SortKey.amount)}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === "pending" ? "Pendente" : "Completo"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.order_date.toString()}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency.format(order.amount_in_cents / 100)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
