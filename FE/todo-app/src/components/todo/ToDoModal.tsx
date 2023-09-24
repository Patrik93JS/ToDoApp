import React, { FC } from "react";
import { Button } from "../formComponents/Button";
import { EditToDo } from "./EditToDo";
import styles from "./ToDo.module.css";
import { to_do } from "@/types/ToDo";
import { Description } from "../formComponents/Description";
import { cn } from "@/lib/utils";

type Props = {
  todo: to_do;
  close: () => void;
};

export const ToDoModal: FC<Props> = ({ close, todo }) => {
  const modal = cn("bg-gray-800 w-10px h-auto ");
  const buttonClass = cn("flex justify-end p-3");
  const content = cn("flex justify-center p-5 flex-col text-center");

  return (
    <div className={styles.toDoModalContainer}>
      <div className={modal}>
        <div className={buttonClass}>
          <Button onClick={close} buttonType="closeButton" />
        </div>
        <div className={content}>
          <Description>{todo.attributes.title}</Description>
          <Description>{todo.attributes.description}</Description>
          <div
            className="break-all"
            dangerouslySetInnerHTML={{
              __html: todo.attributes.longDescription,
            }}
          ></div>
          <EditToDo todo={todo} close={close} />
        </div>
      </div>
    </div>
  );
};
