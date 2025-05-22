"use client";
import { Tab } from "@/app/tab/[slug]/page";
import { formatCurrency } from "@/lib/utils";
import React from "react";

type Props = { tab: Tab; moneySpentSoFar: number; budgetLeft: number };

export default function ListItems({ tab, moneySpentSoFar, budgetLeft }: Props) {
	const removeItem = (id: string) => {
		const tabData = localStorage.getItem("tab");
		if (tabData) {
			const tab: Tab = JSON.parse(tabData);
			const updatedItems = tab.items.filter(item => item.id !== id);
			tab.items = updatedItems;
			localStorage.setItem("tab", JSON.stringify(tab));
		}
	};
	return (
		<ul className="w-full px-10 flex flex-col space-y-3">
			<li className="flex text-[14px] justify-between space-x-2 items-center mt-2">
				<p>Name:</p>

				<p>{tab.name}</p>
			</li>
			<li className="flex text-[14px] justify-between space-x-2 items-center -mt-2">
				<p>Budget:</p>

				<p>{formatCurrency(`${tab.budget}`)}</p>
			</li>
			<li className="flex text-[14px] justify-between space-x-2 items-center border-dashed border-y border-y-black py-1 my-2">
				<p>Date:</p>

				<p>{tab.date}</p>
			</li>
			<li className="flex text-[14px] justify-between space-x-2 items-center border-dashed border-b border-b-black py- my-">
				<p className="w-24">Name</p>
				<p>Qty</p>

				<p>Amt(NGN)</p>
				<p></p>
			</li>
			{tab.items.length > 0 ? (
				tab.items.map(item => (
					<li
						key={item.itemName}
						className="flex justify-between space-x-2 items-center text-[14px]"
					>
						<p className="w-24">{item.itemName}</p>
						<p>{item.quantity}</p>

						<p>
							{formatCurrency(
								`${parseFloat(item.cost) * parseFloat(item.quantity || "1")}`
							)}
						</p>
						<form onSubmit={() => removeItem(item.id)}>
							<button type="submit">x</button>
						</form>
					</li>
				))
			) : (
				<li className="flex justify-between items-center py-2">
					<p>No items added</p>
				</li>
			)}
			<li className="flex justify-between space-x-2 items-center border-dashed border-y border-y-black py-2 my-2">
				<p>Total Spent:</p>

				<p>{formatCurrency(`${moneySpentSoFar}`)}</p>
			</li>
			<li className="flex justify-between space-x-2 items-center border-dashed border-b border-b-black">
				<p>Total Left:</p>

				<p>{formatCurrency(`${budgetLeft}`)}</p>
			</li>
		</ul>
	);
}
