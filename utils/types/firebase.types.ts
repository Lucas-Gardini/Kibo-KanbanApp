import { UserInfo } from "firebase/auth";

export interface IUser extends UserInfo {}

export interface IProject {
	id?: string;
	name: string;
	description?: string;
	columns: IColumn[];
	tasks: ITask[];
	owner: string;
	createdAt: Date;
	updatedAt?: Date;
}

export interface IColumn {
	color: string;
	name: string;
	updatedAt?: Date;
}

export interface ITask {
	id?: string;
	name: string;
	description?: string;
	project: string;
	column: string;
}
