import React, { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./CreateToDoForm.module.css";
import { createPortal } from "react-dom";
import { useCreateToDoMutation } from "@/store/api/todoApi";
import { Input } from "../formComponents/Input";
import { Button } from "../formComponents/Button";
import { Error } from "../formComponents/Error";
import { useAppSelector } from "@/store/hooks";

type Props = {
  open: boolean;
  closeModal: () => void;
};

export type CreateToDoType = {
  title: string;
  description: string;
  mustBeCompleted: Date;
  completed: boolean;
  to_do_group: number | null;
};

export const CreateToDoForm: FC<Props> = ({ open, closeModal }) => {
  const methods = useForm<CreateToDoType>({
    defaultValues: {
      title: "",
      description: "",
      mustBeCompleted: new Date(),
      completed: false,
    },
  });

  const { handleSubmit, formState } = methods;

  const [createToDo] = useCreateToDoMutation();
  const { idGroup } = useAppSelector(({ idGroupToDo }) => idGroupToDo);

  const onSubmit = async (data: CreateToDoType) => {
    const dataForm = {
      data: {
        title: data.title,
        description: data.description,
        mustBeCompleted: data.mustBeCompleted,
        completed: data.completed,
        to_do_group: idGroup,
      },
    };
    createToDo(dataForm);
    closeModal();
  };

  return open
    ? createPortal(
        <>
          <div className={styles.createToDoContainer}>
            <div className="bg-gray-800 w-1/4">
              <div className="flex justify-end w-100 p-3">
                <Button onClick={closeModal} buttonType="closeButton" />
              </div>
              <div className="border-b  mx-10">
                <div className="flex justify-center px-4 py-2">Create your ToDo</div>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input name="title" description="Name ToDo" placeholder="Name" type="text" />
                  <Error errorMsg={formState.errors.title?.message} />

                  <Input name="description" description="Describe ToDo" placeholder="Description" type="text" />
                  <Error errorMsg={formState.errors.description?.message} />

                  <Input name="mustBeCompleted" description="When ToDo have to be done?" type="datetime-local" />
                  <Error errorMsg={formState.errors.mustBeCompleted?.message} />

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
