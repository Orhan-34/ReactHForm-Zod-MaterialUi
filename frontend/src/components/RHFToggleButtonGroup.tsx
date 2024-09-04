import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";
import type { Option } from "../types/option";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: Option[];
};

export function RHFToggleButtonGroup<T extends FieldValues>({
	name,
	options,
}: Props<T>) {
	const { control } = useFormContext();

	return (
		// biome-ignore lint/style/useSelfClosingElements: <explanation>
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange, ...restField } }) => (
				<ToggleButtonGroup
					onChange={(_, newValue) => {
						if (newValue.length) {
							onChange(newValue);
						}
					}}
					value={value.length ? value : [options?.[2]?.id || ""]}
					{...restField}
				>
					{options?.map((option) => (
						<ToggleButton key={option.id} value={option.id}>
							{option.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			)}
		></Controller>
	);
}
