"use client";
import React from "react";
import { Input } from "./ui/input";
import { formatCurrency } from "@/lib/utils";
import { Tab } from "@/app/tab/[slug]/page";
import { toast } from "sonner";

type props = {
	budgetLeft: number;
};
const NewItemForm = ({ budgetLeft }: props) => {
	const tabData = localStorage.getItem("tab");
	const tab: Tab = tabData
		? JSON.parse(tabData)
		: { name: "", budget: "", items: [] };
	console.log({ tab });

	const handleCostInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		input.value = formatCurrency(input.value);
	};
	const addNewItem = (event: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);
		const itemName = formData.get("itemName") as string;
		const cost = formData.get("cost") as string;
		const quantity = formData.get("quantity") as string;
		if (
			!(
				parseFloat(cost.replace(/₦/g, "").replace(/,/g, "")) *
					parseFloat(quantity) >
				budgetLeft
			)
		) {
			tab?.items.push({
				itemName,
				cost: cost.replace(/₦/g, "").replace(/,/g, ""),
				quantity,
			});
			localStorage.setItem("tab", JSON.stringify(tab));
			return;
		}
		event.preventDefault();
		console.log({ itemName, cost, quantity });
		toast("You don't have enough budget left");
		console.log("You don't have enough budget left");
	};
	return (
		<form
			onSubmit={addNewItem}
			className="flex flex-col gap-y-5 justify-center w-full"
		>
			<div className="flex gap-2 w-full">
				<div className="flex flex-col gap-2 w-full items-start">
					<label htmlFor="name">Name</label>
					<Input type="text" name="itemName" required placeholder="Item name" />
				</div>
			</div>
			<div className="flex gap-2 w-full">
				<div className="flex flex-col items-start gap-2 w-full">
					<label htmlFor="budget">Cost (₦)</label>
					<Input
						type="text"
						name="cost"
						required
						placeholder="Cost (₦)"
						onInput={handleCostInput}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-full">
					<label htmlFor="name">Quantity</label>
					<Input
						type="number"
						name="quantity"
						required
						placeholder="Quantity"
					/>
				</div>
			</div>
			<button
				type="submit"
				className="flex  w-fit bg-black text-white rounded-md p-2.5 items-center justify-center cursor-pointer"
			>
				Add to Tab
			</button>
		</form>
	);
};

export default NewItemForm;
