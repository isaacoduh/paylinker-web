'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

interface Transaction {
  id: number
  amount: number
  currency: string
  status: string
  created_at: string
}

interface LatestPaymentsProps {
  transactions: Transaction[]
}

export default function LatestPayments({ transactions }: LatestPaymentsProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
    return 0
  })

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
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
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Latest Payments</h2>
        <Button variant='outline'>Export</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>
              <Button variant='ghost' onClick={() => requestSort('id')}>
                ID <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant='ghost' onClick={() => requestSort('amount')}>
                Amount <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>
              <Button variant='ghost' onClick={() => requestSort('status')}>
                Status <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant='ghost' onClick={() => requestSort('created_at')}>
                Date <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className='font-medium'>{transaction.id}</TableCell>
              <TableCell>{transaction.amount.toLocaleString()}</TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(transaction.created_at)}</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Download receipt</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Contact support</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
