import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

export function bubbleSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  let isSwapped = true;
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: 0 }];
  let stepCnt = 1;
  while (isSwapped) {
    isSwapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].val > arr[i + 1].val) {
        steps.push({
          step: stepCnt++,
          action: Action.COMPARE,
          items: [i, i + 1],
        } as SortStep);
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        steps.push({
          step: stepCnt++,
          action: Action.SWAP,
          items: [i, i + 1],
        } as SortStep);
        isSwapped = true;
      }
    }
  }

  steps.push({
    step: stepCnt++,
    action: Action.OP,
    items: [],
  } as SortStep);

  action("INIT", {
    elements,
    history: steps,
    algorithm: "bubble_sort",
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}
