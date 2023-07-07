import React, { FC } from "react";
import styles from "./ToDo.module.css";
import { useUpdateToDoMutation } from "@/store/api/todoApi";
import { UpdateToDoRequest, to_do } from "@/types/ToDo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setComplete } from "@/store/slices/todoCompleteSlice";

type Props = {
  todo: to_do;
};

export const Complete: FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector((state) => state.todoComplete.todoComplete[todo.id] || false);

  const [update] = useUpdateToDoMutation();
  const { idGroup } = useAppSelector(({ idGroupToDo }) => idGroupToDo);

  const handleChange = () => {
    const newChecked = !checked;
    dispatch(setComplete({ id: todo.id, checked: newChecked }));

    const mustBeCompletedFormatted = new Date(todo.attributes.mustBeCompleted).toISOString();

    const updateData: UpdateToDoRequest = {
      id: todo.id,
      title: todo.attributes.title,
      description: todo.attributes.description,
      longDescription: todo.attributes.longDescription,
      mustBeCompleted: mustBeCompletedFormatted,
      completed: newChecked,
      to_do_group: idGroup,
    };
    update(updateData);
  };

  return (
    <div className={styles.completeCheckbox}>
      <input type="checkbox" onChange={handleChange} checked={todo.attributes.completed} />
    </div>
  );
};
