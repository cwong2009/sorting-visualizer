import { stat } from "fs";
import {
  Action,
  SortDto,
  SortElement,
  SortStep,
  Status,
} from "../model/sortElement";

export default function element(state: SortDto = {} as any, action: any) {
  switch (action.type) {
    case "INIT":
      return { ...action.payload };
    case "ADD_STEP":
      const payload: SortStep = {
        ...action.payload,
        step: state.history.length + 1,
      };
      return { ...state, history: [...state.history, payload] };
    case "ADD_STEPS":
      return {
        ...state,
        history: action.payload.map((e: any, idx: number) => ({
          ...e,
          step: idx,
        })),
      };
    case "FORWARD_STEP":
      if (state.history.length > 0) {
        return applyNextStep(state, true);
      }
      return state;
    case "BACKWARD_STEP":
      if (state.history.length > 0) {
        return applyNextStep(state, false);
      }
      return state;
    case "CAL_SPEED":
      const prev = state.prev;
      const cur = state.cur;
      const speed = (cur - prev) * (1000 / action.interval || 1000);
      return { ...state, prev: cur, speed };
    default:
      return state;
  }
}

function applyNextStep(state: SortDto, isForward: boolean): SortDto {
  const elements = [...state.elements];

  const step = isForward ? state.cur : state.cur - 1;
  const nextStep = state.history[step];
  for (let element of elements) {
    element.status = Status.NORMAL;
  }
  if (nextStep.action === Action.LARGEST) {
    for (let i of nextStep.items) {
      elements[i].status = Status.LARGEST;
    }
  } else if (nextStep.action === Action.COMPARE) {
    for (let i of nextStep.items) {
      elements[i].status = Status.COMPARE;
    }
  } else if (nextStep.action === Action.ASSIGN_VALUE) {
    const [i, val, orgVal] = nextStep.items;
    elements[i].val = isForward ? val : orgVal;
    elements[i].status = Status.ASSIGN_VALUE;
  } else if (nextStep.action === Action.SWAP) {
    const [i, j] = nextStep.items;
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
    elements[i].status = Status.SWAP;
    elements[j].status = Status.SWAP;
  }

  return {
    ...state,
    elements,
    cur: state.cur + (isForward ? 1 : -1),
  };
}
