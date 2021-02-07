import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

let stepCnt = 0;

export function insertionSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  stepCnt = 0;
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: stepCnt++ }];

  sort(arr, 0, arr.length - 1, steps);

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

function sort(arr: SortElement[], l: number, r: number, steps: SortStep[]) {
  for (let i = l + 1; i <= r; i++) {
    let j = i - 1;
    let key = arr[i];
    while (j >= l && arr[j].val > key.val) {
      steps.push({
        step: stepCnt++,
        action: Action.COMPARE,
        items: [i, j],
      } as SortStep);
      steps.push({
        step: stepCnt++,
        action: Action.ASSIGN_VALUE,
        items: [j + 1, arr[j].val, arr[j + 1].val],
      } as SortStep);
      arr[j + 1] = arr[j];
      j--;
    }
    steps.push({
      step: stepCnt++,
      action: Action.ASSIGN_VALUE,
      items: [j + 1, key.val, arr[j + 1].val],
    } as SortStep);
    arr[j + 1] = key;
  }
}
