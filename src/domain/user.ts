export type User = {
  id: string;
  email: string;
  salt: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
};
