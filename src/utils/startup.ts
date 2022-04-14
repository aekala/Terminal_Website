import HistoryItem from "../historyItem";
import { banner } from "./art";

export const startup = [
	new HistoryItem(""),
	new HistoryItem(banner, true, false),
	new HistoryItem("Welcome! 👋", true, false),
	new HistoryItem(
		"Type <span style='color: var(--color-border);'>'help'</span> to view a list of commands!<br><br>",
		true,
		false
	),
	new HistoryItem(
		"--<br>Inspired by <a href='https://github.com/m4tt72/terminal' target=_blank>m4tt72's terminal style website</a><br>--<br><br>",
		true,
		false
	),
];
