export interface Order {
  id: number
  customer_name: string
  customer_email: string
  order_date: Date
  amount_in_cents: number
  status: "pending" | "completed"
  created_at: Date
  updated_at: Date
}

export interface PaginationLinks {
  id: number
  url: string
  label: string
  active: boolean
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: PaginationLinks[]
}
