import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Slider, Typography } from "@mui/material";

type Props<T extends FieldValues> = {
	name: Path<T>;
	label: string;
};

export function RHFSlider<T extends FieldValues>({ name, label }: Props<T>) {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, ...restField } }) => (
				<>
					<Typography>{label}</Typography>
					<Slider {...restField} valueLabelDisplay="auto" />
				</>
			)}
		/>
	);
}
