'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function CreatePaymentLink() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [description, setDescription] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically call your backend API to create the payment link
    // For this example, we'll just generate a mock URL
    const payload = {
      amount,
      currency,
      description,
      expiration_date: expirationDate
    }
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/payment-links',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setGeneratedUrl(response.data.link_url)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Redirect to login if 401 Unauthorized
        router.push('/login')
      } else {
        console.error('Error creating payment link:', error)
      }
    }

    // const mockUrl = `https://pay.example.com/${Math.random().toString(36).substring(7)}`
    // setGeneratedUrl(mockUrl)
  }

  const handlePreview = () => {
    // Generate a preview URL based on the current form data
    const previewUrl = `/payment-page?amount=${amount}&currency=${currency}&description=${encodeURIComponent(description)}`
    setPreviewUrl(previewUrl)
  }

  return (
    <DashboardLayout>
      <Card className='mx-auto w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-purple-700'>
            Create Payment Link
          </CardTitle>
          <CardDescription>
            Fill in the details to generate a new payment link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                placeholder='Enter amount'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='currency'>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder='Select currency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                  <SelectItem value='GBP'>GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Enter payment description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='expiration'>Expiration Date</Label>
              <Input
                id='expiration'
                type='date'
                value={expirationDate}
                onChange={e => setExpirationDate(e.target.value)}
                required
              />
            </div>
            <div className='flex space-x-2'>
              <Button
                type='submit'
                className='bg-purple-600 text-white hover:bg-purple-700'
              >
                Generate Link
              </Button>
              <Button
                type='button'
                onClick={handlePreview}
                className='bg-gray-600 text-white hover:bg-gray-700'
              >
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
        {generatedUrl && (
          <CardFooter className='flex flex-col items-start'>
            <h3 className='mb-2 text-lg font-semibold text-purple-700'>
              Generated Payment Link:
            </h3>
            <a
              href={generatedUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='break-all text-blue-600 hover:underline'
            >
              {generatedUrl}
            </a>
          </CardFooter>
        )}
        {previewUrl && (
          <CardFooter className='flex flex-col items-start'>
            <h3 className='mb-2 text-lg font-semibold text-purple-700'>
              Preview:
            </h3>
            <iframe
              src={previewUrl}
              className='h-96 w-full rounded-md border'
            />
          </CardFooter>
        )}
      </Card>
    </DashboardLayout>
  )
}
