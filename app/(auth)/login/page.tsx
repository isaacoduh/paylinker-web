'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    // For this example, we'll just redirect to the dashboard
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login-json',
        {
          email,
          password
        }
      )
      localStorage.setItem('token', response.data.access_token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed!', error)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-purple-700'>
            PayLinker
          </CardTitle>
          <CardDescription className='text-center'>
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform'
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <Eye className='h-4 w-4 text-gray-500' />
                  )}
                </button>
              </div>
            </div>
            <Button
              type='submit'
              className='w-full bg-purple-600 text-white hover:bg-purple-700'
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className='text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <a href='/signup' className='text-purple-600 hover:underline'>
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}
