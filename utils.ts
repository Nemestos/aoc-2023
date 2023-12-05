import * as fs from "fs";

export type AdventDay =
  | "day01"
  | "day02"
  | "day03"
  | "day04"
  | "day05"
  | "day06"
  | "day07"
  | "day08"
  | "day09"
  | "day10"
  | "day11"
  | "day12"
  | "day13"
  | "day14"
  | "day15"
  | "day16"
  | "day17"
  | "day18"
  | "day19"
  | "day20"
  | "day21"
  | "day22"
  | "day23"
  | "day24"
  | "day25";

export const readDay = (day: AdventDay) => {
  return fs.readFileSync(`./inputs/${day}.txt`, "utf-8");
};
