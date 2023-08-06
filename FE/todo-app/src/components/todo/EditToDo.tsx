import React, { FC, useState } from "react";
import styles from "./ToDo.module.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { toolbarOptions } from "./toolbarOptions";
import { UpdateToDoRequest, to_do } from "@/types/ToDo";
import { useUpdateToDoMutation } from "@/store/api/todoApi";
import { Button } from "../formComponents/Button";
import { cn } from "@/lib/utils";
import { Error } from "../formComponents/Error";

type Props = {
	todo: to_do;
	close: () => void;
};

export const EditToDo: FC<Props> = ({ todo, close }) => {
	const [value, _setValue] = useState("");
	const [edit, setEdit] = useState(false);
	const [update, { isError, isSuccess }] = useUpdateToDoMutation();
	const editButton = cn(styles.editButton);
	const buttons = cn("pt-5 flex justify-center");

	// const handleChange = (content: string) => {
	// 	setValue(content);
	// };

	const handleEdit = () => {
		setEdit(true);
	};

	const handleSave = () => {
		if (isError) {
			return;
		}
		const updateData: UpdateToDoRequest = {
			id: todo.id,
			title: todo.attributes.title,
			description: todo.attributes.description,
			longDescription: value,
			mustBeCompleted: todo.attributes.mustBeCompleted,
			completed: todo.attributes.completed,
			to_do_group: todo.attributes.to_do_group.data.id,
		};
		update(updateData);
		setEdit(false);
		isSuccess && close();
	};

	return (
		<>
			<div className={styles.editToDo}>
				<div>
					{/* <ReactQuill theme="snow" modules={toolbarOptions} value={value} onChange={handleChange} readOnly={!edit} /> */}
				</div>
				<div className={buttons}>
					{!edit && (
						<Button className={editButton} onClick={handleEdit}>
							Edit
						</Button>
					)}
					{edit && <Button onClick={handleSave}>Save</Button>}
				</div>
				{isError && (
					<Error errorMsg="Rich text cannot be longer then 1200 charts" />
				)}
			</div>
		</>
	);
};
