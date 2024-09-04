import { z } from "zod";

import { patterns } from "../constants";

export const schema = z
	.intersection(
		z.object({
			name: z.string().min(1, { message: "Name is required" }),
			email: z
				.string()
				.min(10, { message: "Email is required" })
				.refine((value) => patterns.email.test(value), {
					message: "Invalid email please check your email",
				}),
			state: z.array(z.string()).min(1).max(2),
			languages: z.array(z.string()),
			gender: z.string().min(1),
			skills: z.array(z.string()).min(1),
			registrationDateAndTime: z.date(),
			formDateAndTime: z.array(z.date()).min(2).max(2),
			formRangeSalary: z.array(z.number()).max(2),
		}),
		z.discriminatedUnion("variant", [
			z.object({ variant: z.literal("create") }),
			z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
		]),
	)
	.and(
		z.union([
			z.object({ isTeacher: z.literal(false) }),
			z.object({
				isTeacher: z.literal(true),
				students: z.array(
					z.object({
						name: z.string().min(5),
					}),
				),
			}),
		]),
	);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
	variant: "create",
	name: "",
	email: "",
	state: [],
	languages: [],
	gender: "",
	skills: [],
	registrationDateAndTime: new Date(),
	formDateAndTime: [new Date(), new Date()],
	formRangeSalary: [0, 2000],
	isTeacher: false,
};
