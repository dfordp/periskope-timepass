"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FiMail, FiPhone, FiUser, FiCheckCircle } from "react-icons/fi"
import { supabase } from "@/app/helpers/supabase"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState<'details' | 'confirmation' | 'verifying'>('details')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      const hash = window.location.hash.substring(1)
      
      if (!hash) return
      
      setStep('verifying')
      setError(null)
      
      const params = new URLSearchParams(hash)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const type = params.get('type')
      
      if (type === 'signup' && accessToken) {
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken)
          
          if (userError) throw userError
          
          if (user) {
            // Update user verification status
            const { error: updateError } = await supabase
              .from('User')
              .update({ isVerified: true })
              .eq('email', user.email)
            
            if (updateError) throw updateError

            // Set session
            if (refreshToken) {
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              })
            }
            
            // Clear hash and redirect
            window.location.hash = ''
            router.push('/chat')
          }
        } catch (error) {
          console.error('Verification error:', error)
          setError('Failed to verify your account. Please try again.')
          setStep('details')
        }
      }
    }

    handleAuthCallback()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Handle base signup
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: crypto.randomUUID(), // Generate random password
        options: {
          emailRedirectTo: `${window.location.origin}/sign-up`
        }
      })

      if (signUpError) throw signUpError

      // Create user record
      const { error: userError } = await supabase
        .from('User')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isVerified: false,
        }])

      if (userError) throw userError

      // Show confirmation screen
      setStep('confirmation')
    } catch (error) {
      console.error('Signup error:', error)
      setError('Failed to create your account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-zinc-500">Verifying your account...</p>
        </div>
      </div>
    )
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
        <div className="w-full max-w-[400px] space-y-8 text-center">
          <div className="space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold text-zinc-900">Check your email</h1>
              <p className="text-sm text-zinc-500">
                We have sent a verification link to<br />
                <span className="font-medium text-zinc-700">{formData.email}</span>
              </p>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg p-4">
            <p className="text-sm text-zinc-600">
              Click the link in your email to verify your account and continue.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={() => window.location.reload()}
            >
              Did not receive the email?
            </Button>

            <p className="text-sm text-zinc-500">
              Wrong email?{" "}
              <button
                onClick={() => setStep('details')}
                className="text-green-600 hover:text-green-700"
              >
                Go back
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-green-600 text-xl font-semibold">P</span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">Create your account</h1>
          <p className="text-sm text-zinc-500">Enter your details to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Full Name</label>
              <div className="relative">
                <Input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white"
                  required
                />
                <FiUser className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white"
                  required
                />
                <FiMail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Phone Number</label>
              <div className="relative">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-white"
                  required
                />
                <FiPhone className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <a href="/sign-in" className="text-green-600 hover:text-green-700">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}