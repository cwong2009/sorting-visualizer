import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

let stepCnt = 0;

export function quickSort(elements: SortElement[], action: any) {
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
    algorithm: "quick_sort",
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}

function sort(
  arr: SortElement[],
  low: number,
  high: number,
  steps: SortStep[]
) {
  if (low < high) {
    const pivot = partitionRandom(arr, low, high, steps);
    steps.push({
      step: stepCnt++,
      action: Action.HIGHLIGHT,
      items: [low, pivot, high],
    } as SortStep);
    sort(arr, low, pivot - 1, steps);
    sort(arr, pivot + 1, high, steps);
  }
}

function partitionRandom(
  arr: SortElement[],
  low: number,
  high: number,
  steps: SortStep[]
): number {
  const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
  steps.push({
    step: stepCnt++,
    action: Action.SWAP,
    items: [pivotIndex, high],
  } as SortStep);

  return partition(arr, low, high, steps);
}

function partition(
  arr: SortElement[],
  low: number,
  high: number,
  steps: SortStep[]
): number {
  const p = arr[high].val;
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    steps.push({
      step: stepCnt++,
      action: Action.COMPARE,
      items: [j, high],
    } as SortStep);
    if (arr[j].val < p) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push({
        step: stepCnt++,
        action: Action.SWAP,
        items: [i, j],
      } as SortStep);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  steps.push({
    step: stepCnt++,
    action: Action.SWAP,
    items: [i + 1, high],
  } as SortStep);

  return i + 1;
}
