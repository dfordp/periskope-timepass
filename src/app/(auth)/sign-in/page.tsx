"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FiMail, FiCheckCircle } from "react-icons/fi"
import { supabase } from "@/app/helpers/supabase"

export default function SignInPage() {
  const [step, setStep] = useState<'identifier' | 'confirmation'>('identifier')
  const [identifier, setIdentifier] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: identifier,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
      
      setStep('confirmation')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-[400px] space-y-8 text-center">
          <div className="space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold text-zinc-900">Check your email</h1>
              <p className="text-sm text-zinc-500">
                We've sent a sign in link to<br />
                <span className="font-medium text-zinc-700">{identifier}</span>
              </p>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg p-4">
            <p className="text-sm text-zinc-600">
              Click the link in your email to sign in to your account.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={() => window.location.reload()}
            >
              Didn't receive the email?
            </Button>

            <p className="text-sm text-zinc-500">
              Wrong email?{" "}
              <button
                onClick={() => setStep('identifier')}
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-green-600 text-xl font-semibold">P</span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">Sign in to Periskope</h1>
          <p className="text-sm text-zinc-500">Enter your email to get started</p>
        </div>

        <form onSubmit={handleRequestLink} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Email</label>
            <div className="relative">
              <Input
                type="email"
                placeholder="name@company.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-10 h-11 bg-white"
                required
              />
              <FiMail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending link..." : "Send magic link"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-green-600 hover:text-green-700">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}