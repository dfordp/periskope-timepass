"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FiMail, FiPhone, FiUser, FiCamera, FiCheckCircle } from "react-icons/fi"
import Image from "next/image"
import { supabase } from "@/app/helpers/supabase"

export default function SignUpPage() {
  const [step, setStep] = useState<'details' | 'confirmation'>('details')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Handle base signup
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: "696969",
      })

      if (signUpError) throw signUpError

      // Handle avatar upload
      let avatarUrl = ""
      if (avatar) {
        const filePath = `avatars/${Date.now()}-${avatar.name}`
        const { error: storageError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatar)

        if (!storageError) {
          const { data: storedData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)
          avatarUrl = storedData.publicUrl
        }
      }

      // Create user record
      const { error: userError } = await supabase
        .from('User')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isVerified: false,
          avatar: avatarUrl
        }])

      if (userError) throw userError

      // Show confirmation screen
      setStep('confirmation')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
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
                We've sent a verification link to<br />
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
              Didn't receive the email?
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

        <form onSubmit={handleSubmit} className="space-y-4">
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