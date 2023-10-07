import { useState } from "react";

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type User = {
  id: string;
  name: string;
  role: UserRole;
};

export const initUser: User = {
  id: "",
  name: "",
  role: UserRole.MEMBER,
};

const useStore = () => {
  const [user, setUser] = useState<User | null>(null);

  return {
    user,
    setUser,
  };
};

export default useStore;
