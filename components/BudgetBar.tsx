"use client";
import React, { useRef } from "react";
interface RetroBudgetBarProps {
	budget: number;
	value: number;
}
const BudgetBar = ({ budget, value }: RetroBudgetBarProps) => {
	const volume = (budget / budget) * 100;
	const barRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex w-full flex-col">
			<div className="w-full max-w-md space-y-4">
				{/* Pixelated "VOLUME" text */}

				{/* Pixelated border container */}
				<div
					className="relative border-2 border-black p-1 cursor-pointer"
					style={{ imageRendering: "pixelated" }}
					// onClick={handleBarClick}
					ref={barRef}
				>
					{/* Pixelated corners */}
					<div className="absolute -left-1 -top-1 h-2 w-2 bg-black"></div>
					<div className="absolute -right-1 -top-1 h-2 w-2 bg-black"></div>
					<div className="absolute -bottom-1 -left-1 h-2 w-2 bg-black"></div>
					<div className="absolute -bottom-1 -right-1 h-2 w-2 bg-black"></div>

					{/* Volume bar background */}
					<div className="h-6 w-full bg-white">
						{/* Volume bar fill */}
						<div
							className="h-full bg-black transition-all duration-100 ease-in-out"
							style={{ width: `${(value / budget) * 100}%` }}
						>
							{/* Pixelated pattern inside the bar */}
							<div className="flex h-full w-full flex-wrap">
								{Array.from({ length: 20 }).map((_, i) => (
									<div
										key={i}
										className="h-2 w-2 bg-white opacity-20"
										style={{
											display: i * 5 < volume ? "block" : "none",
										}}
									></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BudgetBar;
