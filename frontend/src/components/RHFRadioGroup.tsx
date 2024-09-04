import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import type { Option } from "../types/option";

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: Option[];
	label: string;
};

export function RHFRadioGroup<T extends FieldValues>({
	name,
	options,
	label,
}: Props<T>) {
	const { control } = useFormContext();

	return (
		// biome-ignore lint/style/useSelfClosingElements: <explanation>
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl {...field} error={!!error}>
					<FormLabel>{label}</FormLabel>
					<RadioGroup>
						{options?.map((option) => (
							<FormControlLabel
								key={option.id}
								label={option.label}
								control={<Radio checked={field.value === option.id} />}
								value={option.id}
							/>
						))}
					</RadioGroup>
				</FormControl>
			)}
		></Controller>
	);
}
