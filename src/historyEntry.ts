export default class HistoryEntry {
	entry: string;
	isHTML: boolean;

	constructor(entry: string, isHTML: boolean = false) {
		this.entry = entry;
		this.isHTML = isHTML;
	}
}
