import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Option } from "../../types/option";
import type { ApiGet } from "../types/apiTypes";
import type { Schema } from "../../types/schema";

export function stateQueries() {
	return useQuery({
		queryKey: ["states"],
		queryFn: () =>
			axios
				.get<Option>("http://localhost:8080/states")
				.then((response) => response.data),
	});
}

export function languagesQueries() {
	return useQuery({
		queryKey: ["languages"],
		queryFn: () =>
			axios
				.get<Option>("http://localhost:8080/languages")
				.then((response) => response.data),
	});
}

export function gendersQueries() {
	return useQuery({
		queryKey: ["genders"],
		queryFn: () =>
			axios
				.get<Option>("http://localhost:8080/genders")
				.then((response) => response.data),
	});
}

export function skillsQueries() {
	return useQuery({
		queryKey: ["skills"],
		queryFn: () =>
			axios
				.get<Option>("http://localhost:8080/skills")
				.then((response) => response.data),
	});
}

export function usersQueries() {
	return useQuery({
		queryKey: ["users"],
		queryFn: (): Promise<Option[]> =>
			axios.get<ApiGet[]>("http://localhost:8080/users").then((response) =>
				response.data.map((user) => ({
					id: user.id.toString(),
					label: user.name,
				})),
			),
	});
}

export function userQueries(id: string) {
	return useQuery({
		queryKey: ["user", { id }],
		queryFn: async (): Promise<Schema> => {
			const { data } = await axios.get<ApiGet>(
				`http://localhost:8080/users/${id}`,
			);

			return {
				variant: "edit",
				id: data.id.toString(),
				name: data.name,
				email: data.email,
				state: data.state,
				formDateAndTime: [
					new Date(data.formDateAndTime[0]),
					new Date(data.formDateAndTime[1]),
				],
				registrationDateAndTime: new Date(data.registrationDateAndTime),
				formRangeSalary: [data.formRangeSalary[0], data.formRangeSalary[1]],
				languages: data.languages,
				gender: data.gender,
				skills: data.skills,
				isTeacher: data.isTeacher,
				students: data.students,
			};
		},
		enabled: !!id,
	});
}
