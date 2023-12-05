export abstract class DayResolver {
  private input: string[];
  private sep: string;
  constructor(input: string, sep: string = "\n") {
    this.sep = sep;
    this.input = input.split(sep);
  }

  abstract solveFirstStar(): Promise<number>;
  abstract solveSecondStar(): Promise<number>;

  getInput(): string[] {
    return this.input;
  }
}
