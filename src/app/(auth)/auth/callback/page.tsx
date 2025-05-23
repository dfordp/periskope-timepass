"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/helpers/supabase"
import Cookies from 'js-cookie'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the hash fragment from the URL
      const hash = window.location.hash.substring(1)
      
      if (!hash) return
      
      // Parse the hash parameters
      const params = new URLSearchParams(hash)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const expiresIn = params.get('expires_in')
      const type = params.get('type')
      
      if (type === 'magiclink' && accessToken && refreshToken) {
        try {
          // Get user data from the JWT
          const { data: { user }, error } = await supabase.auth.getUser(accessToken)
          
          if (error) throw error
          
          if (user) {
            // Save tokens and user data in cookies
            Cookies.set('access_token', accessToken, { 
              expires: Number(expiresIn) / (60 * 60 * 24), // Convert seconds to days
              secure: true,
              sameSite: 'strict'
            })
            
            Cookies.set('refresh_token', refreshToken, { 
              expires: 30, // 30 days
              secure: true,
              sameSite: 'strict'
            })
            
            Cookies.set('user_id', user.id, {
              secure: true,
              sameSite: 'strict'
            })

            // Update session in Supabase
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            })

            // Clear the hash and redirect to chat
            window.location.hash = ''
            router.push('/chat')
          }
        } catch (error) {
          console.error('Error handling authentication:', error)
          router.push('/sign-in?error=auth_failed')
        }
      }
    }

    handleAuthCallback()
  }, [router])

  // Show a loading state while processing
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-zinc-500">Signing you in...</p>
      </div>
    </div>
  )
}