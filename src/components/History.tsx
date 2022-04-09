import { useEffect, useState } from "react";
import Prompt from "./Prompt";

const History = (props: any) => {
	return (
		<>
			{props.history.map((entry: string, index: number) => (
				<div key={index}>
					<Prompt />
					<span
						className='text-3xl text-theme-base'
						dangerouslySetInnerHTML={{ __html: entry }}
					/>
				</div>
			))}
		</>
	);
};

export default History;
