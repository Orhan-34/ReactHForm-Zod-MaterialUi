type Create = {
	variant: "create";
};

type Edit = {
	id: number;
	variant: "edit";
};

export type ApiCommon = {
	email: string;
	name: string;
	gender: string;
	state: string[];
	languages: string[];
	skills: string[];
	registrationDateAndTime: string;
	formDateAndTime: [string, string];
	formRangeSalary: [number, number];
	isTeacher: boolean;
	students: {
		name: string;
	}[];
};

export type ApiCreateEdit = ApiCommon & (Create | Edit);
export type ApiGet = Edit & ApiCommon;
