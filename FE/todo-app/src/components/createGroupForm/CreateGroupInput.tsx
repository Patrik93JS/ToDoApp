import React, { FC } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./CreateGroup.module.css";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateGroupMutation } from "@/store/api/groupToDoApi";
import { ApiRequest } from "@/types/Api";

type Props = {
  open: boolean;
  closeModal: () => void;
};

export type CreateGroupToDoType = ApiRequest<{
  title: string;
}>;

export const CreateGroupInput: FC<Props> = ({ open, closeModal }) => {
  const { register, handleSubmit } = useForm<CreateGroupToDoType>({
    defaultValues: { data: { title: "" } },
  });

  const [createGroup] = useCreateGroupMutation();

  const onSubmit = async (data: CreateGroupToDoType) => {
    createGroup(data);
    closeModal();
    console.log("data", data);
  };

  return open
    ? createPortal(
        <>
          <div className={styles.createGroupContainer}>
            <div className="bg-gray-800 w-1/4">
              <div className="flex justify-end w-100 p-3">
                <button className={styles.createGroupCloseButton} onClick={closeModal}>
                  <AiFillCloseCircle />
                </button>
              </div>
              <div className="border-b  mx-10">
                <div className="flex justify-center px-4 py-2">Create your group of ToDos</div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-10 flex justify-center ">
                  <input
                    type="text"
                    className="bg-black px-3 py-1 rounded-md text-green-500"
                    placeholder="Write a name of group"
                    {...register("data.title")}
                  />
                </div>
                <button className={styles.createButton} type="submit">
                  Create!
                </button>
              </form>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};