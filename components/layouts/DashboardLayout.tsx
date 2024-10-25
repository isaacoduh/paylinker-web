'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CreditCard, BarChart, Link as LinkIcon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-purple-700 p-6 text-white'>
        <h1 className='mb-8 text-2xl font-bold'>PayLinker</h1>
        <nav className='space-y-4'>
          <Link
            href='/dashboard'
            className={`flex items-center space-x-2 ${activeTab === 'dashboard' ? 'text-purple-200' : 'hover:text-purple-200'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart className='h-5 w-5' />
            <span>Dashboard</span>
          </Link>
          <Link
            href='/payment-links'
            className={`flex items-center space-x-2 ${activeTab === 'payment-links' ? 'text-purple-200' : 'hover:text-purple-200'}`}
            onClick={() => setActiveTab('payment-links')}
          >
            <LinkIcon className='h-5 w-5' />
            <span>Payment Links</span>
          </Link>
          <Link
            href='/create-payment-link'
            className={`flex items-center space-x-2 ${activeTab === 'create-payment-link' ? 'text-purple-200' : 'hover:text-purple-200'}`}
            onClick={() => setActiveTab('create-payment-link')}
          >
            <LinkIcon className='h-5 w-5' />
            <span>Create Payment Link</span>
          </Link>
          <Link
            href='/payments'
            className={`flex items-center space-x-2 ${activeTab === 'payments' ? 'text-purple-200' : 'hover:text-purple-200'}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard className='h-5 w-5' />
            <span>Payments</span>
          </Link>
        </nav>
        <Button
          onClick={handleLogout}
          className='absolute bottom-6 mt-auto flex items-center space-x-2 bg-purple-600 text-white hover:bg-purple-800'
        >
          <LogOut className='h-5 w-5' />
          <span>Logout</span>
        </Button>
      </aside>

      {/* Main content */}
      <main className='flex-1 p-8'>{children}</main>
    </div>
  )
}
