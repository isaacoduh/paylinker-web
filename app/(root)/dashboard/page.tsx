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

// Sample data for the dashboard
const earningsData = [
  { date: '2023-05-01', USD: 1200, EUR: 1000, GBP: 900 },
  { date: '2023-05-02', USD: 1500, EUR: 1300, GBP: 1100 },
  { date: '2023-05-03', USD: 1800, EUR: 1600, GBP: 1400 },
  { date: '2023-05-04', USD: 1300, EUR: 1100, GBP: 1000 },
  { date: '2023-05-05', USD: 2000, EUR: 1800, GBP: 1600 },
  { date: '2023-05-06', USD: 2200, EUR: 2000, GBP: 1800 },
  { date: '2023-05-07', USD: 1900, EUR: 1700, GBP: 1500 }
]

const linkPerformanceData = [
  { name: 'Link 1', clicks: 120, conversions: 80 },
  { name: 'Link 2', clicks: 90, conversions: 60 },
  { name: 'Link 3', clicks: 150, conversions: 100 },
  { name: 'Link 4', clicks: 80, conversions: 40 },
  { name: 'Link 5', clicks: 110, conversions: 70 }
]

export default function AnalyticsDashboard() {
  const totalEarnings = {
    USD: earningsData.reduce((sum, day) => sum + day.USD, 0),
    EUR: earningsData.reduce((sum, day) => sum + day.EUR, 0),
    GBP: earningsData.reduce((sum, day) => sum + day.GBP, 0)
  }

  const totalClicks = linkPerformanceData.reduce(
    (sum, link) => sum + link.clicks,
    0
  )
  const totalConversions = linkPerformanceData.reduce(
    (sum, link) => sum + link.conversions,
    0
  )
  const conversionRate = ((totalConversions / totalClicks) * 100).toFixed(2)

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
                ${totalEarnings.USD.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {totalClicks.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Conversions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {totalConversions.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='earnings' className='mt-6'>
          <TabsList>
            <TabsTrigger value='earnings'>Earnings</TabsTrigger>
            <TabsTrigger value='performance'>Link Performance</TabsTrigger>
          </TabsList>
          <TabsContent value='earnings'>
            <Card>
              <CardHeader>
                <CardTitle>Earnings by Currency</CardTitle>
                <CardDescription>
                  Daily earnings in USD, EUR, and GBP over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <ChartContainer
                  config={{
                    USD: {
                      label: 'USD',
                      color: '#87C15B'
                    },
                    EUR: {
                      label: 'EUR',
                      color: '#F4BBAD'
                    },
                    GBP: {
                      label: 'GBP',
                      color: '#264754'
                    }
                  }}
                  className='h-[400px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={earningsData}>
                      <XAxis dataKey='date' />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='USD'
                        stroke='var(--color-USD)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='EUR'
                        stroke='var(--color-EUR)'
                        strokeWidth={2}
                      />
                      <Line
                        type='monotone'
                        dataKey='GBP'
                        stroke='var(--color-GBP)'
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='performance'>
            <Card>
              <CardHeader>
                <CardTitle>Link Performance</CardTitle>
                <CardDescription>
                  Clicks and conversions for each payment link
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <ChartContainer
                  config={{
                    clicks: {
                      label: 'Clicks',
                      color: '#2A9D90'
                    },
                    conversions: {
                      label: 'Conversions',
                      color: '#E76E50'
                    }
                  }}
                  className='h-[400px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={linkPerformanceData}>
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey='clicks' fill='#2A9D90' />
                      <Bar dataKey='conversions' fill='#E76E50' />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
