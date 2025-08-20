'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, X, Minimize2, MessageCircle, Clock, Calendar, FileText, Users } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface FloatingAIWidgetProps {
  userRole: 'student' | 'admin'
}

export default function FloatingAIWidget({ userRole }: FloatingAIWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi! I'm your AI assistant. I can help you with ${userRole === 'student' ? 'checking your timetable, submitting leave requests, exam dates, and answering campus queries' : 'managing leave requests, broadcasting announcements, viewing analytics, and administrative tasks'}. How can I assist you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = userRole === 'student' 
    ? [
        { icon: Calendar, label: 'My Timetable', action: 'show my timetable for today' },
        { icon: FileText, label: 'Submit Leave', action: 'I want to submit a leave request' },
        { icon: Clock, label: 'Exam Dates', action: 'show me upcoming exam dates' },
        { icon: MessageCircle, label: 'Announcements', action: 'show recent announcements' }
      ]
    : [
        { icon: Users, label: 'Leave Requests', action: 'show pending leave requests' },
        { icon: MessageCircle, label: 'Broadcast', action: 'I want to broadcast an announcement' },
        { icon: Calendar, label: 'Schedules', action: 'show class schedules overview' },
        { icon: FileText, label: 'Reports', action: 'generate attendance report' }
      ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, userRole)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    handleSendMessage()
  }

  const generateAIResponse = (input: string, role: 'student' | 'admin'): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('timetable') || lowerInput.includes('schedule')) {
      return role === 'student' 
        ? "Here's your timetable for today:\n\n📚 9:00 AM - Mathematics (Room 101)\n📚 11:00 AM - Physics (Lab 2)\n📚 2:00 PM - Computer Science (Room 205)\n📚 4:00 PM - English Literature (Room 301)\n\nWould you like to see tomorrow's schedule or set reminders?"
        : "Here's today's schedule overview:\n\n📊 Total Classes: 24\n👥 Active Students: 156\n🏫 Rooms Occupied: 12/15\n⚠️ Schedule Conflicts: 2\n\nWould you like to view specific department schedules?"
    }
    
    if (lowerInput.includes('leave')) {
      return role === 'student'
        ? "I can help you submit a leave request. Please provide:\n\n📅 Start Date\n📅 End Date\n📝 Reason for leave\n📎 Supporting documents (if any)\n\nYou can also check your leave balance: Casual Leave: 8 days remaining"
        : "Here are pending leave requests:\n\n👤 John Smith - Medical Leave (2 days)\n👤 Sarah Johnson - Personal Leave (1 day)\n👤 Mike Wilson - Emergency Leave (3 days)\n\nWould you like to approve/reject any requests or view detailed information?"
    }
    
    if (lowerInput.includes('exam') || lowerInput.includes('test')) {
      return "📋 Upcoming Exams:\n\n📚 Mathematics - Nov 25, 2024 (10:00 AM)\n📚 Physics - Nov 27, 2024 (2:00 PM)\n📚 Computer Science - Nov 30, 2024 (9:00 AM)\n📚 English - Dec 2, 2024 (11:00 AM)\n\nWould you like exam hall details or preparation tips?"
    }
    
    if (lowerInput.includes('announcement') || lowerInput.includes('broadcast')) {
      return role === 'student'
        ? "📢 Recent Announcements:\n\n🎓 Graduation ceremony - Dec 15, 2024\n📚 Library extended hours during exams\n🏃‍♂️ Sports day registration open\n💻 New computer lab inauguration\n\nWould you like details on any announcement?"
        : "I can help you broadcast an announcement. Please provide:\n\n📝 Announcement title\n📄 Message content\n👥 Target audience (All/Students/Faculty)\n⏰ Schedule time (Now/Later)\n📌 Priority level\n\nWhat would you like to announce?"
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return role === 'student'
        ? "I can help you with:\n\n📅 View your timetable and schedules\n📝 Submit and track leave requests\n📋 Check exam dates and results\n📢 View announcements and events\n🏫 Campus information and directions\n📚 Library book availability\n💡 Academic tips and resources\n\nJust ask me anything!"
        : "I can assist you with:\n\n👥 Manage student leave requests\n📢 Broadcast announcements\n📊 Generate reports and analytics\n📅 View and manage schedules\n🏫 Monitor campus activities\n📋 Track attendance\n💼 Administrative tasks\n\nWhat would you like to do?"
    }
    
    return "I understand you're asking about " + input + ". Let me help you with that. Could you provide more specific details so I can give you the most accurate information?"
  }

  if (!isExpanded) {
    return (
      <div className="floating-ai-widget collapsed">
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-full h-full rounded-full shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
          size="icon"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="floating-ai-widget expanded">
      <Card className="w-full h-full shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">AI Assistant</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {userRole === 'student' ? 'Student Helper' : 'Admin Helper'}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => setIsExpanded(false)}
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
          {/* Quick Actions */}
          <div className="p-3 border-b bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-1">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs rounded-lg justify-start"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3 custom-scrollbar">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-3 py-2">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="rounded-xl text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="rounded-xl shrink-0"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
