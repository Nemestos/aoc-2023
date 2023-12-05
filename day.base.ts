export abstract class DayResolver {
  private input: string[];
  private sep: string;
  constructor(input: string, sep: string = "\n") {
    this.sep = sep;
    this.input = input.split(sep);
  }

  abstract solveFirstStar(): number;
  abstract solveSecondStar(): number;

  getInput(): string[] {
    return this.input;
  }
}
