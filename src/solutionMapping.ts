import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { solveDay1Part1, solveDay1Part2 } from "./solutions/1.js";
import { solveDay2Part1, solveDay2Part2 } from "./solutions/2.js";

export async function solve(day: number, part: number) {
	const { part1, part2 } = mapDayToSolutions(day);

	const input = (await readFile(new URL(`../tests/${day}/input.txt`, import.meta.url), "utf8")).trimEnd();

	switch (part) {
		case 1:
			console.log(part1(input));
			break;
		case 2:
			console.log(part2(input));
			break;
	}
}

export function mapDayToSolutions(day: number) {
	switch (day) {
		case 1:
			return { part1: solveDay1Part1, part2: solveDay1Part2 };

		case 2:
			return { part1: solveDay2Part1, part2: solveDay2Part2 };

		default:
			throw new Error("Day not implemented");
	}
}
