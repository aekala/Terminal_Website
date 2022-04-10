import HistoryItem from "../historyItem";
import HistoryEntry from "./HistoryEntry";

const History = (props: { history: Array<HistoryItem> }) => {
	const history = props.history;
	return (
		<>
			{history.map((item: HistoryItem, index: number) => (
				<div key={index}>
					<HistoryEntry item={item} />
				</div>
			))}
		</>
	);
};

export default History;
