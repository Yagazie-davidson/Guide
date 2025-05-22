"use client";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
	const router = useRouter();

	const handleBudgetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		input.value = formatCurrency(input.value);
	};

	const createTab = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const budget = formData.get("budget") as string;
		localStorage.setItem(
			"tab",
			JSON.stringify({
				name,
				budget: budget.replace(/₦/g, "").replace(/,/g, ""),
				items: [],
				date: new Date().toISOString(),
			})
		);

		console.log({ name, budget });
		router.push(`/tab/${encodeURIComponent(name)}`);
	};

	return (
		<div className="border border-red-500 flex flex-col max-w-[500px] justify-center items-center h-screen w-full">
			<div>
				<Dialog>
					<DialogTrigger>
						<button className="flex bg-white text-black rounded-md p-2.5 items-center justify-center cursor-pointer">
							<span>New Tab</span>
							<Plus size={15} />
						</button>
					</DialogTrigger>
					<DialogContent className="bg-black">
						<DialogHeader>
							<DialogTitle>Create a new tab</DialogTitle>
							<DialogDescription>
								<form
									onSubmit={createTab}
									className="flex flex-col gap-y-5 justify-center w-full"
								>
									<div className="flex gap-2 w-full">
										<div className="flex flex-col gap-2 w-full">
											<label htmlFor="name">Name</label>
											<Input
												type="text"
												name="name"
												required
												placeholder="Tab name"
											/>
										</div>
										<div className="flex flex-col gap-2 w-full">
											<label htmlFor="budget">Budget (₦)</label>
											<Input
												type="text"
												name="budget"
												required
												placeholder="Budget (₦)"
												onInput={handleBudgetInput}
											/>
										</div>
									</div>
									<button
										type="submit"
										className="flex  w-fit bg-white text-black rounded-md p-2.5 items-center justify-center cursor-pointer"
									>
										Create
									</button>
								</form>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
