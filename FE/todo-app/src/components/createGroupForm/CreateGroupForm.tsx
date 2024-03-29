import { FormProvider, useForm } from "react-hook-form";
import React, { FC, useState } from "react";
import { Button } from "../formComponents/Button";
import { Error } from "../formComponents/Error";
import { Input } from "../formComponents/Input";
import { createPortal } from "react-dom";
import styles from "./CreateGroup.module.css";
import { to_do } from "@/types/ToDo";
import { useCreateGroupMutation } from "@/store/api/groupToDoApi";
import { useMeQuery } from "@/store/api/authenticationApi";
import { useBodyRef } from "@/hooks/useBodyRef";

type Props = {
  closeModal: () => void;
};

export type CreateGroupToDoType = {
  title: string;
  to_dos: to_do[];
  users_permissions_user: number;
};

export const CreateGroupForm: FC<Props> = ({ closeModal }) => {
  const [dataError, setDataError] = useState(false);
  const methods = useForm<CreateGroupToDoType>({
    defaultValues: { title: "" },
  });

  const [createGroup, { isError }] = useCreateGroupMutation();
  const { data: meData } = useMeQuery();
  const bodyRef = useBodyRef();

  const onSubmit = async (data: CreateGroupToDoType) => {
    if (!meData) {
      return;
    }
    const dataInput = {
      data: {
        title: data.title,
        users_permissions_user: parseInt(meData.id),
        to_dos: [],
      },
      userId: parseInt(meData.id),
    };

    const dataGroup = await createGroup(dataInput).unwrap();
    if (dataGroup) {
      setDataError(false);
      closeModal();
    } else {
      setDataError(true);
    }
  };

  const { handleSubmit, formState } = methods;

  return (
    bodyRef &&
    createPortal(
      <>
        <div className={styles.createGroupContainer}>
          <div className="bg-gray-800">
            <div className="flex justify-end w-100 p-3">
              <Button onClick={closeModal} buttonType="closeButton" />
            </div>
            <div className="border-b  mx-10">
              <div className="flex justify-center px-4 py-2">
                Create your group of ToDos
              </div>
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  name="title"
                  description="Write a name of group"
                  placeholder="name"
                />
                <Error errorMsg={formState.errors.title?.message} />
                {isError && <Error errorMsg="Maximum length is 10" />}
                {dataError && (
                  <Error errorMsg="There is a problem with data" />
                )}
                <Button buttonType="submitType">Create</Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </>,
      bodyRef
    )
  );
};
