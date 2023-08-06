import React, { FC } from "react";
import { Button } from "../formComponents/Button";
import { MdDelete } from "react-icons/md";
import { cn } from "@/lib/utils";
import styles from "./ToDo.module.css";
import { useModal } from "@/hooks/useModal";
import { createPortal } from "react-dom";
import { DeleteModal } from "./DeleteModal";
import { to_do } from "@/types/ToDo";
import { useBodyRef } from "@/hooks/useBodyRef";

type Props = {
	todo: to_do;
};

export const DeleteToDo: FC<Props> = ({ todo }) => {
	const { isOpen, open, close } = useModal();
	const bodyRef = useBodyRef();
	const toDoButtonDelete = cn(styles.toDoDeleteButton);
	return !isOpen ? (
		<Button className={toDoButtonDelete} onClick={open}>
			<MdDelete size="20" />
		</Button>
	) : (
		bodyRef &&
			createPortal(
				<DeleteModal close={close} title={todo.attributes.title} todo={todo} />,
				bodyRef
			)
	);
};
