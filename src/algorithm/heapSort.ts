import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

export function heapSort(elements: SortElement[], action: any) {
  const arr = [...elements];

  let steps: SortStep[] = [{ action: Action.OP, items: [], step: 0 }];
  let stepCnt = 1;

  for (let k = arr.length / 2 - 1; k >= 0; k--) {
    heapify(arr, arr.length, k, steps);
  }

  let marks = {
    [steps.length]: "Heapify",
  };

  sort(arr, arr.length, steps);

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
    marks,
  } as SortDto);
}

function heapify(arr: SortElement[], n: number, i: number, steps: SortStep[]) {
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  let largest = i;
  if (l < n) {
    steps.push({
      step: steps.length,
      action: Action.HIGHLIGHT,
      items: [l, largest],
    } as SortStep);
    if (arr[l].val > arr[largest].val) {
      steps.push({
        step: steps.length,
        action: Action.COMPARE,
        items: [l, largest],
      } as SortStep);
      largest = l;
      steps.push({
        step: steps.length,
        action: Action.LARGEST,
        items: [largest],
      } as SortStep);
    }
  }
  if (r < n) {
    steps.push({
      step: steps.length,
      action: Action.HIGHLIGHT,
      items: [r, largest],
    } as SortStep);
    if (arr[r].val > arr[largest].val) {
      steps.push({
        step: steps.length,
        action: Action.COMPARE,
        items: [r, largest],
      } as SortStep);
      largest = r;
      steps.push({
        step: steps.length,
        action: Action.LARGEST,
        items: [largest],
      } as SortStep);
    }
  }

  if (largest !== i) {
    //swap
    steps.push({
      step: steps.length,
      action: Action.COMPARE,
      items: [i, largest],
    } as SortStep);
    steps.push({
      step: steps.length,
      action: Action.SWAP,
      items: [i, largest],
    } as SortStep);
    [arr[largest], arr[i]] = [arr[i], arr[largest]];
    heapify(arr, n, largest, steps);
  }
}

function sort(arr: SortElement[], n: number, steps: SortStep[]) {
  for (let i = n - 1; i >= 0; i--) {
    //swap
    steps.push({
      step: steps.length,
      action: Action.COMPARE,
      items: [i, 0],
    } as SortStep);
    steps.push({
      step: steps.length,
      action: Action.SWAP,
      items: [i, 0],
    } as SortStep);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      step: steps.length,
      action: Action.COMPELTE,
      items: [i],
    } as SortStep);
    heapify(arr, i, 0, steps);
  }
}
