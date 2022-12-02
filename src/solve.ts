import { argv, exit } from "node:process";
import { solve } from "./solutionMapping.js";

const day = Number.parseInt(argv[2]!, 10);
const part = Number.parseInt(argv[3]!, 10);
if (Number.isNaN(day) || Number.isNaN(part)) {
	console.error("Usage: yarn solve <day> <part>");
	exit(1);
}

console.log("Solutions to day %d part %d:", day, part);

await solve(day, part);
