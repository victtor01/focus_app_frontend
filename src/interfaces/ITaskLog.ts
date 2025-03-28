import { ITask } from "./ITask";

export interface ITaskLog {
	id: string;
	day: string;
	hour?: string | null;
	task?: ITask
}