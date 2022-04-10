export default class HistoryItem {
	entry: string;
	isHTML: boolean;
	attachPrompt: boolean;

	constructor(
		entry: string,
		isHTML: boolean = false,
		attachPrompt: boolean = true
	) {
		this.entry = entry;
		this.isHTML = isHTML;
		this.attachPrompt = attachPrompt;
	}
}
