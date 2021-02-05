import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

export function insertionSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: 0 }];
  let stepCnt = 1;

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let key = arr[i];
    while (j >= 0 && arr[j].val > key.val) {
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
