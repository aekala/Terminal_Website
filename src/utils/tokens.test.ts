import { tokenize, endOfTokensList } from "./tokens";

// tokenize
test("Return array of empty string for empty input", () => {
	expect(tokenize("")).toStrictEqual([""]);
});

test("Return array of empty strings for whitespace input", () => {
	expect(tokenize(" ")).toStrictEqual(["", ""]);
});

test("Return correct tokens for single command", () => {
	expect(tokenize("about")).toStrictEqual(["about"]);
});

test("Return correct tokens for multi-string command", () => {
	expect(tokenize("theme dracula")).toStrictEqual(["theme", "dracula"]);
});

test("Return correct tokens for single command with leading whitespace", () => {
	expect(tokenize(" about")).toStrictEqual(["", "about"]);
});

test("Return correct tokens for single command with trailing whitespace", () => {
	expect(tokenize("about ")).toStrictEqual(["about", ""]);
});

// endOfTokensList
test("Return true if tokens list is empty", () => {
	expect(endOfTokensList([])).toBe(true);
});

test("Return true if tokens list just has empty string", () => {
	expect(endOfTokensList([""])).toBe(true);
});

test("Return true if tokens list just has empty string and whitespace", () => {
	expect(endOfTokensList(["", " "])).toBe(true);
});

test("Return false if tokens list contains tokens", () => {
	expect(endOfTokensList(["about"])).toBe(false);
});

test("Return false if tokens list contains tokens and empty string", () => {
	expect(endOfTokensList(["", "about"])).toBe(false);
});
