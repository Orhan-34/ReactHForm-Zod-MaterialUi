import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Schema } from "../../types/schema";
import axios from "axios";
import { mapData } from "../utils/mapData";
import { omit } from "lodash";

export function createUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Schema) => {
			await axios.post(
				"http://localhost:8080/users",
				omit(mapData(data), "variant"),
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [""] });
			alert("User created successfully");
		},
	});
}

export function editUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: Schema) => {
			if (data.variant === "edit") {
				await axios.put(
					`http://localhost:8080/users/${data.id}`,
					omit(mapData(data), "variant"),
				);
				alert("User edited successfully");
			}
		},
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({ queryKey: ["users"] });

			if (variables.variant === "edit") {
				await queryClient.invalidateQueries({
					queryKey: ["user", variables.id],
				});
			}
		},
	});
}
