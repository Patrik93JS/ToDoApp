import { FC, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "./TopNavigation.module.css";
import { useModal } from "@/hooks/useModal";
import { useMeQuery } from "@/store/api/authenticationApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { tokenSlice } from "@/store/slices/tokenSlice";
import { appApi } from "@/store/api";

export const TopNavigationUserCircle: FC = () => {
  const { isOpen, toggle } = useModal();

  const data = useMeQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    dispatch(tokenSlice.actions.reset());
    dispatch(appApi.util.resetApiState());

    await router.push("/login");
  }, [dispatch, router]);

  return (
    <>
      <button onClick={toggle}>
        <FaUserCircle size="24" className={styles.topNavigationIconAccount} />
      </button>
      {isOpen && (
        <div className={styles.topNavigationAccountModal}>
          <div className="border-b mx-10">
            <div className={`${styles.username} flex justify-center px-4 pb-2`}>{data.data?.username}</div>
          </div>
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};
