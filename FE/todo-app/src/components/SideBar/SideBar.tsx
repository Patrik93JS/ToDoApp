import React, { FC } from "react";

import { cn } from "@/lib/utils";
import styles from "./SideBar.module.css";
import { useMeQuery } from "@/store/api/authenticationApi";
import { SideBarGroup } from "@/components/SideBar/SideBarGroup";

export const SideBar: FC = () => {
	const { data: meData } = useMeQuery();
	const container = cn(styles.container);

	return (
		<div className={container}>
			{meData?.to_do_groups.map((group, index) => {
				return (
					<SideBarGroup
						title={group.title}
						key={`${group.id} + ${index}`}
						idGroup={group.id}
					/>
				);
			})}
		</div>
	);
};
