import HistoryItem from "../historyItem";
import Prompt from "./Prompt";

const HistoryEntry = (props: { item: HistoryItem }) => {
	let item = props.item;

	if (!item.isHTML) {
		item.entry = item.entry.replace(/\s/g, "&nbsp;");
	}

	return (
		<>
			{props.item.attachPrompt ? <Prompt /> : null}
			<span
				className='text-md tablet:text-xl laptop:text-2xl text-theme-base'
				dangerouslySetInnerHTML={{ __html: item.entry }}
			/>
		</>
	);
};

export default HistoryEntry;
