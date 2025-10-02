export interface UserRow {
	id: string;
	name: string;
	email: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	roles: string[];
	teams: string[];
	organizations: string[];
	status: "Active" | "Inactive";
	lastLogin: string;
	avatar?: string;
}
