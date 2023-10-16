import React, { ComponentPropsWithoutRef, FC } from "react";
import { useFormContext } from "react-hook-form";
import { Description } from "./Description";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"textarea"> & {
  name: string;
  description?: string;
  validationValue?: RegExp;
  validationMessage?: string;
};

export const TextArea: FC<Props> = ({
  name,
  description,
  validationValue,
  validationMessage,
  ...rest
}) => {
  const { register } = useFormContext();
  const inputStyle = cn(
    "bg-black px-3 py-1 rounded-md text-green-500"
  );

  const pattern =
    validationValue && validationMessage
      ? { value: validationValue, message: validationMessage }
      : undefined;

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      {description && <Description>{description}</Description>}
      <textarea
        rows={4}
        cols={25}
        className={inputStyle}
        {...register(`${name}`, {
          pattern,
          required: `${name} is required`,
        })}
        {...rest}
      />
    </div>
  );
};
