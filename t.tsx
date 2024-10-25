// 'use client'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent
// } from '@/components/ui/chart'
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line
// } from 'recharts'
// import DashboardLayout from '@/components/layouts/DashboardLayout'
// import { useEffect, useState, useRef } from 'react'
// import axios from 'axios'

// import { useRouter } from 'next/navigation'

// // // Sample data for the dashboard
// const earningsData = [
//   { date: '2023-05-01', USD: 1200, EUR: 1000, GBP: 900 },
//   { date: '2023-05-02', USD: 1500, EUR: 1300, GBP: 1100 },
//   { date: '2023-05-03', USD: 1800, EUR: 1600, GBP: 1400 },
//   { date: '2023-05-04', USD: 1300, EUR: 1100, GBP: 1000 },
//   { date: '2023-05-05', USD: 2000, EUR: 1800, GBP: 1600 },
//   { date: '2023-05-06', USD: 2200, EUR: 2000, GBP: 1800 },
//   { date: '2023-05-07', USD: 1900, EUR: 1700, GBP: 1500 }
// ]

// // const linkPerformanceData = [
// //   { name: 'Link 1', clicks: 120, conversions: 80 },
// //   { name: 'Link 2', clicks: 90, conversions: 60 },
// //   { name: 'Link 3', clicks: 150, conversions: 100 },
// //   { name: 'Link 4', clicks: 80, conversions: 40 },
// //   { name: 'Link 5', clicks: 110, conversions: 70 }
// // ]

// export default function AnalyticsDashboard() {
//   const [totalEarnings, setTotalEarnings] = useState(null)
//   const [transactions, setTransactions] = useState(null)
//   // const [dashboardData, setDashboardData] = useState({
//   //   total_earnings: {} as any,
//   //   transactions: [],
//   //   performance: []
//   // })
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const userId = 2
//     const token = localStorage.getItem('token')
//     async function fetchDashboardData() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/dashboard', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         })
//         // setDashboardData(response.data)
//         setTotalEarnings(response?.data?.total_earnings)
//         setTransactions(response?.data?.transactions)
//       } catch (error: any) {
//         console.log(error)
//         if (error.response && error.response.status === 401) {
//           // If unauthorized, log out and redirect to login
//           localStorage.removeItem('token')
//           router.push('/login') // Redirect to login page
//         } else {
//           setError('Failed to fetch payment links. Please try again.')
//         }
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchDashboardData()
//     // if (userId) {
//     //   const socket = new WebSocket(`ws://127.0.0.1:8000/dashboard/ws/${userId}`)
//     //   socket.onmessage = event => {
//     //     const data = JSON.parse(event?.data)
//     //     setDashboardData(prevData => ({
//     //       ...prevData,
//     //       total_earnings: data?.total_earnings
//     //     }))
//     //   }
//     //   socket.onclose = () => {
//     //     console.log('Websocket connection closed!')
//     //   }
//     //   return () => socket.close()
//     // }
//   }, [])

//   // const totalEarnings = {
//   //   USD: earningsData.reduce((sum, day) => sum + day.USD, 0),
//   //   EUR: earningsData.reduce((sum, day) => sum + day.EUR, 0),
//   //   GBP: earningsData.reduce((sum, day) => sum + day.GBP, 0)
//   // }
//   // const totalEarnings = dashboardData?.total_earnings
//   // const transactions = dashboardData?.transactions
//   // const linkPerformanceData = dashboardData.performance

//   // // Calculate total clicks and conversions from performance data
//   // const totalClicks = linkPerformanceData.reduce(
//   //   (sum, link) => sum + link?.total_transactions!,
//   //   0
//   // )
//   // const totalConversions = linkPerformanceData.reduce(
//   //   (sum, link) => sum + link?.successful_transactions!,
//   //   0
//   // )
//   // const conversionRate = totalClicks
//   //   ? ((totalConversions / totalClicks) * 100).toFixed(2)
//   //   : 0
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className='container mx-auto p-4'>
//           <h1 className='mb-6 text-3xl font-bold text-purple-700'>
//             Loading...
//           </h1>
//           {/* You can replace this with a skeleton or spinner component */}
//           <div className='animate-pulse'>
//             <div className='mb-4 h-48 rounded bg-gray-200' />
//             <div className='mb-4 h-48 rounded bg-gray-200' />
//             <div className='mb-4 h-48 rounded bg-gray-200' />
//           </div>
//         </div>
//       </DashboardLayout>
//     )
//   }
//   return (
//     <DashboardLayout>
//       <div className='container mx-auto p-4'>
//         <h1 className='mb-6 text-3xl font-bold text-purple-700'>
//           Analytics Dashboard
//         </h1>

//         <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//               <CardTitle className='text-sm font-medium'>
//                 Total Earnings (USD)
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>
//                 ${totalEarnings?.USD?.toLocaleString()}
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//               <CardTitle className='text-sm font-medium'>
//                 Total Earnings (GBP)
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>
//                 &pound;{totalEarnings?.GBP?.toLocaleString()}
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//               <CardTitle className='text-sm font-medium'>
//                 Total Earnings (EUR)
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>
//                 &euro;{totalEarnings?.EUR?.toLocaleString()}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className='grid gap-6'>
//           <Tabs defaultValue='earnings' className='mt-6'>
//             <TabsList>
//               <TabsTrigger value='earnings'>Earnings</TabsTrigger>
//             </TabsList>
//             <TabsContent value='earnings'>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Earnings By Currency</CardTitle>
//                   <CardDescription>
//                     Daily Earnings in USD, EUR and GBP over the last couple of
//                     days
//                   </CardDescription>
//                   <CardContent className='pt-6'>
//                     {transactions && (
//                       <ChartContainer
//                         config={{
//                           USD: { label: 'USD', color: '#87C15B' },
//                           EUR: { label: 'EUR', color: '#F4BBAD' },
//                           GBP: { label: 'GBP', color: '#264754' }
//                         }}
//                         className='h-[400px]'
//                       >
//                         <ResponsiveContainer>
//                           <LineChart data={earningsData}>
//                             <XAxis dataKey='date' />
//                             <YAxis />
//                             <Tooltip content={<ChartTooltip />} />
//                             <Legend />
//                             <Line
//                               type='monotone'
//                               dataKey='USD'
//                               stroke='var(--color-USD)'
//                               strokeWidth={2}
//                             />
//                             <Line
//                               type='monotone'
//                               dataKey='EUR'
//                               stroke='var(--color-EUR)'
//                               strokeWidth={2}
//                             />
//                             <Line
//                               type='monotone'
//                               dataKey='GBP'
//                               stroke='var(--color-GBP)'
//                               strokeWidth={2}
//                             />
//                           </LineChart>
//                         </ResponsiveContainer>
//                       </ChartContainer>
//                     )}
//                   </CardContent>
//                 </CardHeader>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }
