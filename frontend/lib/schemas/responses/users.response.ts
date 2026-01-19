export interface UserDetail {
  msTeamsId?: string;
  profilePicture?: string;
  phoneNumber?: string;
  birthdate?: string; // Dates are usually strings in JSON
}

export interface Country {
  code: string;
  name: string;
  phoneCountryCode?: string;
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  lastname: string;
  role: Role;
  country: Country | null;
  isActive: boolean;
  userDetail?: UserDetail | null;
  position?: {
    id: string;
    title: string;
    area: {
      id: string;
      name: string;
    } | null;
  } | null;
}
