import { SortStep, Action, SortDto, SortElement } from "../model/sortElement";

let stepCnt = 0;
const RUN = 32;

export function timSort(elements: SortElement[], action: any) {
  const arr = [...elements];
  const n = arr.length;
  stepCnt = 0;
  let steps: SortStep[] = [{ action: Action.OP, items: [], step: stepCnt++ }];

  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1), steps);
  }

  // for (let m = RUN - 1; m < n; m += RUN) {
  //   merge(arr, 0, m, Math.min(n - 1, m + RUN), steps);
  // }

  for (let size = RUN; size < n; size = 2 * size) {
    for (let l = 0; l < n; l += 2 * size) {
      const m = l + size - 1;
      const r = Math.min(n - 1, l + 2 * size - 1);
      if (m < r) {
        merge(arr, l, m, r, steps);
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
    algorithm: "merge_sort",
    cur: 0,
    prev: 0,
    speed: 0,
  } as SortDto);
}

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

function insertionSort(
  arr: SortElement[],
  l: number,
  r: number,
  steps: SortStep[]
) {
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

function merge(
  arr: SortElement[],
  l: number,
  m: number,
  r: number,
  steps: SortStep[]
) {
  steps.push({
    step: stepCnt++,
    action: Action.HIGHLIGHT,
    items: range(l, r),
  } as SortStep);

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
