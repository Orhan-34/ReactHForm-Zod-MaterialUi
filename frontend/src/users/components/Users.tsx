import {
	type SubmitHandler,
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";
import {
	Button,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Stack,
	Typography,
} from "@mui/material";
import { RHFormAutoComplet } from "../../components/RHFormAutoComplet";
import { defaultValues, schema, type Schema } from "../../types/schema";
import { Fragment, useEffect } from "react";
import {
	gendersQueries,
	languagesQueries,
	skillsQueries,
	stateQueries,
	usersQueries,
	userQueries,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateAndTimePicker } from "../../components/RHFDateAndTimePicker";
import { RHFDateRange } from "../../components/RHFDateRange";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitchLabel } from "../../components/RHFSwitchLabel";
import { RHFTextField } from "../../components/RHFTextField";
import { createUser, editUser } from "../services/mutations";

export function Users() {
	const stateQuery = stateQueries();
	const languagesQuery = languagesQueries();
	const genderQuery = gendersQueries();
	const skillsQuery = skillsQueries();
	const usersQuery = usersQueries();

	const {
		control,
		formState: { errors },
		unregister,
		reset,
		setValue,
		handleSubmit,
		getValues,
	} = useFormContext<Schema>();

	const id = useWatch({ control, name: "id" });
	const variant = useWatch({ control, name: "variant" });

	const userQuery = userQueries(id);

	const handleClickUserList = (id: string) => {
		setValue("id", id);
	};

	useEffect(() => {
		if (userQuery.data) {
			reset(userQuery.data);
		}
	}, [reset, userQuery.data]);

	const handleResetButton = () => {
		reset(defaultValues);
	};

	const isTeacher = useWatch({ control, name: "isTeacher" });

	const { append, fields, remove, replace } = useFieldArray({
		control,
		name: "students",
	});

	useEffect(() => {
		if (!isTeacher) {
			replace([]);
			unregister("students");
		}
	}, [isTeacher, replace, unregister]);

	const useCreateMutation = createUser();
	const editUserMutation = editUser();

	const onSubmit: SubmitHandler<Schema> = (data) => {
		if (variant === "create") {
			useCreateMutation.mutate(data);
		} else {
			editUserMutation.mutate(data);
		}
	};

	return (
		<Container
			maxWidth="md"
			component={"form"}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack sx={{ flexDirection: "row", gap: 2 }}>
				<List subheader={<ListSubheader>Users</ListSubheader>}>
					{usersQuery.data?.map((user) => (
						<ListItem disablePadding key={user.id}>
							<ListItemButton
								onClick={() => handleClickUserList(user.id)}
								selected={id === user.id}
							>
								<ListItemText primary={user.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Stack sx={{ gap: 2 }}>
					<RHFTextField name="name" label="Name" />
					<RHFTextField name="email" label="Email" />
					<RHFormAutoComplet<Schema>
						name="state"
						label="States"
						options={Array.isArray(stateQuery.data) ? stateQuery.data : []}
					/>
					<RHFToggleButtonGroup<Schema>
						name={"languages"}
						options={
							Array.isArray(languagesQuery.data) ? languagesQuery.data : []
						}
					/>
					<RHFRadioGroup<Schema>
						name="gender"
						options={Array.isArray(genderQuery.data) ? genderQuery.data : []}
						label="Gender"
					/>
					<RHFCheckbox<Schema>
						name="skills"
						options={Array.isArray(skillsQuery.data) ? skillsQuery.data : []}
						label="Skills"
					/>
					<RHFDateAndTimePicker<Schema>
						name="registrationDateAndTime"
						label="Registration Date & Time"
					/>
					<Typography variant="h6">Form Date & Time</Typography>
					<RHFDateRange<Schema> name="formDateAndTime" />
					<RHFSlider name="formRangeSalary" label="Salary Range" />
					<RHFSwitchLabel<Schema> name="isTeacher" label="Are you a teacher?" />

					{isTeacher && (
						<Button onClick={() => append({ name: "" })} type="button">
							Add New Student
						</Button>
					)}

					{fields.map((field, index) => (
						<Fragment key={field.id}>
							<RHFTextField name={`students.${index}.name`} label="Name" />
							<Button color="error" onClick={() => remove(index)} type="button">
								Remove
							</Button>
						</Fragment>
					))}
					<Stack
						sx={{ flexDirection: "row", justifyContent: "center", gap: 20 }}
					>
						<Button type="submit">
							{variant === "create" ? "New user" : "Edit user"}
						</Button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button onClick={() => schema.parse(getValues())}>parse</button>
						<Button onClick={handleResetButton} color="error">
							Reset
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}
