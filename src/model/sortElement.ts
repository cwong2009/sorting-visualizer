export interface SortElement {
  key: string;
  val: number;
  status: Status;
}

export interface SortStep {
  step: number;
  action: Action;
  items: number[];
}

export interface SortDto {
  elements: SortElement[];
  history: SortStep[];
  cur: number;
  last: number;
  prev: number;
  speed: number;
  marks: any;
}

export enum Action {
  SWAP = "SWAP",
  HIGHLIGHT = "HIGHLIGHT",
  LARGEST = "LARGEST",
  COMPARE = "COMPARE",
  COMPELTE = "COMPELTE",
  OP = "OP",
}

export enum Status {
  NORMAL = "NORMAL",
  SELECTED = "SELECTED",
  LARGEST = "LARGEST",
  SWAP = "SWAP",
  COMPELTE = "COMPELTE",
}
