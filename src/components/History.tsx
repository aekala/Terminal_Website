import { useEffect, useState } from "react";
import Prompt from "./Prompt";

const History = (props: any) => {
	const historyElements = props.history.map((entry: string, index: number) => {
		return (
			<span className='text-3xl text-theme-base' key={index}>
				{entry}
			</span>
		);
	});

	return (
		// <div className='flex'>
		<>
			{historyElements.map((entry: string, index: number) => (
				<div>
					<Prompt />
					{entry}
				</div>
			))}
		</>
		// </div>
	);
};

export default History;
