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
import DashboardLayout from '../dashboard/page'

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
        <CardContent>
          <div className='mb-4 flex space-x-4'>
            <Input
              type='date'
              placeholder='Filter by date'
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className='w-40'
            />
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='Filter by currency' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All Currencies</SelectItem>
                <SelectItem value='USD'>USD</SelectItem>
                <SelectItem value='EUR'>EUR</SelectItem>
                <SelectItem value='GBP'>GBP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All Statuses</SelectItem>
                <SelectItem value='Completed'>Completed</SelectItem>
                <SelectItem value='Pending'>Pending</SelectItem>
                <SelectItem value='Failed'>Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setDateFilter('')
                setCurrencyFilter('')
                setStatusFilter('')
              }}
              className='bg-gray-600 text-white hover:bg-gray-700'
            >
              Clear Filters
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.currency}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        payment.status === 'Completed'
                          ? 'bg-green-200 text-green-800'
                          : payment.status === 'Pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
