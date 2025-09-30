"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Building2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockOrganizations = [
  {
    id: 1,
    name: "TechCorp Inc.",
    industry: "Technology",
    owner: "John Smith",
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Global Marketing Ltd.",
    industry: "Marketing",
    owner: "Sarah Johnson",
    status: "Active",
    createdDate: "2024-02-20",
  },
  {
    id: 3,
    name: "FinanceFirst",
    industry: "Finance",
    owner: "Mike Davis",
    status: "Suspended",
    createdDate: "2024-01-08",
  },
  {
    id: 4,
    name: "HealthCare Solutions",
    industry: "Healthcare",
    owner: "Emily Brown",
    status: "Active",
    createdDate: "2024-03-10",
  },
];

const mockUsers = [
  { id: 1, name: "John Smith", email: "john@techcorp.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@globalmarketing.com" },
  { id: 3, name: "Mike Davis", email: "mike@financefirst.com" },
  { id: 4, name: "Emily Brown", email: "emily@healthcare.com" },
];

const industries = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Other",
];

interface Organization {
  id?: number;
  name: string;
  industry: string;
  owner: string;
  status: string;
  createdDate: string;
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [formData, setFormData] = useState<Organization>({
    name: "",
    industry: "",
    owner: "",
    status: "Active",
    createdDate: new Date().toISOString().split("T")[0],
  });

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    const newOrg = {
      ...formData,
      id: Math.max(...organizations.map((o) => o.id)) + 1,
    };
    setOrganizations([...organizations, newOrg]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (editingOrg) {
      setOrganizations(
        organizations.map((org) =>
          org.id === editingOrg.id ? { ...formData, id: editingOrg.id } : org
        )
      );
      setIsEditModalOpen(false);
      setEditingOrg(null);
      resetForm();
    }
  };

  const handleDelete = (id: number) => {
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  const handleStatusToggle = (id: number) => {
    setOrganizations(
      organizations.map((org) =>
        org.id === id
          ? { ...org, status: org.status === "Active" ? "Suspended" : "Active" }
          : org
      )
    );
  };

  const openEditModal = (org: Organization) => {
    setEditingOrg(org);
    setFormData(org);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      industry: "",
      owner: "",
      status: "Active",
      createdDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-foreground">Organizations</span>
      </div>

      {/* Page header */}
      <div className="flex md:items-center md:flex-row flex-col md:justify-between  ">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground">
            Manage organizations and their settings
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className=" mt-2 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                Add a new organization to the system. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter organization name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData({ ...formData, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Owner</Label>
                <Select
                  value={formData.owner}
                  onValueChange={(value) =>
                    setFormData({ ...formData, owner: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Organization</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization List
          </CardTitle>
          <CardDescription>
            View and manage all organizations in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
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
                  <TableHead>Organization Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell>{org.industry}</TableCell>
                    <TableCell>{org.owner}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          org.status === "Active" ? "default" : "destructive"
                        }
                      >
                        {org.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{org.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(org)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusToggle(org.id!)}
                          >
                            {org.status === "Active" ? "Suspend" : "Activate"}
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the organization and all
                                  associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(org.id!)}
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

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update the organization details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Organization Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter organization name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData({ ...formData, industry: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-owner">Owner</Label>
              <Select
                value={formData.owner}
                onValueChange={(value) =>
                  setFormData({ ...formData, owner: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
