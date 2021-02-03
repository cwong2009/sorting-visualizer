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
  algorithm: string;
  prev: number;
  speed: number;
  marks: any;
}

export enum Action {
  SWAP = "SWAP",
  HIGHLIGHT = "HIGHLIGHT",
  SPLIT = "SPLIT",
  MERGE = "MERGE",
  LARGEST = "LARGEST",
  COMPARE = "COMPARE",
  COMPELTE = "COMPELTE",
  ASSIGN_VALUE = "ASSIGN_VALUE",
  OP = "OP",
}

export enum Status {
  ASSIGN_VALUE = "ASSIGN_VALUE",
  NORMAL = "NORMAL",
  SELECTED = "SELECTED",
  SPLIT = "SPLIT",
  MERGE = "MERGE",
  LARGEST = "LARGEST",
  COMPARE = "COMPARE",
  COMPELTE = "COMPELTE",
}
