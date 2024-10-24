'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import DashboardLayout from '@/components/layouts/DashboardLayout'

// Mock data for payments
const mockPayments = [
  {
    id: 1,
    amount: 100,
    currency: 'USD',
    status: 'Completed',
    date: '2023-05-01'
  },
  { id: 2, amount: 75, currency: 'EUR', status: 'Pending', date: '2023-05-02' },
  { id: 3, amount: 50, currency: 'GBP', status: 'Failed', date: '2023-05-03' }
  // Add more mock data as needed
]

export default function PaymentsDashboard() {
  const [payments, setPayments] = useState(mockPayments)
  const [filteredPayments, setFilteredPayments] = useState(payments)
  const [dateFilter, setDateFilter] = useState('')
  const [currencyFilter, setCurrencyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      const randomPayment =
        mockPayments[Math.floor(Math.random() * mockPayments.length)]
      const updatedPayment = {
        ...randomPayment,
        status: ['Completed', 'Pending', 'Failed'][
          Math.floor(Math.random() * 3)
        ]
      }
      setPayments(prevPayments =>
        prevPayments.map(p => (p.id === updatedPayment.id ? updatedPayment : p))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = payments
    if (dateFilter) {
      filtered = filtered.filter(p => p.date === dateFilter)
    }
    if (currencyFilter) {
      filtered = filtered.filter(p => p.currency === currencyFilter)
    }
    if (statusFilter) {
      filtered = filtered.filter(p => p.status === statusFilter)
    }
    setFilteredPayments(filtered)
  }, [payments, dateFilter, currencyFilter, statusFilter])

  return (
    <DashboardLayout>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-purple-700'>
            Payments Dashboard
          </CardTitle>
          <CardDescription>Track and filter your payments</CardDescription>
        </CardHeader>
      </Card>
    </DashboardLayout>
  )
}
