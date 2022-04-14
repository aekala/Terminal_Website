import { commandList } from "./commands";

export const help = () => {
	let helpOutput = `<p style="color: var(--color-text-valid);">Available commands:</p>`;
	commandList.forEach((cmnd) => {
		helpOutput += `<p>${cmnd}</p>`;
	});

	helpOutput += `<br>
  [tab] to auto-complete command<br>
  [ctrl+c] to cancel command<br>
  [ctrl+l] to clear terminal<br>
  <br>
  `;

	return helpOutput;
};
