export type UserModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
};
