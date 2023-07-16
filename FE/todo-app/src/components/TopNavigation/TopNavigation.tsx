import { ChangeEvent, FC } from "react";
import { BsPlus, BsCheckLg, BsCollection, BsFileEarmarkPlusFill } from "react-icons/bs";

import styles from "./TopNavigation.module.css";
import { TopNavigationSearch } from "./TopNavigationSearch";
import { TopNavigationTitle } from "./TopNavigationTitle";
import { TopNavigationIcon } from "./TopNavigationIcon";
import { TopNavigationUserCircle } from "./TopNavigationUserCircle";
import { CreateGroupForm } from "../createGroupForm/CreateGroupForm";
import { useModal } from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateToDoForm } from "../createToDoForm/CreateToDoForm";
import { setFilter, setSearchValue } from "@/store/slices/filterSlice";
import { setIdGroup } from "@/store/slices/idGroupToDo";

export const TopNavigation: FC = () => {
  const { isOpen, open, close } = useModal();
  const { isOpen: isToDoFormOpen, open: openToDoForm, close: closeToDoForm } = useModal();
  const dispatch = useAppDispatch();

  const { idGroup } = useAppSelector(({ idGroupToDo }) => idGroupToDo);

  const handleClickComplete = () => {
    dispatch(setFilter("complete"));
  };

  const handleClickAll = () => {
    dispatch(setFilter("all"));
    dispatch(setIdGroup(null));
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setFilter("search"));
    dispatch(setSearchValue(searchValue));
  };

  return (
    <div className={styles.topNavigation}>
      <TopNavigationTitle />
      <TopNavigationIcon icon={<BsPlus size="32" />} text="Add New Group" onClick={open} />
      {idGroup ? (
        <TopNavigationIcon icon={<BsFileEarmarkPlusFill size="28" />} text="Add New ToDo" onClick={openToDoForm} />
      ) : (
        <div className={styles.topNavigationIconDisabled}>
          <BsFileEarmarkPlusFill size="28" />
        </div>
      )}
      <TopNavigationIcon icon={<BsCheckLg size="28" />} text="Completed" onClick={handleClickComplete} />
      <TopNavigationIcon icon={<BsCollection size="28" />} text="All" onClick={handleClickAll} />
      <TopNavigationSearch onChange={handleChangeSearch} />
      <TopNavigationUserCircle />
      <CreateGroupForm open={isOpen} closeModal={close} />
      <CreateToDoForm open={isToDoFormOpen} closeModal={closeToDoForm} />
    </div>
  );
};
