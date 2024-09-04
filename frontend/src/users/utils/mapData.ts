import type { Schema } from "../../types/schema";
import type { ApiCommon, ApiCreateEdit } from "../types/apiTypes";

export function mapData(data: Schema): ApiCreateEdit {
	const common: ApiCommon = {
		name: data.name,
		email: data.email,
		state: data.state,
		formDateAndTime: [
			data.formDateAndTime[0].toString(),
			data.formDateAndTime[1].toString(),
		],
		registrationDateAndTime: data.registrationDateAndTime.toString(),
		formRangeSalary: [data.formRangeSalary[0], data.formRangeSalary[1]],
		languages: data.languages,
		gender: data.gender,
		skills: data.skills,
		isTeacher: data.isTeacher,
		students: data.isTeacher === true ? data.students : [],
	};
	switch (data.variant) {
		case "create": {
			return { ...common, variant: data.variant };
		}
		case "edit": {
			return { ...common, variant: data.variant, id: data.id };
		}
	}
}
