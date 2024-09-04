import { FormControlLabel, Switch } from "@mui/material";
import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
	name: Path<T>;
	label: string;
};

export function RHFSwitchLabel<T extends FieldValues>({
	name,
	label,
}: Props<T>) {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControlLabel
					control={<Switch {...field} checked={field.value} />}
					label={label}
				/>
			)}
		/>
	);
}
