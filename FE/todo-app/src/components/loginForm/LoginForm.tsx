"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authenticationApi";
import { Input } from "../formComponents/Input";
import { Error } from "../formComponents/Error";
import { Button } from "../formComponents/Button";
import { Redirect } from "../formComponents/Redirect";
import { InfoBox } from "../formComponents/InfoBox";

export type LoginFormType = {
  identifier: string;
  password: string;
};

export const LoginForm = () => {
  const [dataError, setDataError] = useState(false);
  const methods = useForm<LoginFormType>({
    defaultValues: { identifier: "", password: "" },
  });

  const router = useRouter();
  const [login, { isError }] = useLoginMutation();

  const onSubmit = async (data: LoginFormType) => {
    const [loginData] = await Promise.all([login(data).unwrap(), router.prefetch("/")]);
    if (loginData) {
      setDataError(false);
      router.push("/");
    } else {
      setDataError(true);
    }
  };

  const { handleSubmit, formState } = methods;

  return (
    <div className={styles.loginFormContainer}>
      <div className="bg-gray-800 w-1/4 ">
        <div className="flex justify-end w-100 p-3"></div>
        <div className="border-b  mx-10">
          <div className="flex justify-center px-4 py-2">Log to ToDo app</div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" placeholder="Username" name="identifier" description="Username" />
            <Error errorMsg={formState.errors.identifier?.message} />

            <Input type="password" placeholder="Password" name="password" description="Password" />
            <Error errorMsg={formState.errors.password?.message} />

            <Button buttonType="submitType">Login</Button>
            {isError && <Error errorMsg="wrong username or password" />}
            {dataError && <Error errorMsg="There is a problem with data" />}

            <InfoBox>Not account yet? Let&lsquo;s create one</InfoBox>
          </form>
        </FormProvider>

        <Redirect href="/registration">Registration</Redirect>
      </div>
    </div>
  );
};
