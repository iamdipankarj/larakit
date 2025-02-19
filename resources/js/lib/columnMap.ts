import type { SaleListSchema } from '@/lib/schema'

export const saleListColumnMap: Omit<
    Record<keyof SaleListSchema, string>,
    'processing_fee_percentage'
> = {
    sale_id: 'Sale ID',
    customer_name: 'Customer Name',
    product: 'Product',
    amount: 'Amount',
    sale_date: 'Sale Date',
    status: 'Status'
}
