"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "../store/provider";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import { SideBar } from "@/components/SideBar/SideBar";
import { TopNavigation } from "@/components/TopNavigation/TopNavigation";

export default function RootLayout({ children }: { children: ReactNode }) {
	const withoutLayout = ["/login", "/registration"];
	const pathname = usePathname();
	const hideLayout = withoutLayout.includes(pathname);

	return (
		<html lang="en">
			<body>
				<Providers>
					<div id="modalRoot ">
						{!hideLayout && (
							<>
								<SideBar />
								<TopNavigation />
							</>
						)}
						<div className={styles.contentContainer}>{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
