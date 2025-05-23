import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { LuMessageCirclePlus } from "react-icons/lu"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Combobox } from "./ui/combobox"
import { supabase } from "@/app/helpers/supabase"
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatType, setChatType] = useState<'individual' | 'group'>('individual')
  const [users, setUsers] = useState<User[]>([])
  const [currentUser,SetCurrentUser] = useState<User>()

  const [formData, setFormData] = useState({
    name: "",
    participants: [] as string[],
  })

  const email = Cookies.get('email')  
 

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCurrentUser = async() => {
        const {  data } = await supabase
                .from('User')
                .select('id, name, email, phone')
                .eq('email', email)
                .single()

        if (data) {
            SetCurrentUser(data);
        }
    }

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('User')
        .select('id, name, email, phone')
        .eq('isVerified', true)

      if (!error && data) {
        setUsers(data)
      }
    }

    fetchCurrentUser();
    fetchUsers()
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const chatData = {
        isGroup : chatType === 'individual' ? false : true,
        name: chatType === 'individual' ? "" : formData.name,
        participants: [...formData.participants,currentUser?.id],
      }

      const { data, error } = await supabase
        .from('chat')
        .insert([chatData])
        .select()
        .single()

      if (error) throw error

      // Create chat participants
      await supabase.from('ChatParticipants').insert(
        formData.participants.map(userId => ({
          chatId: data.id,
          userId,
          role: chatType === 'group' ? 'member' : 'owner'
        }))
      )

      setIsOpen(false)
    } catch (error) {
      console.error('Error creating chat:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="absolute bottom-6 right-6">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
        >
          <LuMessageCirclePlus className="h-6 w-6 text-white" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Chat Type</Label>
              <RadioGroup
                defaultValue="individual"
                onValueChange={(value) => setChatType(value as 'individual' | 'group')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group">Group</Label>
                </div>
              </RadioGroup>
            </div>

            {chatType === 'group' && (
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter group name"
                  required={chatType === 'group'}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>
              {chatType === 'individual' ? 'Select Participant' : 'Add Participants'}
              </Label>
              <Combobox
              items={users.map(user => ({
                label: user.name,
                value: user.id,
              }))}
              value={formData.participants}
              onChange={(value: string | string[]) => setFormData(prev => ({ 
                ...prev, 
                participants: Array.isArray(value) ? value : [value]
              }))}
              placeholder="Search users..."
              multiple={chatType === 'group'}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isLoading || !formData.participants.length || (chatType === 'group' && !formData.name)}
              >
                {isLoading ? "Creating..." : "Create Chat"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}