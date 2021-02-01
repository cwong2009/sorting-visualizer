import {
  put,
  call,
  takeEvery,
  delay,
  select,
  all,
  fork,
  cancel,
} from "redux-saga/effects";
import { SortDto, SortElement } from "../model/sortElement";

export function* incrementAsync() {
  //yield delay(1000);
  yield put({ type: "INCREMENT" });
}

// export function* initElements(elements: SortElement[]) {
//   //yield delay(1000);
//   yield put({ type: "INIT", payload: elements });
// }

function* callSelfOnTimer(): any {
  yield delay(1000);
  yield put({ type: "CAL_SPEED" });
  yield call(callSelfOnTimer);
}

function* forwardStep() {
  yield put({ type: "FORWARD_STEP" });
}

function* backwardStep() {
  yield put({ type: "BACKWARD_STEP" });
}

export function* playHistory() {
  let cur = yield select((state: SortDto) => state.cur);
  let len = yield select((state: SortDto) => state.history.length);

  const timerTask = yield fork(callSelfOnTimer);

  while (cur < len) {
    yield fork(forwardStep);
    yield delay(0);
    cur = yield select((state: SortDto) => state.cur);
  }

  yield cancel(timerTask);
}

export function* playHistoryCall() {
  playTask = yield fork(playHistory);
}

export function* playHistoryToCall(action: any) {
  let cur = yield select((state: SortDto) => state.cur);
  console.log(cur, action.payload);
  let numSteps = action.payload - cur;
  if (numSteps !== 0) {
    const isForward = numSteps >= 0;
    numSteps = Math.abs(numSteps);
    if (isForward) {
      numSteps++;
    }
    //console.log(isForward, numSteps);

    while (numSteps > 0) {
      yield call(isForward ? forwardStep : backwardStep);
      numSteps--;
    }

    yield delay(0);
  }
}

function* pausePlay() {
  yield cancel(playTask);
}

let playTask: any;

export default function* rootSaga() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
  yield takeEvery("PLAY_HISTORY", playHistoryCall);
  yield takeEvery("PLAY_HISTORY_TO", playHistoryToCall);
  yield takeEvery("PAUSE_HISTORY", pausePlay);

  // yield takeEvery("*", function* logger(action) {
  //   const state = yield select();

  //   console.log("action", action);
  //   console.log("state after", state.history.length);
  // });
}
