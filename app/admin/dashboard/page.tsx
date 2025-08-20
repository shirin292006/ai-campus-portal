'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import FloatingAIWidget from '@/components/floating-ai-widget'
import { 
  Users, 
  FileText, 
  Bell, 
  BarChart3, 
  Calendar, 
  Settings, 
  User, 
  LogOut,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Clock,
  UserCheck,
  BookOpen,
  Building
} from 'lucide-react'

export default function AdminDashboard() {
  const [pendingLeaves] = useState([
    { id: 1, student: 'John Smith', type: 'Medical Leave', days: 2, date: 'Nov 22-23, 2024', status: 'pending' },
    { id: 2, student: 'Sarah Johnson', type: 'Personal Leave', days: 1, date: 'Nov 25, 2024', status: 'pending' },
    { id: 3, student: 'Mike Wilson', type: 'Emergency Leave', days: 3, date: 'Nov 20-22, 2024', status: 'pending' }
  ])

  const [recentActivities] = useState([
    { id: 1, action: 'New student enrollment', user: 'Emma Davis', time: '10 minutes ago', type: 'info' },
    { id: 2, action: 'Leave request approved', user: 'Admin', time: '1 hour ago', type: 'success' },
    { id: 3, action: 'Exam schedule updated', user: 'Dr. Smith', time: '2 hours ago', type: 'warning' },
    { id: 4, action: 'New announcement posted', user: 'Admin', time: '3 hours ago', type: 'info' }
  ])

  const quickActions = [
    { icon: Users, title: 'Manage Students', description: 'View and manage student records', color: 'bg-blue-500' },
    { icon: FileText, title: 'Leave Requests', description: 'Review pending requests', color: 'bg-green-500' },
    { icon: MessageSquare, title: 'Announcements', description: 'Broadcast messages', color: 'bg-purple-500' },
    { icon: BarChart3, title: 'Analytics', description: 'View reports and stats', color: 'bg-orange-500' }
  ]

  const stats = [
    { title: 'Total Students', value: '1,247', change: '+12', trend: 'up', icon: Users },
    { title: 'Active Classes', value: '24', change: '0', trend: 'stable', icon: BookOpen },
    { title: 'Pending Leaves', value: '8', change: '-3', trend: 'down', icon: Clock },
    { title: 'Faculty Members', value: '89', change: '+2', trend: 'up', icon: UserCheck }
  ]

  const upcomingEvents = [
    { title: 'Faculty Meeting', date: 'Nov 22, 2024', time: '10:00 AM', location: 'Conference Room A' },
    { title: 'Parent-Teacher Conference', date: 'Nov 25, 2024', time: '2:00 PM', location: 'Main Hall' },
    { title: 'Exam Schedule Review', date: 'Nov 28, 2024', time: '11:00 AM', location: 'Admin Office' }
  ]

  const handleLeaveAction = (leaveId: number, action: 'approve' | 'reject') => {
    console.log(`${action} leave request ${leaveId}`)
    // Handle leave approval/rejection logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EduAssist AI</h1>
                <p className="text-sm text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  5
                </Badge>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Dr. Admin</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
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
              <h2 className="text-3xl font-bold">Good morning, Dr. Admin! 👋</h2>
              <p className="text-muted-foreground">Here's what's happening at your institution today.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                            {stat.change}
                          </span>
                          <span className="text-xs text-muted-foreground">this week</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

            {/* Pending Leave Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Pending Leave Requests
                </CardTitle>
                <CardDescription>Review and approve student leave applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingLeaves.map((leave) => (
                    <div key={leave.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{leave.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{leave.student}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{leave.type}</span>
                            <span>{leave.days} day{leave.days > 1 ? 's' : ''}</span>
                            <span>{leave.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleLeaveAction(leave.id, 'reject')}
                        >
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleLeaveAction(leave.id, 'approve')}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{event.date}</span>
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span className="font-medium">234</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="mt-1">
                      {activity.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                      {activity.type === 'info' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                      {activity.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Institution Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Departments</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Courses</span>
                  <Badge variant="secondary">156</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Graduation Rate</span>
                  <Badge variant="secondary">94%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average GPA</span>
                  <Badge variant="secondary">3.6</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating AI Widget */}
      <FloatingAIWidget userRole="admin" />
    </div>
  )
}
