import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

let stepCnt = 0;

export function shellSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  stepCnt = 0;
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: stepCnt++ }];

  sort(arr, steps);

  steps.push({
    step: stepCnt++,
    action: Action.OP,
    items: [],
  } as SortStep);

  action("INIT", {
    elements,
    history: steps,
    algorithm: "insertion_sort",
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}

function sort(arr: SortElement[], steps: SortStep[]) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      for (let j = i; j >= gap; j -= gap) {
        steps.push({
          step: stepCnt++,
          action: Action.COMPARE,
          items: [j - gap, j],
        } as SortStep);
        if (arr[j - gap].val > arr[j].val) {
          // swap
          [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]];
          steps.push({
            step: stepCnt++,
            action: Action.SWAP,
            items: [j - gap, j],
          } as SortStep);
        } else {
          break;
        }
      }
    }
  }
}
