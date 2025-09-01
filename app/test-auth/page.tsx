'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TestAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')

  const testConnection = async () => {
    try {
      setResult('Testing connection...')
      
      // Test 1: Basic connection
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      
      if (testError) {
        setResult(`❌ Database Error: ${testError.message}`)
        return
      }
      
      setResult('✅ Database connection successful!')
      
    } catch (error: any) {
      setResult(`❌ Connection Error: ${error.message}`)
    }
  }

  const testSignup = async () => {
    if (!email || !password) {
      setResult('❌ Please enter email and password')
      return
    }

    try {
      setResult('Testing signup...')
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setResult(`❌ Auth Error: ${error.message}`)
        return
      }

      setResult(`✅ Signup successful! User ID: ${data.user?.id}`)
      
    } catch (error: any) {
      setResult(`❌ Signup Error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
        
        <div className="space-y-4">
          <Button onClick={testConnection} className="w-full">
            Test Database Connection
          </Button>
          
          <Input
            type="email"
            placeholder="Test email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type="password"
            placeholder="Test password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button onClick={testSignup} className="w-full">
            Test Signup
          </Button>
          
          <div className="p-4 bg-gray-100 rounded min-h-[100px]">
            <strong>Result:</strong>
            <pre className="mt-2 text-sm">{result}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
