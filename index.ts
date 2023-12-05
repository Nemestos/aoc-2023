import path from "path";
import { AdventDay, readDay } from "./utils";
import * as fs from "fs";
import { DayResolver } from "./day.base";
import rawlist from "@inquirer/rawlist";

const createDayResolver = (
  DayClass: new (input: string, sep: string) => DayResolver,
  input: string,
  sep: string,
): DayResolver => {
  return new DayClass(input, sep);
};
const daysDirectory = path.join(__dirname, "days");

fs.readdir(daysDirectory, async (err, files) => {
  if (err) {
    console.error("Erreur de lecture du répertoire:", err);
    return;
  }
  const dayFiles = files.filter(
    (file) => file.startsWith("day") && file.endsWith(".ts"),
  );

  const answer = await rawlist({
    message: "Select a day",
    choices: dayFiles.map((dayFile, index) => {
      return { name: dayFile, value: index };
    }),
  });
  const dayFile = dayFiles[answer];
  const dayPath = path.join(daysDirectory, dayFile);
  const module = await import(dayPath);
  if (module && module.default) {
    const DayClass = module.default as new (
      input: string,
      sep: string,
    ) => DayResolver;
    const dayInput = readDay(dayFile.replace(".ts", "") as AdventDay);

    const resolver = createDayResolver(DayClass, dayInput, "\n");
    console.log(`Résolution pour ${dayFile}:`);
    const firstStar = await resolver.solveFirstStar();
    const secondStar = await resolver.solveSecondStar();
    console.log(firstStar);
    console.log(secondStar);
  }
});
