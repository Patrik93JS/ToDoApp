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
};

export type LoginInputs = LoginRequest;

export type RegisterInputs = RegisterRequest;
