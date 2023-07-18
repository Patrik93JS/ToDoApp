import React, { FC } from "react";
import styles from "./ToDo.module.css";
import { useUpdateToDoMutation } from "@/store/api/todoApi";
import { UpdateToDoRequest, to_do } from "@/types/ToDo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setComplete } from "@/store/slices/todoCompleteSlice";
import { cn } from "@/lib/utils";

type Props = {
  todo: to_do;
};

export const Complete: FC<Props> = ({ todo }) => {
  const checkboxStyle = cn(
    "peer relative appearance-none shrink-0 w-4 h-4 border-2 border-blue-200 rounded-sm mt-1 bg-whitefocus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 checked:bg-green-500 checked:border-0 disabled:border-steel-400 disabled:bg-steel-400"
  );
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
      <input type="checkbox" onChange={handleChange} checked={todo.attributes.completed} className={checkboxStyle} />
    </div>
  );
};
