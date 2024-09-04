import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

type Props<T extends FieldValues> = {
	name: Path<T>;
};

export function RHFDateRange<T extends FieldValues>({ name }: Props<T>) {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, ...restField } }) => (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateRangePicker
						{...restField}
						value={Array.isArray(value) ? value : [null, null]}
					/>
				</LocalizationProvider>
			)}
		/>
	);
}
