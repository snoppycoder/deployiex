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
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  DollarSign,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
type PolicyType = {
  id: number;
  name: string;
  organization: string;
  description: string;
  userLimit: number;
  teamLimit: number;
  categories: string[];
  createdDate: string;
  lastModified: string;
};
const mockPolicies: PolicyType[] = [
  {
    id: 1,
    name: "Standard Business Policy",
    organization: "TechCorp Inc.",
    description:
      "Standard expense policy for all employees with basic spending limits.",
    userLimit: 1000,
    teamLimit: 5000,
    categories: ["Travel", "Meals", "Office Supplies"],
    createdDate: "2024-01-15",
    lastModified: "2024-03-10",
  },
  {
    id: 2,
    name: "Executive Policy",
    organization: "TechCorp Inc.",
    description:
      "Enhanced expense policy for executive team members with higher limits.",
    userLimit: 5000,
    teamLimit: 25000,
    categories: ["Travel", "Meals", "Entertainment", "Office Supplies"],
    createdDate: "2024-01-20",
    lastModified: "2024-02-28",
  },
  {
    id: 3,
    name: "Marketing Campaign Policy",
    organization: "Global Marketing Ltd.",
    description:
      "Specialized policy for marketing campaigns and promotional activities.",
    userLimit: 2000,
    teamLimit: 15000,
    categories: ["Marketing", "Travel", "Entertainment", "Software"],
    createdDate: "2024-02-01",
    lastModified: "2024-03-05",
  },
  {
    id: 4,
    name: "Remote Work Policy",
    organization: "HealthCare Solutions",
    description:
      "Policy designed for remote workers with focus on home office expenses.",
    userLimit: 800,
    teamLimit: 4000,
    categories: ["Office Supplies", "Software", "Equipment"],
    createdDate: "2024-02-15",
    lastModified: "2024-03-12",
  },
];

const mockOrganizations = [
  "TechCorp Inc.",
  "Global Marketing Ltd.",
  "FinanceFirst",
  "HealthCare Solutions",
];

const availableCategories = [
  "Travel",
  "Meals",
  "Entertainment",
  "Office Supplies",
  "Software",
  "Equipment",
  "Marketing",
  "Training",
  "Utilities",
  "Other",
];

interface ExpensePolicy {
  id?: number;
  name: string;
  organization: string;
  description: string;
  userLimit: number;
  teamLimit: number;
  categories: string[];
  createdDate: string;
  lastModified: string;
}

export default function ExpensePoliciesPage() {
  const [policies, setPolicies] = useState(mockPolicies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<ExpensePolicy | null>(
    null
  );
  const [formData, setFormData] = useState<ExpensePolicy>({
    name: "",
    organization: "",
    description: "",
    userLimit: 0,
    teamLimit: 0,
    categories: [],
    createdDate: new Date().toISOString().split("T")[0],
    lastModified: new Date().toISOString().split("T")[0],
  });

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    const newPolicy = {
      ...formData,
      id: Math.max(...policies.map((p) => p.id!)) + 1,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setPolicies([...policies, newPolicy]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (editingPolicy && typeof editingPolicy.id === "number") {
      const updatedPolicy: PolicyType = {
        ...formData,
        id: editingPolicy.id,
        lastModified: new Date().toISOString().split("T")[0],
      };
      setPolicies(
        policies.map((policy) =>
          policy.id === editingPolicy.id ? updatedPolicy : policy
        )
      );
      setIsEditModalOpen(false);
      setEditingPolicy(null);
      resetForm();
    }
  };

  const handleDelete = (id: number) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };

  const openEditModal = (policy: ExpensePolicy) => {
    setEditingPolicy(policy);
    setFormData(policy);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      organization: "",
      description: "",
      userLimit: 0,
      teamLimit: 0,
      categories: [],
      createdDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
    });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter((c) => c !== category)
        : [...formData.categories, category],
    });
  };

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-foreground">Expense Policies</span>
      </div>

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Expense Policies
          </h1>
          <p className="text-muted-foreground">
            Manage spending limits and expense categories
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Create Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Expense Policy</DialogTitle>
              <DialogDescription>
                Create a new expense policy with spending limits and approved
                categories.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Policy Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter policy name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Select
                  value={formData.organization}
                  onValueChange={(value) =>
                    setFormData({ ...formData, organization: value })
                  }
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter policy description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="userLimit">User Spending Limit ($)</Label>
                  <Input
                    id="userLimit"
                    type="number"
                    value={formData.userLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userLimit: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teamLimit">Team Spending Limit ($)</Label>
                  <Input
                    id="teamLimit"
                    type="number"
                    value={formData.teamLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamLimit: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Expense Categories</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={formData.categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                          onClick={() => removeCategory(category)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Policy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Expense Policy List
          </CardTitle>
          <CardDescription>
            View and manage all expense policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
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
                  <TableHead>Policy Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Spending Limits</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{policy.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {policy.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{policy.organization}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-3 w-3 mr-1" />
                          User: ${policy.userLimit.toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Team: ${policy.teamLimit.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {policy.categories.slice(0, 2).map((category) => (
                          <Badge
                            key={category}
                            variant="outline"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                        {policy.categories.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{policy.categories.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{policy.lastModified}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditModal(policy)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
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
                                  permanently delete the expense policy and may
                                  affect users who are currently assigned to it.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(policy.id!)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Expense Policy</DialogTitle>
            <DialogDescription>
              Update the expense policy details and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Policy Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter policy name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-organization">Organization</Label>
              <Select
                value={formData.organization}
                onValueChange={(value) =>
                  setFormData({ ...formData, organization: value })
                }
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
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter policy description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-userLimit">User Spending Limit ($)</Label>
                <Input
                  id="edit-userLimit"
                  type="number"
                  value={formData.userLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userLimit: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-teamLimit">Team Spending Limit ($)</Label>
                <Input
                  id="edit-teamLimit"
                  type="number"
                  value={formData.teamLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      teamLimit: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Expense Categories</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-category-${category}`}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label
                      htmlFor={`edit-category-${category}`}
                      className="text-sm"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-xs"
                    >
                      {category}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                        onClick={() => removeCategory(category)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
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
