import React, { FC } from "react";
import styles from "./ToDo.module.css";
import { Description } from "../formComponents/Description";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Button } from "../formComponents/Button";
import { ToDoModal } from "./ToDoModal";
import { Complete } from "./Complete";
import { to_do } from "@/types/ToDo";
import { DeleteToDo } from "./DeleteToDo";
import { useModal } from "@/hooks/useModal";

type Props = {
  todo: to_do;
};

export const ToDo: FC<Props> = ({ todo }) => {
  const { isOpen, open, close } = useModal();
  const container = cn(styles.toDoContainer);
  const content = cn(styles.toDoContent);
  const toDoButtonModal = cn(styles.toDoButtonModal);
  const mustBeCompletedReverse = todo.attributes.mustBeCompleted?.toLocaleString().split("T")[0].split("-").reverse().join("-");

  return !isOpen ? (
    <div className={container}>
      <div className={content}>
        <Complete todo={todo} />
        <Description>{todo.attributes.title}</Description>
        <Description>{mustBeCompletedReverse}</Description>
        <Description>{todo.attributes.description}</Description>
        <Button onClick={open} className={toDoButtonModal}>
          Open ToDo
        </Button>
        <DeleteToDo todo={todo} />
      </div>
    </div>
  ) : (
    createPortal(<ToDoModal key={todo.id} close={close} todo={todo} />, document.body)
  );
};
