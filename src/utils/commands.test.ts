import { isValidCommand, autoCompleteCommand } from "./commands";

// isValidCommand
test("Return true for valid command", () => {
	expect(isValidCommand("about")).toBe(true);
});

test("Return true for valid command with trailing whitespace", () => {
	expect(isValidCommand("about ")).toBe(true);
});

test("Return true for valid command", () => {
	expect(isValidCommand("about")).toBe(true);
});

test("Return false for invalid command", () => {
	expect(isValidCommand("abouts")).toBe(false);
});

test("Return false for valid command with leading whitespace", () => {
	expect(isValidCommand(" about")).toBe(false);
});

// autoCompleteCommand
const setCommandMock = jest.fn(() => null);

test("Return full command for valid command prefix", () => {
	expect(autoCompleteCommand("a", setCommandMock)).toBe("about");
});

test("Return first alphabetical command for valid command prefix with multiple options", () => {
	expect(autoCompleteCommand("d", setCommandMock)).toBe("date");
});

test("Return full command for full valid command input", () => {
	expect(autoCompleteCommand("about", setCommandMock)).toBe("about");
});

test("Return null for empty input", () => {
	expect(autoCompleteCommand("", setCommandMock)).toBe(null);
});

test("Return null for whitespace input", () => {
	expect(autoCompleteCommand(" ", setCommandMock)).toBe(null);
});

test("Return null for full valid command input with leading whitespace", () => {
	expect(autoCompleteCommand(" about", setCommandMock)).toBe(null);
});

test("Return null for full valid command input with trailing whitespace", () => {
	expect(autoCompleteCommand("about ", setCommandMock)).toBe(null);
});
