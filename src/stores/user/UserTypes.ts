export type AccountsType = 'guest' | 'user' | 'admin';

export interface UserProfile {
  _id?: string;
  role: AccountsType;
  address?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  fbId?: string;
  googleId?: string;
}
