import React, {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";

export const Description: FC<
  PropsWithChildren<ComponentPropsWithoutRef<"p">>
> = ({ children, ...rest }) => {
  const descriptionStyle = cn("pb-2");
  return (
    <p className={descriptionStyle} {...rest}>
      {children}
    </p>
  );
};
