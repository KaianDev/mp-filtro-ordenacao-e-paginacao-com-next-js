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
