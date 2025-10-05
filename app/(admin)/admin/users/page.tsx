"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Badge/table UI moved into columns/DataTable
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
// Using TanStack Table via shared DataTable component
import DataTable from "~/component/table";
import { Plus, Search, UserCheck, Filter } from "lucide-react";

import { toast } from "sonner";
import { RegisterUserModal } from "~/component/RegisterUser-Modal";
import { InviteUserModal } from "./components/modals/InviteUserModal";
import { EditUserModal } from "./components/modals/EditUserModal";
import { useDeleteUserMutation } from "./components/mutations";
import {
  useOrganizations,
  useTeamsByOrganization,
  useUsersWithRelations,
} from "./components/queries";
import type { UserRow } from "./components/types";
import { getUserColumns } from "./components/columns";

// Invite and Edit modals are modularized under ./components/modals

export default function UsersPage() {
  // Filters and UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  // Removed teamRoleFilter per requirements
  const [statusFilter, setStatusFilter] = useState("all");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  // Inline form state and schemas removed; handled inside modular modals

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const order: "asc" | "desc" = "asc";
  const {
    data: usersQuery,
    isLoading,
    isError,
    refetch,
  } = useUsersWithRelations({
    page,
    limit,
    order,
    q: searchTerm || undefined,
    organizationId:
      organizationFilter !== "all" ? organizationFilter : undefined,
    teamId:
      organizationFilter !== "all" && teamFilter !== "all"
        ? teamFilter
        : undefined,
    role:
      userRoleFilter !== "all"
        ? (userRoleFilter as "Admin" | "Owner" | "Staff")
        : undefined,
    status:
      statusFilter === "Active"
        ? true
        : statusFilter === "Inactive"
        ? false
        : undefined,
  });

  const users = usersQuery?.rows ?? [];
  const pagination = usersQuery?.pagination as
    | { total?: number; page?: number; limit?: number; totalPages?: number }
    | undefined;

  // Reset to first page when server-driven filters change
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    organizationFilter,
    teamFilter,
    userRoleFilter,
    statusFilter,
  ]);

  // Reset to first page when primary filters change
  // Only search is server-driven currently; keep others UI-only for now
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Dynamic filter data
  const { data: organizations = [] } = useOrganizations();

  const orgSelected = organizationFilter !== "all";

  const { data: teams = [] } = useTeamsByOrganization(
    orgSelected ? (organizationFilter as string) : undefined,
    orgSelected
  );

  // Removed orgRoles query (team role filter removed)

  // Invite handled by InviteUserModal

  // Edit handled by EditUserModal

  const { mutate: deleteUser } = useDeleteUserMutation(() => refetch());

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleStatusToggle = (id: string) => {
    // TODO: Status toggle API then refetch
    refetch();
  };

  const handleRemoveFromTeam = (userId: string, team: string) => {
    // TODO: Implement remove-from-team API
    toast.message("Remove from Team not implemented yet");
  };

  const handleRemoveFromOrganization = (userId: string, org: string) => {
    // TODO: Implement remove-from-organization API
    toast.message("Remove from Organization not implemented yet");
  };

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Removed local reset and toggle helpers (handled in modular components if needed)

  const clearFilters = () => {
    setOrganizationFilter("all");
    setUserRoleFilter("all");
    setTeamFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

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
          <p className="text-muted-foreground">
            Manage users, roles, and team assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Register User
          </Button>
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
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
            <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="User Role (Admin/Owner/Staff)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All User Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
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
              </SelectContent>
            </Select>
            <Select
              value={organizationFilter}
              onValueChange={(val) => {
                setOrganizationFilter(val);
                setTeamFilter("all");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map((org: any) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {orgSelected ? (
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map((team: any) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div />
            )}
            {/* Team Role filter removed as requested */}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading users..." : `Showing ${users.length} users`}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>
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
          <CardDescription>
            View and manage all users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="p-6 text-sm text-destructive">
              Failed to load users.
            </div>
          ) : isLoading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading…</div>
          ) : (
            <DataTable
              columns={getUserColumns({
                onEdit: openEditModal,
                onStatusToggle: handleStatusToggle,
                onRemoveTeam: handleRemoveFromTeam,
                onRemoveOrg: handleRemoveFromOrganization,
                onDelete: handleDeleteUser,
              })}
              data={users}
            />
          )}
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              {pagination?.total !== undefined &&
              pagination?.page !== undefined &&
              pagination?.limit !== undefined
                ? `Page ${pagination.page} of ${
                    pagination.totalPages ?? "?"
                  } • ${users.length} / ${
                    pagination.limit
                  } on this page • Total ${pagination.total}`
                : `Showing ${users.length} users`}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span>Rows per page</span>
                <Select
                  value={String(limit)}
                  onValueChange={(v) => {
                    const newLimit = parseInt(v, 10) || 10;
                    setLimit(newLimit);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={isLoading || (pagination?.page ?? 1) <= 1}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={
                    isLoading ||
                    (pagination?.totalPages !== undefined &&
                      (pagination?.page ?? 1) >= (pagination?.totalPages ?? 1))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <RegisterUserModal
        open={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
        onSuccess={() => refetch()}
      />
      <InviteUserModal
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
        onSuccess={() => {
          toast.success("Invite sent");
          setIsInviteModalOpen(false);
          refetch();
        }}
      />
      <EditUserModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={editingUser}
        onSuccess={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
          refetch();
        }}
      />
    </div>
  );
}
