import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDeleteGroupMutation, useGetGroupsQuery } from "@/store/api/groupToDoApi";

import { Button } from "../formComponents/Button";
import { setIdGroup } from "@/store/slices/idGroupToDo";
import styles from "./SideBar.module.css";
import { useDeleteToDoMutation, useGetToDosQuery } from "@/store/api/todoApi";
import { useMeQuery } from "@/store/api/authenticationApi";

type Props = {
  title: string | null;
  close: () => void;
};

export const DeleteGroupModal: FC<Props> = ({ close, title }) => {
  const [deleteGroup, { isSuccess }] = useDeleteGroupMutation();
  const [deleteToDo] = useDeleteToDoMutation();
  const { data: meData } = useMeQuery();
  const { data } = useGetToDosQuery(); // TODO si musim vytahnout odsud bych tak rekl, v tom vypada ze to je vse spravne
  // const { data } = useGetGroupsQuery({
  //   userId: parseInt((meData?.id ?? 0) as string),
  // });

  const dispatch = useAppDispatch();
  const selectedGroupId = useAppSelector(({ idGroupToDo }) => idGroupToDo.idGroup);
  console.log(
    "toDos",
    meData?.to_do_groups.map((e) => e.to_dos.map((f) => f.id))
  );

  const handleDeleteGroup = async () => {
    // if (!data) {
    //   return;
    // }

    const todoGroup = meData?.to_do_groups.find((group) => group.id == selectedGroupId);

    const toDos = todoGroup?.to_dos.map((todo) => todo.id);

    if (!toDos) {
      return;
    }

    await Promise.all(toDos?.map((todo) => deleteToDo(todo).unwrap()));
    await deleteGroup(selectedGroupId);
    dispatch(setIdGroup(null));
    isSuccess && close();
  };

  return (
    <div className={styles.toDoDeleteModalGroupContainer}>
      <div className={styles.modalFrame}>
        <div className={styles.modalWarning}>Are you sure you want to delete Group:</div>
        <div className={styles.modalBorder}>{title}</div>
        <div className="flex flex-row pt-5">
          <Button className={styles.toDoDeleteGroupButtonConfirm} onClick={handleDeleteGroup}>
            Delete
          </Button>
          <Button onClick={close}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
