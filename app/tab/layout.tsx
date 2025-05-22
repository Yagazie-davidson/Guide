import ".././globals.css";
import { Toaster } from "@/components/ui/sonner";

import localFont from "next/font/local";

const dejavu = localFont({
	src: "../.././public/DejaVuSansMono.ttf",
});
// export const metadata: Metadata = {
// 	title: "Budget by Goat",
// 	description: "Never go over your budget again",
// 	manifest: "/manifest.json",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${dejavu.className} flex justify-center w-full`}>
				<Toaster className="bg-white text-black" />
				{children}
			</body>
		</html>
	);
}
