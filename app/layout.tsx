import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

// export const metadata: Metadata = {
// 	title: "Budget by Goat",
// 	description: "Never go over your budget again",
// };
export const metadata: Metadata = {
	title: "Goat",
	description: "Goat",
	manifest: "/manifest.json",
	themeColor: "#000000",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Next.js PWA",
		startupImage: ["/apple-splash-1125-2436.png"],
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
		userScalable: false,
	},
	other: {
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "default",
		"apple-touch-icon": "/apple-icon-180.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} antialiased flex justify-center w-full`}
			>
				{/* <div className="border border-red-500 flex  flex-col max-w-[500px] w-full"> */}
				<Toaster className="bg-white text-black" />
				{children}
				{/* </div> */}
			</body>
		</html>
	);
}
