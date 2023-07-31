import React, { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseISO, isValid, isAfter } from "date-fns";
import styles from "./CreateToDoForm.module.css";
import { createPortal } from "react-dom";
import { useCreateToDoMutation } from "@/store/api/todoApi";
import { Input } from "../formComponents/Input";
import { Button } from "../formComponents/Button";
import { Error } from "../formComponents/Error";
import { useAppSelector } from "@/store/hooks";

type Props = {
  closeModal: () => void;
};

export type CreateToDoType = {
  title: string;
  description: string;
  longDescription: string;
  mustBeCompleted: string;
  completed: boolean;
  to_do_group: number | null;
};

export const CreateToDoForm: FC<Props> = ({ closeModal }) => {
  const [dataError, setDataError] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    longDescription: yup.string().required("Long description is required"),
    mustBeCompleted: yup
      .string()
      .required("Must be completed date is required")
      .test("isFutureDate", "The date must be in the future", (value) => {
        const currentDate = new Date();
        const selectedDate = parseISO(value);
        return !isValid(selectedDate) || isAfter(selectedDate, currentDate);
      }),
    completed: yup.boolean().required(),
  });

  const methods = useForm<CreateToDoType>({
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      mustBeCompleted: "",
      completed: false,
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  const [createToDo, { isError }] = useCreateToDoMutation();
  const { idGroup } = useAppSelector(({ idGroupToDo }) => idGroupToDo);

  const onSubmit = async (data: CreateToDoType) => {
    const dataForm = {
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        mustBeCompleted: data.mustBeCompleted,
        completed: data.completed,
        to_do_group: idGroup,
      },
    };

    const dataToDo = await createToDo(dataForm).unwrap();

    if (dataToDo.data) {
      setDataError(false);
      closeModal();
    } else {
      setDataError(true);
    }
  };

  return createPortal(
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

              <Input name="longDescription" description="Long Description" placeholder="Long Description" type="text" />
              <Error errorMsg={formState.errors.longDescription?.message} />

              <Input name="mustBeCompleted" description="When ToDo have to be done?" type="datetime-local" />
              <Error errorMsg={formState.errors.mustBeCompleted?.message} />
              {isError && <Error errorMsg="Maximum length is 10" />}
              {dataError && <Error errorMsg="There is a problem with data" />}

              <Button buttonType="submitType">Create</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>,
    document.body
  );
};
