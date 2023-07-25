import { ApiRequest, ApiResponse } from "./Api";

import { to_do, to_do_group } from "./ToDo";

export type UsersPermissionsUser = {
	username: string;
	email: string;
	provider: string;
	resetPasswordToken: string;
	confirmationToken: string;
	confirmed: boolean;
	blocked: boolean;
	to_do_groups: {
		data: to_do_group;
	};
	createdAt: string;
	updatedAt: string;
};

export type CreateGroupToDoRequest = ApiRequest<{
	title: string;
	users_permissions_user: number;
	to_dos: to_do[];
}>;

export type CreateGroupToDoResponse = ApiResponse<{
	id: number;
	attributes: {
		title: string;
		users_permissions_user: UsersPermissionsUser;
		to_dos: {
			data: to_do[];
		};
	};
}>;

export type GetGroupResponse = ApiResponse<
	{
		id: number;
		attributes: {
			title: string;
			users_permissions_user: UsersPermissionsUser;
			to_dos: {
				data: to_do[];
			};
			createdAt: string;
			publishedAt: string;
			updatedAt: string;
		};
	}[]
>;
