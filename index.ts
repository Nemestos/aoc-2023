import path from "path";
import { AdventDay, readDay } from "./utils";
import * as fs from "fs";
import { DayResolver } from "./day.base";

const createDayResolver = (
  DayClass: new (input: string[]) => DayResolver,
  input: string[],
): DayResolver => {
  return new DayClass(input);
};
const daysDirectory = path.join(__dirname, "days");

fs.readdir(daysDirectory, (err, files) => {
  if (err) {
    console.error("Erreur de lecture du répertoire:", err);
    return;
  }
  const dayFiles = files.filter(
    (file) => file.startsWith("day") && file.endsWith(".ts"),
  );
  dayFiles.forEach((dayFile) => {
    const dayPath = path.join(daysDirectory, dayFile);
    import(dayPath)
      .then((module) => {
        if (module && module.default) {
          const DayClass = module.default as new (
            input: string[],
          ) => DayResolver;
          const dayInput = readDay(dayFile.replace(".ts", "") as AdventDay);

          const resolver = createDayResolver(DayClass, dayInput);
          console.log(`Résolution pour ${dayFile}:`);
          const firstStar = resolver.solveFirstStar();
          const secondStar = resolver.solveSecondStar();
          console.log(firstStar);
          console.log(secondStar);
        }
      })
      .catch((err) => {
        console.error(
          `Erreur lors de l'importation du fichier ${dayFile}:`,
          err,
        );
      });
  });
});
