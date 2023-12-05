import { DayResolver } from "../day.base";

interface Card {
  id: number;
  winningNumbers: number[];
  playedNumbers: number[];
}

export default class Day04 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
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
  getNumbersKeeped(card: Card) {
    return (
      card?.playedNumbers.filter((number) =>
        card.winningNumbers.includes(number),
      ) ?? []
    );
  }
  getCardsCopy(baseCards: Card[], processedCards: Card[]) {
    let cardsCopy: Card[] = [];
    processedCards.forEach((card) => {
      const numbersKeeped = this.getNumbersKeeped(card);
      if (numbersKeeped.length > 0) {
        const cardsToAdd = baseCards.slice(
          card.id,
          card.id + numbersKeeped.length,
        );
        cardsCopy = [...cardsCopy, ...cardsToAdd];
      }
    });
    return cardsCopy;
  }
  calculateCardPoints(card: Card) {
    const numberKeeped = this.getNumbersKeeped(card);
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
    const cards = this.parseCards(input);
    const cardsInstance = new Map<number, number>();
    cards.forEach((card) => {
      cardsInstance.set(card.id, 1);
    });
    cards.forEach((card) => {
      const numbersKeeped = this.getNumbersKeeped(card);
      for (let i = card.id + 1; i < card.id + numbersKeeped.length + 1; i++) {
        cardsInstance.set(
          i,
          cardsInstance.get(i)! + cardsInstance.get(card.id)!,
        );
      }
    });

    return [...cardsInstance.values()].reduce((prev, curr) => prev + curr);
  }
}
