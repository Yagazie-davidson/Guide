"use client";
import { useParams } from "next/navigation";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import NewItemForm from "@/components/NewItemForm";
import ListItems from "@/components/ListItems";
import { Plus } from "lucide-react";
import BudgetBar from "@/components/BudgetBar";
import Link from "next/link";
export type Tab = {
	name: string;
	budget: string;
	items: Array<{
		itemName: string;
		cost: string;
		quantity?: string;
	}>;
	date: string;
};
const Page = () => {
	const params = useParams<{ slug: string }>();
	const tabData = localStorage.getItem("tab");
	const tab: Tab = tabData
		? JSON.parse(tabData)
		: { name: "", budget: "", items: [] };
	console.log({ tab });
	const moneySpentSoFar = tab.items.reduce((acc, item) => {
		return acc + parseFloat(item.cost) * parseFloat(item.quantity || "1");
	}, 0);
	const budgetLeft = parseFloat(tab.budget) - moneySpentSoFar;
	console.log({ moneySpentSoFar, budgetLeft });
	return (
		<div className="pb-16 pt-12 bg-[url(/white-crumpled.jpg)] bg-cover bg-center flex flex-col max-w-[400px] justify- items-center h-screen w-full">
			{/* <h2 className="font-normal text-4xl"> {formatCurrency(tab.budget)}</h2> */}
			<div className="flex items-center justify-start w-full px-7 pb-10">
				<Link href={"/"} className="text-[14px] text-left underline">
					Back
				</Link>
			</div>

			<p className="text-[14px]">{params.slug.replace(/%20/g, " ")}</p>
			<div className="w-full px-7">
				<BudgetBar budget={parseFloat(tab.budget)} value={budgetLeft} />
			</div>

			<Dialog>
				<DialogTrigger>
					<button className="flex  text-black rounded-md p-2.5 items-center justify-center cursor-pointer">
						<Plus size={15} />
					</button>
				</DialogTrigger>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle>Add item to the tab</DialogTitle>
						<DialogDescription>
							<NewItemForm budgetLeft={budgetLeft} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<ListItems
				tab={tab}
				moneySpentSoFar={moneySpentSoFar}
				budgetLeft={budgetLeft}
			/>
		</div>
	);
};

export default Page;
