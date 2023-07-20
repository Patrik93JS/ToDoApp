import React, { FC } from "react";
import styles from "./CreateGroup.module.css";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateGroupMutation } from "@/store/api/groupToDoApi";
import { Input } from "../formComponents/Input";
import { Button } from "../formComponents/Button";
import { Error } from "../formComponents/Error";
import { to_do } from "@/types/ToDo";

type Props = {
  open: boolean;
  closeModal: () => void;
};

export type CreateGroupToDoType = {
  title: string;
  to_dos: to_do[];
};

export const CreateGroupForm: FC<Props> = ({ open, closeModal }) => {
  const methods = useForm<CreateGroupToDoType>({
    defaultValues: { title: "" },
  });

  const [createGroup, { isError }] = useCreateGroupMutation();

  const onSubmit = async (data: CreateGroupToDoType) => {
    const dataInput = {
      data: {
        title: data.title,
        to_dos: [],
      },
    };
    await Promise.all([createGroup(dataInput).unwrap()]);
    methods.setValue("title", "");
    closeModal();
  };

  const { handleSubmit, formState } = methods;

  return open
    ? createPortal(
        <>
          <div className={styles.createGroupContainer}>
            <div className="bg-gray-800 w-1/4">
              <div className="flex justify-end w-100 p-3">
                <Button onClick={closeModal} buttonType="closeButton" />
              </div>
              <div className="border-b  mx-10">
                <div className="flex justify-center px-4 py-2">Create your group of ToDos</div>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input type="text" name="title" description="Write a name of group" placeholder="name" />
                  <Error errorMsg={formState.errors.title?.message} />
                  {isError && <Error errorMsg="Maximum length is 10" />}
                  <Button buttonType="submitType">Create</Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};
