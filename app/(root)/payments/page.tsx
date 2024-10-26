'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
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
import { Badge } from '@/components/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/payments/transactions`

interface Transaction {
  id: number
  payment_method: string
  payment_link_id: number
  transaction_id: string
  status: string
  created_at: string
  updated_at: string
}

export default function TransactionsDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState('')
  const [currencyFilter, setCurrencyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchTransactions = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(API_URL, {
        params: {
          date: dateFilter || undefined,
          currency: currencyFilter || undefined,
          transaction_status: statusFilter || undefined,
          page: currentPage,
          per_page: 10
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTransactions(response.data.transactions)
      setTotalPages(response.data.total_pages)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setError('Failed to fetch transactions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [dateFilter, currencyFilter, statusFilter, currentPage])

  const handleClearFilters = () => {
    setDateFilter('')
    setCurrencyFilter('')
    setStatusFilter('')
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-purple-700'>
            Transactions Dashboard
          </CardTitle>
          <CardDescription>View and filter your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4 flex flex-wrap gap-4'>
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
                {/* <SelectItem value='ALL'>All Currencies</SelectItem> */}
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
                {/* <SelectItem value='All'>All Statuses</SelectItem> */}
                <SelectItem value='success'>Success</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='failed'>Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleClearFilters}
              variant='outline'
              className='ml-auto'
            >
              Clear Filters
            </Button>
          </div>

          {loading ? (
            <div className='py-4 text-center'>Loading transactions...</div>
          ) : error ? (
            <div className='py-4 text-center text-red-600'>{error}</div>
          ) : transactions.length === 0 ? (
            <div className='py-4 text-center'>No transactions found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.transaction_id}</TableCell>
                    <TableCell className='capitalize'>
                      {transaction.payment_method?.replace('_', ' ')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(transaction.created_at)}</TableCell>
                    <TableCell>{formatDate(transaction.updated_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <Pagination className='mt-4'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
