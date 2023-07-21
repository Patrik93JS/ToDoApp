"use client";

import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useRegisterMutation } from "@/store/api/authenticationApi";
import { Input } from "../formComponents/Input";
import { Error } from "../formComponents/Error";
import { Button } from "../formComponents/Button";
import { useRouter } from "next/navigation";

export type RegistrationFormType = {
  username: string;
  email: string;
  password: string;
};

export const RegistrationForm = () => {
  const [dataError, setDataError] = useState(false);
  const methods = useForm<RegistrationFormType>({
    defaultValues: { username: "", email: "", password: "" },
  });
  const router = useRouter();
  const [registration] = useRegisterMutation();

  const onSubmit = async (data: RegistrationFormType) => {
    try {
      const registrationData = await registration(data).unwrap();
      if (registrationData) {
        setDataError(false);
        router.push("/");
      }
    } catch (error) {
      setDataError(true);
    }
  };

  const { handleSubmit, formState } = methods;

  return (
    <div className={styles.registrationFormContainer}>
      <div className="bg-gray-800 w-1/4 ">
        <div className="flex justify-end w-100 p-3"></div>
        <div className="border-b  mx-10">
          <div className="flex justify-center px-4 py-2">Make your registration</div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              name="username"
              description="Username"
              placeholder="Username"
              validationValue={/[A-Za-z]{3,}/}
              validationMessage="minimum is 3 characters"
            />
            <Error errorMsg={formState.errors.username?.message} />

            <Input type="text" name="email" description="Email" placeholder="Email" />

            <Input
              type="password"
              name="password"
              description="Password"
              placeholder="Password"
              validationValue={/^(?=.*[A-Z])(?=.*\d).+$/}
              validationMessage="At least one big letter and one number"
            />
            <Error errorMsg={formState.errors.password?.message} />
            {dataError && <Error errorMsg="There is a problem with data" />}

            <Button buttonType="submitType">Registration</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
