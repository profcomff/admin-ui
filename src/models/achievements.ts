export interface Achievement {
	id: number;
	name: string;
	description: string;
	picture: string | null;
	owner_user_id: number;
}

export interface Receiver {
	user_id: number;
}
