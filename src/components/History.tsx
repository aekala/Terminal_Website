import Prompt from "./Prompt";
import HistoryEntry from "../historyEntry";

const History = (props: any) => {
	const historyOutput = props.history.map((history: HistoryEntry) => {
		if (history.isHTML) {
			return history.entry;
		}
		return history.entry.replace(/\s/g, "&nbsp;");
	});
	return (
		<>
			{historyOutput.map((entry: string, index: number) => (
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
