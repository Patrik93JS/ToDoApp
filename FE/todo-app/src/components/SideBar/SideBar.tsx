import React, { FC } from "react";

import { SideBarGroup } from "@/components/SideBar/SideBarGroup";
import { cn } from "@/lib/utils";
import styles from "./SideBar.module.css";
import { useGetGroupsQuery } from "@/store/api/groupToDoApi";
import { useMeQuery } from "@/store/api/authenticationApi";

export const SideBar: FC = () => {
	const { data: meData } = useMeQuery();
	const { data } = useGetGroupsQuery(
		{
			userId: parseInt(meData?.id as string),
		},
		{ skip: !meData }
	);
	const container = cn(styles.container);

	return (
		<div className={container}>
			{data?.data.map((group, index) => {
				return (
					<SideBarGroup
						title={group.attributes.title}
						key={`${group.id} + ${index}`}
						idGroup={group.id}
					/>
				);
			})}
		</div>
	);
};
