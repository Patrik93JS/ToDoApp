"use client";
import { ToDo } from "../components/todo/ToDo";
import styles from "./page.module.css";
import { useFilteredToDos } from "../hooks/useFilterToDo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
	const { filteredTodos } = useFilteredToDos();
	const token = useAppSelector((state) => state.token);
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.push("/login");
		}
	}, [router, token]);

	return (
		<>
			<main>
				<div className={styles.toDoContainer}>
					{filteredTodos?.map((todo) => {
						return <ToDo todo={todo} key={todo.id} />;
					})}
				</div>
			</main>
		</>
	);
}
