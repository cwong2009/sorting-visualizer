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
  COMPARE = "COMPARE",
  ASSIGN_VALUE = "ASSIGN_VALUE",
  OP = "OP",
}

export enum Status {
  ASSIGN_VALUE = "ASSIGN_VALUE",
  NORMAL = "NORMAL",
  HIGHLIGHT = "HIGHLIGHT",
  COMPARE = "COMPARE",
  SWAP = "SWAP",
}
