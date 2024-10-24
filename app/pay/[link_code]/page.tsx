'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
import { Loader2 } from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const { link_code } = params // Extract the link code from URL

  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [description, setDescription] = useState('')
  const [linkId, setLinkId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/payment-links/${link_code}` // Fetch link details using the link code
        )
        const { id, amount, currency, description } = response.data

        setLinkId(id) // Store the link ID for later use
        setAmount(amount)
        setCurrency(currency)
        setDescription(description)
        setIsLoading(false)
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setError('Payment link not found.')
        } else {
          setError('An error occurred while fetching the payment details.')
        }
        setIsLoading(false)
      }
    }

    if (link_code) {
      fetchPaymentLink()
    }
  }, [link_code])

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/payments/create-transaction/${linkId}`
      ) // Use the link ID to create a transaction
      window.location.href = response.data.url // Redirect to Stripe Checkout
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError('Payment link not found.')
      } else {
        setError('An error occurred while initiating the payment.')
      }
    }
  }

  if (isLoading) {
    return <Loader2 />
  }

  if (error) {
    return <div>{error}</div>
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
