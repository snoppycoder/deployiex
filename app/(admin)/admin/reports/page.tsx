"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, DollarSign, Building2 } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"

// Mock data for reports
const expenseByOrganization = [
  { organization: "TechCorp Inc.", amount: 45000, percentage: 40 },
  { organization: "Global Marketing Ltd.", amount: 32000, percentage: 28 },
  { organization: "FinanceFirst", amount: 23000, percentage: 20 },
  { organization: "HealthCare Solutions", amount: 14000, percentage: 12 },
]

const expenseByTeam = [
  { team: "Engineering", amount: 25000 },
  { team: "Marketing", amount: 18000 },
  { team: "Sales", amount: 15000 },
  { team: "Support", amount: 12000 },
  { team: "HR", amount: 8000 },
]

const expenseByCategory = [
  { category: "Travel", amount: 28000, color: "#3B82F6" },
  { category: "Meals", amount: 18000, color: "#10B981" },
  { category: "Office Supplies", amount: 15000, color: "#F59E0B" },
  { category: "Software", amount: 12000, color: "#EF4444" },
  { category: "Equipment", amount: 8000, color: "#8B5CF6" },
  { category: "Other", amount: 5000, color: "#6B7280" },
]

const expenseTrends = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 15000 },
  { month: "Mar", amount: 18000 },
  { month: "Apr", amount: 22000 },
  { month: "May", amount: 19000 },
  { month: "Jun", amount: 25000 },
]

const userReports = [
  {
    id: 1,
    name: "John Smith",
    email: "john@techcorp.com",
    organization: "TechCorp Inc.",
    team: "Engineering",
    totalExpenses: 3500,
    lastLogin: "2024-03-15 10:30",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@globalmarketing.com",
    organization: "Global Marketing Ltd.",
    team: "Marketing",
    totalExpenses: 2800,
    lastLogin: "2024-03-14 16:45",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@financefirst.com",
    organization: "FinanceFirst",
    team: "Engineering",
    totalExpenses: 1200,
    lastLogin: "2024-03-10 09:15",
    status: "Suspended",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@healthcare.com",
    organization: "HealthCare Solutions",
    team: "Support",
    totalExpenses: 4200,
    lastLogin: "2024-03-15 14:20",
    status: "Active",
  },
]

const recentLogins = [
  { user: "John Smith", loginTime: "2024-03-15 10:30", location: "New York, NY" },
  { user: "Emily Brown", loginTime: "2024-03-15 14:20", location: "Los Angeles, CA" },
  { user: "Sarah Johnson", loginTime: "2024-03-14 16:45", location: "Chicago, IL" },
  { user: "David Wilson", loginTime: "2024-03-14 09:15", location: "Austin, TX" },
  { user: "Lisa Chen", loginTime: "2024-03-13 11:30", location: "Seattle, WA" },
]

const mockOrganizations = ["TechCorp Inc.", "Global Marketing Ltd.", "FinanceFirst", "HealthCare Solutions"]
const mockTeams = ["Engineering", "Marketing", "Sales", "Support", "HR"]
const mockCategories = ["Travel", "Meals", "Office Supplies", "Software", "Equipment", "Other"]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedOrganization, setSelectedOrganization] = useState("All Organizations")
  const [selectedTeam, setSelectedTeam] = useState("All Teams")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const handleExportCSV = (reportType: string) => {
    // Mock CSV export functionality
    console.log(`Exporting ${reportType} as CSV`)
    // In a real implementation, this would generate and download a CSV file
  }

  const handleExportPDF = (reportType: string) => {
    // Mock PDF export functionality
    console.log(`Exporting ${reportType} as PDF`)
    // In a real implementation, this would generate and download a PDF file
  }

  const clearFilters = () => {
    setDateRange(undefined)
    setSelectedOrganization("All Organizations")
    setSelectedTeam("All Teams")
    setSelectedCategory("All Categories")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-foreground">Reports</span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">View detailed reports and analytics across your organization</p>
      </div>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Custom Report Generator
          </CardTitle>
          <CardDescription>Generate custom reports with specific filters and date ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="grid gap-2">
              <Label>Date Range</Label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="grid gap-2">
              <Label>Organization</Label>
              <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                <SelectTrigger>
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Organizations">All Organizations</SelectItem>
                  {mockOrganizations.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Team</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Teams">All Teams</SelectItem>
                  {mockTeams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
              <Button>Generate</Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExportCSV("custom")}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExportPDF("custom")}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="expense-reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="expense-reports">Expense Reports</TabsTrigger>
          <TabsTrigger value="user-reports">User Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Expense Reports Tab */}
        <TabsContent value="expense-reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Total Expenses by Organization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Expenses by Organization
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("organization")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseByOrganization.map((item) => (
                    <div key={item.organization} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{item.organization}</div>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-medium">${item.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expenses by Team */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Expenses by Team
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("team")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "#3B82F6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseByTeam}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Expense Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Expense Trends Over Time
                </span>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV("trends")}>
                  <Download className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "Amount",
                    color: "#10B981",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expenseTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Reports Tab */}
        <TabsContent value="user-reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Expense Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    User Expense Summary
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("user-expenses")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Total Expenses</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userReports.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{user.team}</TableCell>
                          <TableCell>${user.totalExpenses.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Recent Logins */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Logins
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("recent-logins")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLogins.map((login, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{login.user}</div>
                        <div className="text-sm text-muted-foreground">{login.location}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{login.loginTime}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Breakdown by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Expense Breakdown by Category
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("category")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, amount }) => `${category}: $${amount.toLocaleString()}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {expenseByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Team Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Expense Comparison
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleExportCSV("team-comparison")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseByTeam
                    .sort((a, b) => b.amount - a.amount)
                    .map((team, index) => (
                      <div key={team.team} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{team.team}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${team.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((team.amount / expenseByTeam.reduce((sum, t) => sum + t.amount, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
