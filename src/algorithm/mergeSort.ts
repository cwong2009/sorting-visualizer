import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

let stepCnt = 0;

export function mergeSort(elements: SortElement[], action: any) {
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
    algorithm: "merge_sort",
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}

// function range(start: number, end: number) {
//   return Array(end - start + 1)
//     .fill(null)
//     .map((_, idx) => start + idx);
// }

function sort(arr: SortElement[], l: number, r: number, steps: SortStep[]) {
  if (l < r) {
    const m = Math.floor((l + r) / 2);

    sort(arr, l, m, steps);
    sort(arr, m + 1, r, steps);
    merge(arr, l, m, r, steps);
  }
}

function merge(
  arr: SortElement[],
  l: number,
  m: number,
  r: number,
  steps: SortStep[]
) {
  const n1 = m - l + 1;
  const n2 = r - m;
  const orgArr = Array(n1 + n2);
  const leftArr = Array(n1);
  const rightArr = Array(n2);

  let k = 0;
  while (k < n1 + n2) {
    orgArr[k] = arr[l + k];
    k++;
  }

  for (let i = 0; i < n1; i++) {
    leftArr[i] = arr[i + l];
  }
  for (let j = 0; j < n2; j++) {
    rightArr[j] = arr[j + m + 1];
  }

  let i = 0,
    j = 0;
  k = 0;
  while (i < n1 && j < n2) {
    if (leftArr[i].val < rightArr[j].val) {
      arr[l + k] = leftArr[i];
      i++;
    } else {
      arr[l + k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[l + k] = leftArr[i];
    k++;
    i++;
  }

  while (j < n2) {
    arr[l + k] = rightArr[j];
    k++;
    j++;
  }

  k = l;
  while (k <= r) {
    steps.push({
      step: stepCnt++,
      action: Action.ASSIGN_VALUE,
      items: [k, arr[k].val, orgArr[k - l].val],
    } as SortStep);
    k++;
  }
}
