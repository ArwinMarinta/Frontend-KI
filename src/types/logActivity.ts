import { User } from "./userType";

export interface ActivityLog {
  id: number;
  userId: number;
  action: string;
  description: string;
  device: string;
  ip_address: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}
