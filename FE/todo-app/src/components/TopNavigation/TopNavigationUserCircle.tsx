import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "./TopNavigation.module.css";
import { useModal } from "@/hooks/useModal";
import { useMeQuery } from "@/store/api/authenticationApi";
import { useRouter } from "next/navigation";

export const UserCircle: FC = () => {
  const { isOpen, toggle } = useModal();

  const data = useMeQuery();
  const router = useRouter();

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
          <button className={styles.logoutButton} onClick={() => router.push("/login")}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};
