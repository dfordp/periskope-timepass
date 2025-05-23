"use client"
    
    import { useEffect } from "react"
    import { useRouter } from "next/navigation"
    import { supabase } from "./helpers/supabase"
    
    export default function HomePage() {
      const router = useRouter()
    
      useEffect(() => {
        const handleAuthCallback = async () => {
          // Get the hash fragment from the URL
          const hash = window.location.hash.substring(1)
          
          if (!hash) return
          
          // Parse the hash parameters
          const params = new URLSearchParams(hash)
          const accessToken = params.get('access_token')
          const type = params.get('type')
          
          if (type === 'signup' && accessToken) {
            try {
              // Get user data from the JWT
              const { data: { user }, error } = await supabase.auth.getUser(accessToken)
              
              if (error) throw error
              
              if (user) {
                // Update user verification status
                const { error: updateError } = await supabase
                  .from('User')
                  .update({ isVerified: true })
                  .eq('email', user.email)
                
                if (updateError) throw updateError
                
                // Clear the hash and redirect to sign-in
                window.location.hash = ''
                router.push('/sign-in')
              }
            } catch (error) {
              console.error('Error handling verification:', error)
              // You might want to show an error message to the user
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
            <p className="text-sm text-zinc-500">Verifying your account...</p>
          </div>
        </div>
      )
    }