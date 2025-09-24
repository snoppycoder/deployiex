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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, MoreHorizontal, Users, Shield, UserPlus, UserMinus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const mockTeams = [
  {
    id: 1,
    name: "Engineering",
    organization: "TechCorp Inc.",
    members: ["John Smith", "Alice Johnson", "Bob Wilson"],
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Marketing",
    organization: "TechCorp Inc.",
    members: ["Sarah Davis", "Mike Brown"],
    createdDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Sales",
    organization: "Global Marketing Ltd.",
    members: ["Emily White", "David Lee", "Lisa Chen", "Tom Anderson"],
    createdDate: "2024-01-20",
  },
]

const mockRoles = [
  {
    id: 1,
    name: "Admin",
    organization: "TechCorp Inc.",
    isTeamLead: false,
    createdDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Team Lead",
    organization: "TechCorp Inc.",
    isTeamLead: true,
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Developer",
    organization: "TechCorp Inc.",
    isTeamLead: false,
    createdDate: "2024-01-12",
  },
  {
    id: 4,
    name: "Marketing Manager",
    organization: "Global Marketing Ltd.",
    isTeamLead: true,
    createdDate: "2024-01-15",
  },
]

const mockOrganizations = ["TechCorp Inc.", "Global Marketing Ltd.", "FinanceFirst", "HealthCare Solutions"]

const mockUsers = [
  "John Smith",
  "Alice Johnson",
  "Bob Wilson",
  "Sarah Davis",
  "Mike Brown",
  "Emily White",
  "David Lee",
  "Lisa Chen",
  "Tom Anderson",
]

interface Team {
  id?: number
  name: string
  organization: string
  members: string[]
  createdDate: string
}

interface Role {
  id?: number
  name: string
  organization: string
  isTeamLead: boolean
  createdDate: string
}

