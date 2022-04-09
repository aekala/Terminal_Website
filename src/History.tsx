import { useEffect, useState } from "react";
import Prompt from "./Prompt";

const History = (props: any) => {
	const historyElements = props.history.map((entry: string, index: number) => {
		if (entry.trim() === "") {
			return <p key={index}>&nbsp;</p>;
		}
		return <p key={index}>{entry}</p>;
	});

	return (
		<div className='flex'>
			<Prompt />
			<div className='text-3xl text-theme-base'>{historyElements}</div>
		</div>
	);
};

export default History;
