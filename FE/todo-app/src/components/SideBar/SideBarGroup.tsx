import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { createPortal } from "react-dom";
import { setFilter } from "@/store/slices/filterSlice";
import { setIdGroup } from "@/store/slices/idGroupToDo";
import styles from "./SideBar.module.css";
import { useModal } from "@/hooks/useModal";
import { DeleteGroupModal } from "@/components/SideBar/DeleteGroupModal";
import { useBodyRef } from "@/hooks/useBodyRef";

type Props = {
  title: string | null;
  idGroup: number;
};

export const SideBarGroup: FC<Props> = ({ title, idGroup }) => {
  const dispatch = useAppDispatch();
  const titleLetter = title?.charAt(0).toUpperCase();
  const selectedGroupId = useAppSelector(
    ({ idGroupToDo }) => idGroupToDo.idGroup
  );
  const { isOpen, open, close } = useModal();
  const bodyRef = useBodyRef();

  const handleClick = () => {
    dispatch(setIdGroup(idGroup));
    dispatch(setFilter(""));
  };

  const isSelected = selectedGroupId === idGroup;

  return !isOpen ? (
    <div>
      <button
        className={`${
          isSelected ? styles.groupSelected : styles.sidebar
        } group `}
        onClick={handleClick}
      >
        {titleLetter}
        {!isSelected ? (
          <span
            className={`${styles.sidebarTooltip}  group-hover:scale-100 `}
          >
            {title}
          </span>
        ) : (
          <span
            className={`${styles.sidebarTooltipSelected}  group-hover:scale-100`}
          >
            {title}
          </span>
        )}
      </button>
      {isSelected && (
        <button
          className="absolute right-1  duration-900"
          onClick={open}
        >
          <MdDelete size={24} color="red" />
        </button>
      )}
    </div>
  ) : (
    bodyRef &&
      createPortal(
        <DeleteGroupModal close={close} title={title} />,
        bodyRef
      )
  );
};
