import { FC } from "react";
import { BsPlus, BsCheckLg, BsCollection, BsFileEarmarkPlusFill } from "react-icons/bs";

import styles from "./TopNavigation.module.css";
import { Search } from "./TopNavigationSearch";
import { Title } from "./TopNavigationTitle";
import { TopNavigationIcon } from "./TopNavigationIcon";
import { UserCircle } from "./TopNavigationUserCircle";
import { CreateGroupInput } from "../createGroupForm/CreateGroupInput";
import { useModal } from "@/hooks/useModal";

export const TopNavigation: FC = () => {
  const { isOpen, open, close } = useModal();

  return (
    <div className={styles.topNavigation}>
      <Title />
      <TopNavigationIcon icon={<BsFileEarmarkPlusFill size="28" />} text="Add New ToDo" onClick={open} />
      <TopNavigationIcon icon={<BsPlus size="32" />} text="Add New Group" onClick={open} />
      <TopNavigationIcon icon={<BsCheckLg size="28" />} text="Completed" />
      <TopNavigationIcon icon={<BsCollection size="28" />} text="All" />
      <Search />
      <UserCircle />

      <CreateGroupInput open={isOpen} closeModal={close} />
    </div>
  );
};
