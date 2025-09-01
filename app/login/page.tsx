'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sparkles, Loader } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      await signIn(formData.email, formData.password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      // Error handling is done in the auth context with toasts
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              OutThere
            </Link>
            <Link 
              href="/signup" 
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Need an account? Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue connecting with amazing people
            </p>
          </div>
          
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                <div className="text-center space-y-3 pt-4">
                  <div className="text-gray-500 text-sm">
                    Forgot your password? Contact support for now.
                  </div>
                  <div>
                    <Link href="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                      Don't have an account? Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Account Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Demo Account</h3>
            <p className="text-sm text-blue-700 mb-2">
              For testing purposes, you can create a new account or use any valid email/password combination once you set up your Supabase database.
            </p>
            <p className="text-xs text-blue-600">
              Make sure to configure your environment variables first!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 