export default function TeamsPage() {
  const [teams, setTeams] = useState(mockTeams)
  const [roles, setRoles] = useState(mockRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleSearchTerm, setRoleSearchTerm] = useState("")

  // Team modals
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false)
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false)
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [managingTeam, setManagingTeam] = useState<Team | null>(null)
  const [teamFormData, setTeamFormData] = useState<Team>({
    name: "",
    organization: "",
    members: [],
    createdDate: new Date().toISOString().split("T")[0],
  })

  // Role modals
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [roleFormData, setRoleFormData] = useState<Role>({
    name: "",
    organization: "",
    isTeamLead: false,
    createdDate: new Date().toISOString().split("T")[0],
  })

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.organization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
      role.organization.toLowerCase().includes(roleSearchTerm.toLowerCase()),
  )

  // Team functions
  const handleCreateTeam = () => {
    const newTeam = {
      ...teamFormData,
      id: Math.max(...teams.map((t) => t.id)) + 1,
    }
    setTeams([...teams, newTeam])
    setIsCreateTeamModalOpen(false)
    resetTeamForm()
  }

  const handleEditTeam = () => {
    if (editingTeam) {
      setTeams(teams.map((team) => (team.id === editingTeam.id ? { ...teamFormData, id: editingTeam.id } : team)))
      setIsEditTeamModalOpen(false)
      setEditingTeam(null)
      resetTeamForm()
    }
  }

  const handleDeleteTeam = (id: number) => {
    setTeams(teams.filter((team) => team.id !== id))
  }

  const openEditTeamModal = (team: Team) => {
    setEditingTeam(team)
    setTeamFormData(team)
    setIsEditTeamModalOpen(true)
  }

  const openMembersModal = (team: Team) => {
    setManagingTeam(team)
    setIsMembersModalOpen(true)
  }

  const handleAddMember = (member: string) => {
    if (managingTeam && !managingTeam.members.includes(member)) {
      const updatedTeam = { ...managingTeam, members: [...managingTeam.members, member] }
      setTeams(teams.map((team) => (team.id === managingTeam.id ? updatedTeam : team)))
      setManagingTeam(updatedTeam)
    }
  }

  const handleRemoveMember = (member: string) => {
    if (managingTeam) {
      const updatedTeam = { ...managingTeam, members: managingTeam.members.filter((m) => m !== member) }
      setTeams(teams.map((team) => (team.id === managingTeam.id ? updatedTeam : team)))
      setManagingTeam(updatedTeam)
    }
  }

  const resetTeamForm = () => {
    setTeamFormData({
      name: "",
      organization: "",
      members: [],
      createdDate: new Date().toISOString().split("T")[0],
    })
  }

  // Role functions
  const handleCreateRole = () => {
    const newRole = {
      ...roleFormData,
      id: Math.max(...roles.map((r) => r.id)) + 1,
    }
    setRoles([...roles, newRole])
    setIsCreateRoleModalOpen(false)
    resetRoleForm()
  }

  const handleEditRole = () => {
    if (editingRole) {
      setRoles(roles.map((role) => (role.id === editingRole.id ? { ...roleFormData, id: editingRole.id } : role)))
      setIsEditRoleModalOpen(false)
      setEditingRole(null)
      resetRoleForm()
    }
  }

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const openEditRoleModal = (role: Role) => {
    setEditingRole(role)
    setRoleFormData(role)
    setIsEditRoleModalOpen(true)
  }

  const resetRoleForm = () => {
    setRoleFormData({
      name: "",
      organization: "",
      isTeamLead: false,
      createdDate: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-foreground">Teams</span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teams & Roles</h1>
        <p className="text-muted-foreground">Manage teams and roles across organizations</p>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Teams</h2>
              <p className="text-sm text-muted-foreground">Manage teams and their members</p>
            </div>
            <Dialog open={isCreateTeamModalOpen} onOpenChange={setIsCreateTeamModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetTeamForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Team</DialogTitle>
                  <DialogDescription>Add a new team to an organization.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      value={teamFormData.name}
                      onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="team-org">Organization</Label>
                    <Select
                      value={teamFormData.organization}
                      onValueChange={(value) => setTeamFormData({ ...teamFormData, organization: value })}
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
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateTeamModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTeam}>Create Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team List
              </CardTitle>
              <CardDescription>View and manage all teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.organization}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{team.members.length} members</Badge>
                        </TableCell>
                        <TableCell>{team.createdDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditTeamModal(team)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openMembersModal(team)}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Manage Members
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the team.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteTeam(team.id!)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
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
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Roles</h2>
              <p className="text-sm text-muted-foreground">Manage roles and permissions</p>
            </div>
            <Dialog open={isCreateRoleModalOpen} onOpenChange={setIsCreateRoleModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetRoleForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Role</DialogTitle>
                  <DialogDescription>Add a new role to an organization.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      value={roleFormData.name}
                      onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role-org">Organization</Label>
                    <Select
                      value={roleFormData.organization}
                      onValueChange={(value) => setRoleFormData({ ...roleFormData, organization: value })}
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
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="team-lead"
                      checked={roleFormData.isTeamLead}
                      onCheckedChange={(checked) =>
                        setRoleFormData({ ...roleFormData, isTeamLead: checked as boolean })
                      }
                    />
                    <Label htmlFor="team-lead">Team Lead Role</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateRoleModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRole}>Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role List
              </CardTitle>
              <CardDescription>View and manage all roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search roles..."
                    value={roleSearchTerm}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Team Lead</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.organization}</TableCell>
                        <TableCell>
                          <Badge variant={role.isTeamLead ? "default" : "secondary"}>
                            {role.isTeamLead ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>{role.createdDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditRoleModal(role)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the role.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteRole(role.id!)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
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
        </TabsContent>
      </Tabs>

      {/* Edit Team Modal */}
      <Dialog open={isEditTeamModalOpen} onOpenChange={setIsEditTeamModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>Update the team details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-team-name">Team Name</Label>
              <Input
                id="edit-team-name"
                value={teamFormData.name}
                onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                placeholder="Enter team name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-team-org">Organization</Label>
              <Select
                value={teamFormData.organization}
                onValueChange={(value) => setTeamFormData({ ...teamFormData, organization: value })}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTeamModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeam}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Update the role details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-role-name">Role Name</Label>
              <Input
                id="edit-role-name"
                value={roleFormData.name}
                onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                placeholder="Enter role name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role-org">Organization</Label>
              <Select
                value={roleFormData.organization}
                onValueChange={(value) => setRoleFormData({ ...roleFormData, organization: value })}
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-team-lead"
                checked={roleFormData.isTeamLead}
                onCheckedChange={(checked) => setRoleFormData({ ...roleFormData, isTeamLead: checked as boolean })}
              />
              <Label htmlFor="edit-team-lead">Team Lead Role</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Members Management Modal */}
      <Dialog open={isMembersModalOpen} onOpenChange={setIsMembersModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Team Members</DialogTitle>
            <DialogDescription>Add or remove members from {managingTeam?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Current Members</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {managingTeam?.members.map((member) => (
                  <div key={member} className="flex items-center justify-between p-2 border rounded">
                    <span>{member}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member)}
                      className="text-destructive hover:text-destructive"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Available Users</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {mockUsers
                  .filter((user) => !managingTeam?.members.includes(user))
                  .map((user) => (
                    <div key={user} className="flex items-center justify-between p-2 border rounded">
                      <span>{user}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleAddMember(user)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsMembersModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
