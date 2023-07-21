import { ApiResponse, ApiRequest } from "./Api";
import { UsersPermissionsUser } from "./Group";

export type createdBy = {
  data: {
    id: number;
    attributes: any;
  };
};

export type updatedBy = {
  data: {
    id: number;
    attributes: any;
  };
};

export type to_do = {
  id: number;
  attributes: {
    title: string;
    description: string;
    longDescription: string;
    mustBeCompleted: string;
    completed: boolean;
    to_do_group: {
      data: to_do_group;
    };
    createdAt: string[];
    updatedAt: string[];
    publishedAt: string[];
    createdBy: createdBy;
    updatedBy: updatedBy;
  };
};

export type to_do_group = {
  id: number;
  attributes: {
    title: string;
    users_permissions_user: {
      data: UsersPermissionsUser;
    };
    to_dos: {
      data: to_do[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    createdBy: createdBy;
    updatedBy: updatedBy;
  };
};

export type CreateToDoRequest = ApiRequest<{
  title: string;
  description: string;
  longDescription: string;
  mustBeCompleted: string;
  completed: boolean;
  to_do_group: number | null;
}>;

export type CreateToDoResponse = ApiResponse<{
  id: number;
  attributes: {
    title: string;
    description: string;
    longDescription: string;
    mustBeCompleted: string;
    completed: boolean;
    to_do_group: {
      data: to_do_group;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}>;

export type GetToDosResponse = ApiResponse<to_do[]>;
export type UpdateToDoRequest = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  mustBeCompleted: string;
  completed: boolean;
  to_do_group: number | null;
};

export type UpdateToDoResponse = ApiResponse<{
  id: number;
  attributes: {
    title: string;
    description: string;
    longDescription: string;
    mustBeCompleted: string;
    completed: boolean;
    to_do_group: {
      data: to_do_group;
    };
  };
}>;
