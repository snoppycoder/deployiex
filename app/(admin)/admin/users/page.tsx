"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Edit, Trash2, MoreHorizontal, UserCheck, Mail, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@techcorp.com",
    roles: ["Admin", "Team Lead"],
    teams: ["Engineering"],
    organizations: ["TechCorp Inc."],
    status: "Active",
    lastLogin: "2024-03-15 10:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@globalmarketing.com",
    roles: ["Marketing Manager"],
    teams: ["Marketing", "Sales"],
    organizations: ["Global Marketing Ltd."],
    status: "Active",
    lastLogin: "2024-03-14 16:45",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@financefirst.com",
    roles: ["Developer"],
    teams: ["Engineering"],
    organizations: ["FinanceFirst"],
    status: "Suspended",
    lastLogin: "2024-03-10 09:15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@healthcare.com",
    roles: ["Team Lead"],
    teams: ["Support", "HR"],
    organizations: ["HealthCare Solutions"],
    status: "Active",
    lastLogin: "2024-03-15 14:20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@techcorp.com",
    roles: ["Developer"],
    teams: ["Engineering"],
    organizations: ["TechCorp Inc."],
    status: "Inactive",
    lastLogin: "2024-02-28 11:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const mockOrganizations = ["TechCorp Inc.", "Global Marketing Ltd.", "FinanceFirst", "HealthCare Solutions"]
const mockTeams = ["Engineering", "Marketing", "Sales", "Support", "HR"]
const mockRoles = ["Admin", "Team Lead", "Developer", "Marketing Manager", "Support Agent"]

interface User {
  id?: number
  name: string
  email: string
  roles: string[]
  teams: string[]
  organizations: string[]
  status: string
  lastLogin: string
  avatar?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [organizationFilter, setOrganizationFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    roles: [],
    teams: [],
    organizations: [],
    status: "Active",
    lastLogin: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOrg = organizationFilter === "all" || user.organizations.includes(organizationFilter)
    const matchesTeam = teamFilter === "all" || user.teams.includes(teamFilter)
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter)
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesOrg && matchesTeam && matchesRole && matchesStatus
  })

  const handleInviteUser = () => {
    const newUser = {
      ...formData,
      id: Math.max(...users.map((u) => u.id!)) + 1,
      lastLogin: "Never",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUsers([...users, newUser])
    setIsInviteModalOpen(false)
    resetForm()
  }

  const handleEditUser = () => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...formData, id: editingUser.id } : user)))
      setIsEditModalOpen(false)
      setEditingUser(null)
      resetForm()
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleStatusToggle = (id: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          let newStatus = "Active"
          if (user.status === "Active") newStatus = "Suspended"
          else if (user.status === "Suspended") newStatus = "Inactive"
          else newStatus = "Active"
          return { ...user, status: newStatus }
        }
        return user
      }),
    )
  }

  const handleRemoveFromTeam = (userId: number, team: string) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, teams: user.teams.filter((t) => t !== team) } : user)),
    )
  }

  const handleRemoveFromOrganization = (userId: number, org: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, organizations: user.organizations.filter((o) => o !== org) } : user,
      ),
    )
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData(user)
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      roles: [],
      teams: [],
      organizations: [],
      status: "Active",
      lastLogin: "",
    })
  }

  const handleRoleToggle = (role: string) => {
    setFormData({
      ...formData,
      roles: formData.roles.includes(role) ? formData.roles.filter((r) => r !== role) : [...formData.roles, role],
    })
  }

  const handleTeamToggle = (team: string) => {
    setFormData({
      ...formData,
      teams: formData.teams.includes(team) ? formData.teams.filter((t) => t !== team) : [...formData.teams, team],
    })
  }

  const clearFilters = () => {
    setOrganizationFilter("all")
    setTeamFilter("all")
    setRoleFilter("all")
    setStatusFilter("all")
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-foreground">Users</span>
      </div>

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage users, roles, and team assignments</p>
        </div>
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Invite User</DialogTitle>
              <DialogDescription>Send an invitation to a new user to join the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter user name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Select
                  value={formData.organizations[0] || ""}
                  onValueChange={(value) => setFormData({ ...formData, organizations: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockOrganizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Roles</Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockRoles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={formData.roles.includes(role)}
                        onCheckedChange={() => handleRoleToggle(role)}
                      />
                      <Label htmlFor={`role-${role}`} className="text-sm">
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Teams</Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockTeams.map((team) => (
                    <div key={team} className="flex items-center space-x-2">
                      <Checkbox
                        id={`team-${team}`}
                        checked={formData.teams.includes(team)}
                        onCheckedChange={() => handleTeamToggle(team)}
                      />
                      <Label htmlFor={`team-${team}`} className="text-sm">
                        {team}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteUser}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {mockOrganizations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {mockTeams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {mockRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            User List
          </CardTitle>
          <CardDescription>View and manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role(s)</TableHead>
                  <TableHead>Team(s)</TableHead>
                  <TableHead>Organization(s)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.teams.map((team) => (
                          <Badge key={team} variant="outline" className="text-xs">
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.organizations.map((org) => (
                          <Badge key={org} variant="default" className="text-xs">
                            {org}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active"
                            ? "default"
                            : user.status === "Suspended"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusToggle(user.id!)}>
                            {user.status === "Active" ? "Suspend" : "Activate"}
                          </DropdownMenuItem>
                          {user.teams.length > 0 && (
                            <DropdownMenuItem
                              onClick={() => handleRemoveFromTeam(user.id!, user.teams[0])}
                              className="text-orange-600"
                            >
                              Remove from Team
                            </DropdownMenuItem>
                          )}
                          {user.organizations.length > 0 && (
                            <DropdownMenuItem
                              onClick={() => handleRemoveFromOrganization(user.id!, user.organizations[0])}
                              className="text-orange-600"
                            >
                              Remove from Org
                            </DropdownMenuItem>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user account and all
                                  associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id!)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details and assignments.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter user name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <Label>Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {mockRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-role-${role}`}
                      checked={formData.roles.includes(role)}
                      onCheckedChange={() => handleRoleToggle(role)}
                    />
                    <Label htmlFor={`edit-role-${role}`} className="text-sm">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Teams</Label>
              <div className="grid grid-cols-2 gap-2">
                {mockTeams.map((team) => (
                  <div key={team} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-team-${team}`}
                      checked={formData.teams.includes(team)}
                      onCheckedChange={() => handleTeamToggle(team)}
                    />
                    <Label htmlFor={`edit-team-${team}`} className="text-sm">
                      {team}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
