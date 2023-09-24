import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  BsPlus,
  BsCheckLg,
  BsCollection,
  BsFileEarmarkPlusFill,
} from "react-icons/bs";

import styles from "./TopNavigation.module.css";
import { TopNavigationSearch } from "./TopNavigationSearch";
import { TopNavigationTitle } from "./TopNavigationTitle";
import { TopNavigationIcon } from "./TopNavigationIcon";
import { TopNavigationUserCircle } from "./TopNavigationUserCircle";
import { CreateGroupForm } from "../createGroupForm/CreateGroupForm";
import { useModal } from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateToDoForm } from "../createToDoForm/CreateToDoForm";
import {
  setFilter,
  setSearchValue,
} from "@/store/slices/filterSlice";
import { setIdGroup } from "@/store/slices/idGroupToDo";

export const TopNavigation: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { isOpen, open, close } = useModal();
  const {
    isOpen: isToDoFormOpen,
    open: openToDoForm,
    close: closeToDoForm,
  } = useModal();
  const dispatch = useAppDispatch();

  const { idGroup } = useAppSelector(
    ({ idGroupToDo }) => idGroupToDo
  );

  const handleClickComplete = () => {
    dispatch(setFilter("complete"));
  };

  const handleClickAll = () => {
    dispatch(setIdGroup(null));
    dispatch(setFilter("all"));
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setFilter("search"));
    dispatch(setIdGroup(null));
    dispatch(setSearchValue(searchValue));
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaQueryChange
      );
    };
  });

  return (
    <div className={styles.topNavigation}>
      {!isMobile && <TopNavigationTitle />}
      <TopNavigationIcon
        icon={<BsPlus size="32" />}
        text="Add New Group"
        onClick={open}
      />
      {idGroup ? (
        <TopNavigationIcon
          icon={<BsFileEarmarkPlusFill size="28" />}
          text="Add New ToDo"
          onClick={openToDoForm}
        />
      ) : (
        <div className={styles.topNavigationIconDisabled}>
          <BsFileEarmarkPlusFill size="28" />
        </div>
      )}
      {idGroup ? (
        <TopNavigationIcon
          icon={<BsCheckLg size="28" />}
          text="Completed"
          onClick={handleClickComplete}
        />
      ) : (
        <div className={styles.topNavigationIconDisabled}>
          <BsCheckLg size="28" />
        </div>
      )}
      <TopNavigationIcon
        icon={<BsCollection size="28" />}
        text="All"
        onClick={handleClickAll}
      />
      <TopNavigationSearch onChange={handleChangeSearch} />
      <TopNavigationUserCircle />
      {isOpen && <CreateGroupForm closeModal={close} />}
      {isToDoFormOpen && (
        <CreateToDoForm closeModal={closeToDoForm} />
      )}
    </div>
  );
};
