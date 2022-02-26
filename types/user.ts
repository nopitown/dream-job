export type User = {
  id: number;
  email: string;
  name: string | null;
};

export type NewUser = Omit<User, "id"> & {
  id?: number;
};
