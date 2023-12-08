import { DayResolver } from "../day.base";

interface NodeParts {
  left: string;
  right: string;
}
export default class Day07 extends DayResolver {
  constructor(input: string) {
    super(input, "\n");
  }
  parseNodesMap(lines: string[]) {
    const nodeMap = new Map<string, NodeParts>();
    lines.forEach((element) => {
      const cleanElement = element.replace("(", "").replace(")", "");
      const [value, attachedNodes] = cleanElement.split(" = ");

      const attachedParsedNodes = attachedNodes.split(", ");
      nodeMap.set(value, {
        left: attachedParsedNodes[0],
        right: attachedParsedNodes[1],
      });
    });
    return nodeMap;
  }
  findStartingNodes(nodesMap: Map<string, NodeParts>) {
    const nodesValues = [...nodesMap.keys()];
    return nodesValues.filter((value) => value[value.length - 1] === "A");
  }
  validateCurrentNodes(nodesValues: string[]) {
    return nodesValues.every((value) => value[value.length - 1] === "Z");
  }

  async solveFirstStar() {
    const input = this.getInput();
    const instructions = input[0].split("");
    const nodesMap = this.parseNodesMap(input.slice(2));
    let currentNode: string = "AAA";
    let steps = 0;
    while (currentNode != "ZZZ") {
      const currentInstruction = instructions[steps % instructions.length];
      if (currentInstruction === "L") {
        currentNode = nodesMap.get(currentNode)!.left;
      } else {
        currentNode = nodesMap.get(currentNode)!.right;
      }
      steps += 1;
    }
    return steps;
  }

  async solveSecondStar() {
    const input = this.getInput();
    const instructions = input[0].split("");
    const nodesMap = this.parseNodesMap(input.splice(2));
    let currentNodes: string[] = this.findStartingNodes(nodesMap);
    let steps = 0;
    while (!this.validateCurrentNodes(currentNodes)) {
      const currentInstruction = instructions[steps % instructions.length];
      currentNodes = currentNodes.map((value) => {
        if (currentInstruction === "L") {
          return nodesMap.get(value)!.left;
        }
        return nodesMap.get(value)!.right;
      });
      steps += 1;
    }
    return steps;
  }
}
