import { to_do } from "./ToDo";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export type RegisterResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export type MeResponse = {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  to_do_groups: to_do_group_me[];
};

export type to_do_group_me = {
  id: number;
  title: string;
  to_dos: to_do[];
  createdAt: string;
  updatedAt: string;
};

export type LoginInputs = LoginRequest;

export type RegisterInputs = RegisterRequest;
