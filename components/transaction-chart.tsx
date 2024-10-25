'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

interface Transaction {
  date: string
  USD: number
  EUR: number
  GBP: number
}

interface TransactionChartProps {
  transactions: Transaction[]
}

export default function TransactionChart({
  transactions
}: TransactionChartProps) {
  // Format the date to be more readable
  const formattedData = transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }))

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Transaction Summary
        </CardTitle>
        <CardDescription className='text-center'>
          Amount in USD, EUR, and GBP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            USD: { label: 'USD', color: '#87C15B' },
            EUR: { label: 'EUR', color: '#F4BBAD' },
            GBP: { label: 'GBP', color: '#264754' }
          }}
          className='h-[400px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={formattedData}>
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey='USD' fill='var(--color-USD)' />
              <Bar dataKey='EUR' fill='var(--color-EUR)' />
              <Bar dataKey='GBP' fill='var(--color-GBP)' />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
