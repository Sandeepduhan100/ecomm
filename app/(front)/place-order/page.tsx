import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Place Order',
}

export default async function PlaceOrderPage() {
  return <Form />
}