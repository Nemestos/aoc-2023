import { DayResolver } from "../day.base";

interface Card {
  id: number;
  winningNumbers: number[];
  playedNumbers: number[];
}

export default class Day03 extends DayResolver {
  constructor(input: string[]) {
    super(input);
  }

  private parseCards(lines: string[]): Card[] {
    return lines.map((line) => {
      const [cardId, numbers] = line.split(": ");
      const game: Card = {
        id: +cardId.replace("Card ", ""),
        winningNumbers: [],
        playedNumbers: [],
      };
      const [winningNumbers, playedNumbers] = numbers.split(" | ");
      game.winningNumbers = winningNumbers
        .split(" ")
        .map((number) => +number)
        .filter((number) => number > 0);
      game.playedNumbers = playedNumbers
        .split(" ")
        .map((number) => +number)
        .filter((number) => number > 0);

      return game;
    });
  }
  calculateCardPoints(card: Card) {
    const numberKeeped = card.playedNumbers.filter((number) =>
      card.winningNumbers.includes(number),
    );
    return numberKeeped.length > 0 ? 2 ** (numberKeeped.length - 1) : 0;
  }

  solveFirstStar() {
    const input = this.getInput();
    const cards = this.parseCards(input);
    return cards
      .map((card) => this.calculateCardPoints(card))
      .reduce((prev, curr) => prev + curr);
  }
  solveSecondStar(): number {
    const input = this.getInput();

    return 0;
  }
}
