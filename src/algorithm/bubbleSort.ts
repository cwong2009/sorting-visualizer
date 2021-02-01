import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

export function bubbleSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  let isSwap = true;
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: 0 }];
  let stepCnt = 1;
  while (isSwap) {
    isSwap = false;
    for (let i = 0; i < arr.length - 1; i++) {
      steps.push({
        step: stepCnt++,
        action: Action.HIGHLIGHT,
        items: [i, i + 1],
      } as SortStep);
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
        isSwap = true;
      }
    }
  }
  steps.push({
    step: stepCnt++,
    action: Action.SWAP,
    items: [],
  } as SortStep);

  action("INIT", {
    elements,
    history: steps,
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}
