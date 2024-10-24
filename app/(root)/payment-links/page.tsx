'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Copy, AlertCircle, Pencil, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/layouts/DashboardLayout'

interface PaymentLink {
  id: string
  description: string
  amount: number
  currency: string
  link_url: string
  expiration_date: string
}

export default function PaymentLinksList() {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPaymentLinks = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'http://127.0.0.1:8000/payment-links',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setPaymentLinks(response.data)
        setError(null)
      } catch (error) {
        setError('Failed to fetch payment links. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentLinks()
  }, [])

  const handleCopyLink = (linkUrl: string) => {
    navigator.clipboard
      .writeText(linkUrl)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link. Please try again.'))
  }

  const handleEditLink = (linkId: string) => {
    // Implement edit functionality
    console.log(`Edit link with ID: ${linkId}`)
  }

  const handleDeleteLink = (linkId: string) => {
    // Implement delete functionality
    console.log(`Delete link with ID: ${linkId}`)
  }

  return (
    <DashboardLayout>
      <div className='container mx-auto p-4'>
        <h1 className='mb-6 text-3xl font-bold text-purple-700'>
          Your Payment Links
        </h1>

        {isLoading ? (
          <div className='space-y-4'>
            {[...Array(3)].map((_, index) => (
              <Card key={index} className='w-full'>
                <CardHeader>
                  <Skeleton className='h-4 w-2/3' />
                  <Skeleton className='h-4 w-1/2' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='mb-2 h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </CardContent>
                <CardFooter>
                  <Skeleton className='mr-2 h-10 w-20' />
                  <Skeleton className='h-10 w-20' />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : paymentLinks.length === 0 ? (
          <Card>
            <CardContent className='py-6 text-center'>
              <p className='text-lg text-gray-600'>No payment links found.</p>
              <Button className='mt-4 bg-purple-600 text-white hover:bg-purple-700'>
                Create Your First Payment Link
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {paymentLinks.map(link => (
              <Card key={link.id} className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='text-xl font-semibold'>
                    {link.description}
                  </CardTitle>
                  <CardDescription>
                    {link.amount} {link.currency}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='mb-2 text-sm text-gray-600'>
                    Link URL:
                    <a
                      href={link.link_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='ml-1 break-all text-blue-600 hover:underline'
                    >
                      {link.link_url}
                    </a>
                  </p>
                  <p className='text-sm text-gray-600'>
                    Expiration Date:{' '}
                    {new Date(link.expiration_date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleCopyLink(link.link_url)}
                    className='flex items-center'
                  >
                    <Copy className='mr-1 h-4 w-4' />
                    Copy
                  </Button>
                  <div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleEditLink(link.id)}
                      className='mr-2'
                    >
                      <Pencil className='mr-1 h-4 w-4' />
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDeleteLink(link.id)}
                    >
                      <Trash2 className='mr-1 h-4 w-4' />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
