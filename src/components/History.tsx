import Prompt from "./Prompt";
import HistoryItem from "../historyItem";
import HistoryEntry from "./HistoryEntry";

const History = (props: { history: Array<HistoryItem> }) => {
	const historyOutput = props.history.map((history: HistoryItem) => {
		//TODO: move this logic to HistoryEntry
		if (history.isHTML) {
			return history.entry;
		}
		return history.entry.replace(/\s/g, "&nbsp;");
	});
	return (
		<>
			{historyOutput.map((entry: string, index: number) => (
				<div key={index}>
					<HistoryEntry output={entry} item={props.history[index]} />
				</div>
			))}
		</>
	);
};

export default History;
