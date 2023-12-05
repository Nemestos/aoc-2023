import { DayResolver } from "../day.base";
interface Colors {
  red: number;
  green: number;
  blue: number;
}
interface Game {
  id: number;
  colorsSets: Colors[];
}

export default class Day02 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }

  private checkCorrect(colors: Colors) {
    return colors.red <= 12 && colors.green <= 13 && colors.blue <= 14;
  }
  private parseGames(lines: string[]): Game[] {
    return lines.map((line) => {
      const [gameId, boxes] = line.split(": ");
      const game: Game = {
        id: +gameId.replace("Game ", ""),
        colorsSets: [],
      };

      const splittedBoxes = boxes.split("; ");
      splittedBoxes.forEach((box) => {
        const colors = box.split(", ");
        const colorsSet: Colors = { red: 0, green: 0, blue: 0 };
        colors.forEach((color) => {
          const [value, name] = color.split(" ");
          switch (name) {
            case "red":
              colorsSet.red += +value;
              break;
            case "green":
              colorsSet.green += +value;
              break;
            case "blue":
              colorsSet.blue += +value;
              break;
          }
        });
        game.colorsSets.push(colorsSet);
      });
      return game;
    });
  }

  solveFirstStar() {
    const input = this.getInput();
    const parsedGames: Game[] = this.parseGames(input);
    const correctGames = parsedGames.filter((game) =>
      game.colorsSets.every((colorsSet) => this.checkCorrect(colorsSet)),
    );
    return correctGames
      .map((game) => game.id)
      .reduce((prev, curr) => prev + curr);
  }
  solveSecondStar(): number {
    const input = this.getInput();
    const parsedGames: Game[] = this.parseGames(input);

    const gamesPowers = parsedGames.map((game) => {
      const mandatoryColors: Colors = {
        red: 0,
        green: 0,
        blue: 0,
      };
      game.colorsSets.forEach((colorsSet) => {
        mandatoryColors.red = Math.max(mandatoryColors.red, colorsSet.red);
        mandatoryColors.green = Math.max(
          mandatoryColors.green,
          colorsSet.green,
        );
        mandatoryColors.blue = Math.max(mandatoryColors.blue, colorsSet.blue);
      });
      return mandatoryColors.red * mandatoryColors.green * mandatoryColors.blue;
    });
    return gamesPowers.reduce((prev, curr) => prev + curr);
  }
}
