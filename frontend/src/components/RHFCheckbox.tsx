import {
	Controller,
	useFormContext,
	type FieldValues,
	type Path,
} from "react-hook-form";
import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
} from "@mui/material";
import type { Option } from "../types/option";
import { Checkbox } from "@mui/material";

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: Option[];
	label: string;
};

export function RHFCheckbox<T extends FieldValues>({
	name,
	options,
	label,
}: Props<T>) {
	const { control } = useFormContext();

	// return (
	// 	// biome-ignore lint/style/useSelfClosingElements: <explanation>
	// 	<Controller
	// 		control={control}
	// 		name={name}
	// 		render={({ field: { value, onChange }, fieldState: { error } }) => (
	// 			<FormControl error={!!error}>
	// 				<FormLabel>{label}</FormLabel>
	// 				<FormGroup>
	//         {options?.map((option) => (
	//           <FormControlLabel
	//           control={
	//             <Checkbox
	//               key={option.id}
	//               checked={value.includes(option.id)}
	//               onChange={() => {
	//                 if(value.includes(option.id){
	//                   onChange((value as string[]).filter((item) => item !== option.id))
	//                 })
	//                 else{
	//                   onChange([...value, option.id])
	//                 }
	//               }}
	//             />
	//           }
	//           label={option.label}
	//        />
	// 					))}
	// 				</FormGroup>
	// 			</FormControl>
	// 		)}
	// 	></Controller>
	// );
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormControl error={!!error}>
					<FormLabel>{label}</FormLabel>
					<FormGroup>
						{options?.map((option) => (
							<FormControlLabel
								key={option.id}
								control={
									<Checkbox
										checked={value.includes(option.id)}
										onChange={() => {
											if (value.includes(option.id)) {
												onChange(
													(value as string[]).filter(
														(item) => item !== option.id,
													),
												);
											} else {
												onChange([...value, option.id]);
											}
										}}
									/>
								}
								label={option.label}
							/>
						))}
						<FormHelperText>{error?.message}</FormHelperText>
					</FormGroup>
				</FormControl>
			)}
		/>
	);
}
