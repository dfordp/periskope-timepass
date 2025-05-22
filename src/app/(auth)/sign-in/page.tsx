"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FiMail, FiPhone } from "react-icons/fi"

export default function SignInPage() {
  const [step, setStep] = useState<'identifier' | 'verify'>('identifier')
  const [identifier, setIdentifier] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your code sending logic here
      // await sendVerificationCode(identifier)
      setStep('verify')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your verification logic here
      // await verifyCode(verificationCode)
      router.push("/chat")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-green-600 text-xl font-semibold">P</span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">
            {step === 'identifier' ? 'Sign in to Periskope' : 'Verify your identity'}
          </h1>
          <p className="text-sm text-zinc-500">
            {step === 'identifier' 
              ? 'Enter your email or phone number' 
              : 'Enter the verification code sent to you'}
          </p>
        </div>

        {step === 'identifier' ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Email or Phone</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="name@company.com or +1234567890"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pl-10 h-11 bg-white"
                  required
                />
                {identifier.includes('@') ? (
                  <FiMail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                ) : (
                  <FiPhone className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending code..." : "Continue"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Verification Code</label>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="h-11 bg-white text-center text-2xl tracking-[0.5em] font-medium"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Sign in"}
            </Button>

            <button
              type="button"
              onClick={() => setStep('identifier')}
              className="w-full text-sm text-zinc-500 hover:text-zinc-600"
            >
              Try different email/phone
            </button>
          </form>
        )}

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