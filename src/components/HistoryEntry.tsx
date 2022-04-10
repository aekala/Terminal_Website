import HistoryItem from "../historyItem";
import Prompt from "./Prompt";

const HistoryEntry = (props: { output: string; item: HistoryItem }) => {
	return (
		<>
			{props.item.attachPrompt ? <Prompt /> : null}
			<span
				className='text-3xl text-theme-base'
				dangerouslySetInnerHTML={{ __html: props.output }}
			/>
		</>
	);
};

export default HistoryEntry;
