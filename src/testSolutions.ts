import { readdir, readFile } from "node:fs/promises";
import { URL } from "node:url";
import { green, red } from "colorette";
import { mapDayToSolutions } from "./solutionMapping.js";

const solutions = (await readdir(new URL("solutions", import.meta.url)))
	.filter((file) => file.endsWith(".js"))
	.map((file) => file.split(".")[0]!);
let failed = 0;
let passed = 0;

console.log(`Running tests on ${solutions.length} solutions...\n`);

for (const solution of solutions) {
	const day = Number.parseInt(solution, 10);
	if (Number.isNaN(day)) {
		continue;
	}

	const { part1, part2 } = mapDayToSolutions(day);

	const input = await getInput(day);

	const part1Result = part1(input);
	const expectedPart1 = await getExpectedOutput(day, 1);

	checkResult(day, 1, part1Result, expectedPart1);

	const part2Result = part2(input);
	const expectedPart2 = await getExpectedOutput(day, 2);

	checkResult(day, 2, part2Result, expectedPart2);
}

console.log("\nPassed %d tests, failed %d tests", passed, failed);

async function getInput(day: number) {
	const input = await readFile(new URL(`../tests/${day}/input.txt`, import.meta.url), "utf8");
	return input.trimEnd();
}

async function getExpectedOutput(day: number, part: number) {
	const output = await readFile(new URL(`../tests/${day}/output_${part}.txt`, import.meta.url), "utf8");
	return output.trimEnd();
}

function checkResult(day: number, part: number, result: unknown, expected: unknown) {
	if (String(result) === String(expected)) {
		console.log(`${green("PASSED")} Day ${day} part ${part}`);
		passed++;
	} else {
		console.error(`${red("FAILED")} Day ${day} part ${part}`);
		failed++;
	}
}
