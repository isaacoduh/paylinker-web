'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Legend,
  LineChart,
  Line
} from 'recharts'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import TransactionChart from '@/components/transaction-chart'
import PerformanceCharts from '@/components/performance-charts'

export default function AnalyticsDashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_earnings: {} as any,
    transactions: [],
    performance: []
  })
  const [activeTab, setActiveTab] = useState('transactions')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    async function fetchDashboardData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setDashboardData(response?.data)
      } catch (error: any) {
        console.log(error)
        if (error.response && error.response.status === 401) {
          // If unauthorized, log out and redirect to login
          localStorage.removeItem('token')
          router.push('/login') // Redirect to login page
        } else {
          setError('Failed to fetch payment links. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()

    if (userId) {
      const socket = new WebSocket(`ws://127.0.0.1:8000/dashboard/ws/${userId}`)
      socket.onmessage = event => {
        const data = JSON.parse(event?.data)
        setDashboardData(prevData => ({
          ...prevData,
          total_earnings: data?.total_earnings
        }))
      }
      socket.onclose = () => {
        console.log('Websocket connection closed!')
      }
      return () => socket.close()
    }
  }, [])

  const total_earnings = dashboardData.total_earnings
  const transactions = dashboardData.transactions
  const performance = dashboardData.performance

  if (loading) {
    return (
      <DashboardLayout>
        <div className='container mx-auto p-4'>
          <h1 className='mb-6 text-3xl font-bold text-purple-700'>
            Loading...
          </h1>
          <div className='animate-pulse'>
            <div className='mb-4 h-48 rounded bg-gray-200' />
            <div className='mb-4 h-48 rounded bg-gray-200' />
            <div className='mb-4 h-48 rounded bg-gray-200' />
          </div>
        </div>
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout>
      <div className='container mx-auto p-4'>
        <h1 className='mb-6 text-3xl font-bold text-purple-700'>
          Analytics Dashboard
        </h1>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Earnings (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${total_earnings?.USD?.toLocaleString() as any}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Earnings (GBP)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                &pound;{total_earnings?.GBP?.toLocaleString() as any}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Earnings (EUR)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                &euro;{total_earnings?.EUR?.toLocaleString() as any}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='mt-10 grid gap-6'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value='transactions'>Transactions</TabsTrigger>
              <TabsTrigger value='performance'>Performance</TabsTrigger>
            </TabsList>
            <TabsContent value='transactions'>
              <TransactionChart transactions={transactions} />
              {/* <h2 className='mb-4 text-2xl font-semibold'>Your Transactions</h2> */}
            </TabsContent>
            <TabsContent value='performance' className='mt-6'>
              <PerformanceCharts performance={performance} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
