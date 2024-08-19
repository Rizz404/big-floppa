export interface User {
  id: string;
  oauthId: string | null;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  lastLogin: Date | null;
  isOauth: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LoginData = Pick<User, "email" | "password">;
export type RegisterData = Pick<User, "username" | "email" | "password">;

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
