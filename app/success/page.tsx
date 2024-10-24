'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import axios from 'axios'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [transactionId, setTransactionId] = useState('')
  const [amountPaid, setAmountPaid] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!sessionId) return

      try {
        // Now make the request to Stripe API to get the session details
        const stripeResponse = await axios.get(
          `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRIPE_KEY}`
            }
          }
        )

        const { id, amount_total } = stripeResponse.data

        setTransactionId(id)
        setAmountPaid((amount_total / 100).toFixed(2)) // Stripe returns amount in cents
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError('Failed to retrieve transaction details.')
        setLoading(false)
      }
    }

    fetchTransactionDetails()
  }, [sessionId])

  if (loading) {
    return <Loader2 />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-6 w-6 text-green-600' />
          </div>
          <CardTitle className='text-center text-2xl font-bold text-green-600'>
            Payment Successful!
          </CardTitle>
          <CardDescription className='text-center'>
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='text-center'>
            <p className='font-semibold'>Transaction ID:</p>
            <p className='text-gray-600'>{transactionId}</p>
          </div>
          <div className='text-center'>
            <p className='font-semibold'>Amount Paid:</p>
            <p className='text-gray-600'>${amountPaid}</p>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Button asChild className='w-full'>
            <Link href='/dashboard'>Go to Dashboard</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/support'>Need Help?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
