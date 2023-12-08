import { DayResolver } from "../day.base";

enum HandType {
  HIGH,
  ONE_PAIR,
  TWO_PAIR,
  THREE,
  FULL_HOUSE,
  FOUR,
  FIVE,
}

interface Hand {
  values: string[];
  type: HandType;
  bid: number;
}

export default class Day06 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }
  cardPatternsMatch: Record<string, HandType> = {
    "[5]": HandType.FIVE,
    "[1,4]": HandType.FOUR,
    "[2,3]": HandType.FULL_HOUSE,
    "[1,1,3]": HandType.THREE,
    "[1,2,2]": HandType.TWO_PAIR,
    "[1,1,1,2]": HandType.ONE_PAIR,
    "[1,1,1,1,1]": HandType.HIGH,
  };
  getSetType(values: string[]): HandType {
    const cardsRepartition = new Map<string, number>();
    values.forEach((value) => {
      cardsRepartition.set(value, (cardsRepartition.get(value) ?? 0) + 1);
    });
    const differentsCardsValues = JSON.stringify(
      [...cardsRepartition.values()].sort(),
    );
    return this.cardPatternsMatch[differentsCardsValues];
  }
  firstIsBetterThanSecond(first: Hand, second: Hand, rankedCards: string[]) {
    let i = 0;
    while (first.values[i] == second.values[i] && i < 5) {
      i += 1;
    }
    return (
      rankedCards.findIndex((v) => v === first.values[i]) >
      rankedCards.findIndex((v) => v === second.values[i])
    );
  }

  async solveFirstStar() {
    const input = this.getInput();
    const hands: Hand[] = input.map((line) => {
      const [set, bid] = line.split(" ");
      const values = set.split("");
      return {
        bid: +bid,
        values,
        type: this.getSetType(values),
      };
    });
    const rankedHands = hands.sort((prev, curr) => {
      if (prev.type == curr.type) {
        if (
          this.firstIsBetterThanSecond(prev, curr, [
            "A",
            "K",
            "Q",
            "J",
            "T",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2",
          ])
        ) {
          return -1;
        }
        return 1;
      }
      return prev.type - curr.type;
    });
    return rankedHands
      .map((hand, index) => hand.bid * (index + 1))
      .reduce((prev, curr) => prev + curr);
  }

  async solveSecondStar() {
    const input = this.getInput();
    const hands: Hand[] = input.map((line) => {
      const [set, bid] = line.split(" ");
      const values = set.split("");

      const possibleTypes: HandType[] = [this.getSetType(values)];
      values.forEach((value) => {
        const newCardValues = values.map((lastValue) => {
          if (lastValue === "J") {
            return value;
          }
          return lastValue;
        });
        const type = this.getSetType(newCardValues);
        possibleTypes.push(type);
      });

      return {
        bid: +bid,
        values,
        type: Math.max(...possibleTypes),
      };
    });
    const rankedHands = hands.sort((prev, curr) => {
      if (prev.type == curr.type) {
        if (
          this.firstIsBetterThanSecond(prev, curr, [
            "A",
            "K",
            "Q",
            "T",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2",
            "J",
          ])
        ) {
          return -1;
        }
        return 1;
      }
      return prev.type - curr.type;
    });
    return rankedHands
      .map((hand, index) => hand.bid * (index + 1))
      .reduce((prev, curr) => prev + curr);
  }
}
