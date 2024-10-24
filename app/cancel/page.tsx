import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function PaymentCancel() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
            <XCircle className='h-6 w-6 text-red-600' />
          </div>
          <CardTitle className='text-center text-2xl font-bold text-red-600'>
            Payment Cancelled
          </CardTitle>
          <CardDescription className='text-center'>
            Your payment was not processed. If you encountered any issues,
            please try again or contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-gray-600'>
            If you have any questions or concerns, our support team is here to
            help you.
          </p>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Button asChild className='w-full'>
            <Link href='/checkout'>Try Again</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/support'>Contact Support</Link>
          </Button>
          <Button asChild variant='link' className='w-full'>
            <Link href='/'>Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
