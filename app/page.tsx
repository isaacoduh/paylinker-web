import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <div
        className='flex flex-1 items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')",
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className='max-w-3xl p-8 text-center text-white'>
          <h1 className='mb-6 text-5xl font-bold'>Welcome to Paylinker</h1>
          <p className='mb-8 text-xl'>
            Simplify your payments and boost your business with our cutting-edge
            payment link service.
          </p>
          <div className='flex justify-center space-x-4'>
            <Button
              asChild
              size='lg'
              className='bg-purple-600 text-white hover:bg-purple-700'
            >
              <Link href='/signup'>Sign Up</Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white bg-transparent text-white hover:bg-white hover:text-purple-600'
            >
              <Link href='/login'>Log In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-gray-100 py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-12 text-center text-3xl font-bold'>
            Why Choose Us?
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <FeatureCard
              icon='https://cdn-icons-png.flaticon.com/512/2519/2519373.png'
              title='Easy Integration'
              description='Seamlessly integrate our payment solution into your existing systems.'
            />
            <FeatureCard
              icon='https://cdn-icons-png.flaticon.com/512/1584/1584942.png'
              title='Secure Transactions'
              description='State-of-the-art security measures to protect your payments.'
            />
            <FeatureCard
              icon='https://cdn-icons-png.flaticon.com/512/3176/3176395.png'
              title='24/7 Support'
              description='Our dedicated team is always ready to assist you.'
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-800 py-8 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <p>&copy; 2024 PayLinker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className='rounded-lg bg-white p-6 text-center shadow-md'>
      <img src={icon} alt={title} className='mx-auto mb-4 h-16 w-16' />
      <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}
