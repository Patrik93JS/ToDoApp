import { FC } from "react";
import styles from "./SideBar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIdGroup } from "@/store/slices/idGroupToDo";
import { setFilter } from "@/store/slices/filterSlice";
import { MdDelete } from "react-icons/md";
import { useModal } from "@/hooks/useModal";
import { createPortal } from "react-dom";
import { DeleteGroupModal } from "./DeleteGroupModal";

type Props = {
  title: string | null;
  idGroup: number;
};

export const SideBarGroup: FC<Props> = ({ title, idGroup }) => {
  const dispatch = useAppDispatch();
  const titleLetter = title?.charAt(0).toUpperCase();
  const selectedGroupId = useAppSelector(({ idGroupToDo }) => idGroupToDo.idGroup);
  const { isOpen, open, close } = useModal();

  const handleClick = () => {
    dispatch(setIdGroup(idGroup));
    dispatch(setFilter(""));
  };

  const isSelected = selectedGroupId === idGroup;

  return !isOpen ? (
    <div className="relative">
      <button className={`${isSelected ? styles.groupSelected : styles.sidebar} group`} onClick={handleClick}>
        {titleLetter}
        {!isSelected ? (
          <span className={`${styles.sidebarTooltip}  group-hover:scale-100`}>{title}</span>
        ) : (
          <span className={`${styles.sidebarTooltipSelected}  group-hover:scale-100`}>{title}</span>
        )}
      </button>
      {isSelected && (
        <button className="absolute top-1/3 transform -translate-y-1/3 right-1 pt-2 duration-900" onClick={open}>
          <MdDelete size={24} color="red" />
        </button>
      )}
    </div>
  ) : (
    createPortal(<DeleteGroupModal close={close} title={title} />, document.body)
  );
};
