'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import FloatingAIWidget from '@/components/floating-ai-widget'
import { 
  Calendar, 
  FileText, 
  Bell, 
  BookOpen, 
  Clock, 
  MapPin, 
  User, 
  LogOut,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare
} from 'lucide-react'

export default function StudentDashboard() {
  const [notifications] = useState([
    { id: 1, title: 'Assignment Due Tomorrow', message: 'Mathematics Assignment #3 due by 11:59 PM', type: 'warning', time: '2 hours ago' },
    { id: 2, title: 'New Announcement', message: 'Library extended hours during exam week', type: 'info', time: '4 hours ago' },
    { id: 3, title: 'Grade Posted', message: 'Physics Lab Report - Grade: A-', type: 'success', time: '1 day ago' }
  ])

  const todaySchedule = [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', professor: 'Dr. Smith', type: 'lecture' },
    { time: '11:00 AM', subject: 'Physics Lab', room: 'Lab 2', professor: 'Prof. Johnson', type: 'lab' },
    { time: '2:00 PM', subject: 'Computer Science', room: 'Room 205', professor: 'Dr. Wilson', type: 'lecture' },
    { time: '4:00 PM', subject: 'English Literature', room: 'Room 301', professor: 'Prof. Davis', type: 'seminar' }
  ]

  const upcomingExams = [
    { subject: 'Mathematics', date: 'Nov 25, 2024', time: '10:00 AM', room: 'Hall A' },
    { subject: 'Physics', date: 'Nov 27, 2024', time: '2:00 PM', room: 'Hall B' },
    { subject: 'Computer Science', date: 'Nov 30, 2024', time: '9:00 AM', room: 'Hall C' }
  ]

  const quickActions = [
    { icon: Calendar, title: 'My Timetable', description: 'View your class schedule', color: 'bg-blue-500' },
    { icon: FileText, title: 'Submit Leave', description: 'Request time off', color: 'bg-green-500' },
    { icon: BookOpen, title: 'Assignments', description: 'View pending tasks', color: 'bg-purple-500' },
    { icon: GraduationCap, title: 'Grades', description: 'Check your results', color: 'bg-orange-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EduAssist AI</h1>
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-muted-foreground">Student ID: 2024001</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Good morning, John! 👋</h2>
              <p className="text-muted-foreground">Ready to make today productive? You have 4 classes scheduled.</p>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Wednesday, November 20, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((class_, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="text-center min-w-[80px]">
                        <div className="text-sm font-medium">{class_.time}</div>
                        <Badge variant={class_.type === 'lab' ? 'destructive' : class_.type === 'seminar' ? 'secondary' : 'default'} className="text-xs">
                          {class_.type}
                        </Badge>
                      </div>
                      <Separator orientation="vertical" className="h-12" />
                      <div className="flex-1">
                        <h4 className="font-medium">{class_.subject}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {class_.room}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {class_.professor}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingExams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{exam.subject}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{exam.date}</span>
                          <span>{exam.time}</span>
                          <span>{exam.room}</span>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {Math.ceil((new Date(exam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academic Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall GPA</span>
                    <span className="font-medium">3.8/4.0</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignments</span>
                    <span className="font-medium">8/10 Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="mt-1">
                      {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                      {notification.type === 'info' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                      {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Credits This Semester</span>
                  <Badge variant="secondary">18</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Leave Balance</span>
                  <Badge variant="secondary">8 days</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Library Books</span>
                  <Badge variant="secondary">3 borrowed</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Fees</span>
                  <Badge variant="destructive">$250</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating AI Widget */}
      <FloatingAIWidget userRole="student" />
    </div>
  )
}
