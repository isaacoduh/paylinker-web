'use client'

import { useState } from 'react'
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import { Button } from '@/components/ui/button'

interface PerformanceData {
  link_id: number
  description: string
  total_transactions: number
  successful_transactions: number
  total_amount: number
}

interface PerformanceChartsProps {
  performance: PerformanceData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function PerformanceCharts({
  performance
}: PerformanceChartsProps) {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie')

  const data = performance.map(item => ({
    name: item.description,
    value: item.total_amount
  }))

  const renderPieChart = () => (
    <ChartContainer
      config={{
        value: {
          label: 'Amount',
          color: '#8884D8'
        }
      }}
      className='h-[400px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={150}
            fill='#8884d8'
            dataKey='value'
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )

  const renderBarChart = () => (
    <ChartContainer
      config={{
        value: {
          label: 'Amount',
          color: '#8884D8'
        }
      }}
      className='h-[400px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          layout='vertical'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' width={150} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey='value' fill='var(--color-value)' />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Payment Link Performance
        </CardTitle>
        <CardDescription className=''>
          Total amount per payment link
        </CardDescription>
        <div className='mt-4 flex space-x-4'>
          <Button
            onClick={() => setChartType('pie')}
            variant={chartType === 'pie' ? 'default' : 'outline'}
          >
            Pie Chart
          </Button>
          <Button
            onClick={() => setChartType('bar')}
            variant={chartType === 'bar' ? 'default' : 'outline'}
          >
            Bar Chart
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {chartType === 'pie' ? renderPieChart() : renderBarChart()}
      </CardContent>
    </Card>
  )
}
