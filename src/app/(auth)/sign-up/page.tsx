"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FiMail, FiPhone, FiUser, FiCamera } from "react-icons/fi"
import Image from "next/image"
import { supabase } from "@/app/helpers/supabase"

export default function SignUpPage() {
  const [step, setStep] = useState<'details' | 'verify'>('details')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      
    }
     catch (error) {
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-green-600 text-xl font-semibold">P</span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">
            {step === 'details' ? 'Create your account' : 'Verify your identity'}
          </h1>
          <p className="text-sm text-zinc-500">
            {step === 'details' 
              ? 'Enter your details to get started' 
              : 'Enter the verification code sent to your email/phone'}
          </p>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            {/* Avatar Upload */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FiUser className="h-8 w-8 text-zinc-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 h-6 w-6 bg-green-600 rounded-full flex items-center justify-center cursor-pointer">
                  <FiCamera className="h-3 w-3 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>

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
              {isLoading ? "Verifying..." : "Create account"}
            </Button>

            <button
              type="button"
              onClick={() => setStep('details')}
              className="w-full text-sm text-zinc-500 hover:text-zinc-600"
            >
              Back to details
            </button>
          </form>
        )}

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