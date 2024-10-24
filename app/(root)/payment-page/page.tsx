'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setAmount(searchParams.get('amount') || '')
    setCurrency(searchParams.get('currency') || '')
    setDescription(searchParams.get('description') || '')
  }, [searchParams])

  const handlePayment = () => {
    // Here you would typically integrate with a payment processor
    alert('Payment processed successfully!')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-purple-700'>
            Payment Details
          </CardTitle>
          <CardDescription className='text-center'>
            Review and complete your payment
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='text-center'>
            <p className='text-4xl font-bold text-purple-700'>
              {amount} {currency}
            </p>
          </div>
          <div className='text-center'>
            <p className='text-gray-600'>{description}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePayment}
            className='w-full bg-purple-600 text-white hover:bg-purple-700'
          >
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
