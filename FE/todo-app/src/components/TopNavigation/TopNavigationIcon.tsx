import { FC, ReactNode } from "react";
import styles from "./TopNavigation.module.css";

type Props = {
  icon: ReactNode;
  text?: string;
  onClick?: () => void;
};

export const TopNavigationIcon: FC<Props> = ({
  onClick,
  icon,
  text,
}) => (
  <button
    className={`${styles.topNavigationIconAction} group`}
    onClick={onClick}
  >
    {icon}
    <span
      className={`${styles.topNavigationTooltip} group-hover:scale-100`}
    >
      {text}
    </span>
  </button>
);
