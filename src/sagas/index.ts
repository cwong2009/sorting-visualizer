import {
  put,
  call,
  takeEvery,
  delay,
  select,
  all,
  fork,
  cancel,
  cancelled,
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

let playTask: any;
let timerTask: any;

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
  try {
    let cur = yield select((state: SortDto) => state.cur);
    let len = yield select((state: SortDto) => state.history.length);

    timerTask = yield fork(callSelfOnTimer);

    while (cur < len) {
      yield fork(forwardStep);
      yield delay(0);
      cur = yield select((state: SortDto) => state.cur);
    }

    // yield call(pausePlay);
  } finally {
    if (yield cancelled()) {
      console.log("playHistory is cancelled");
    }
  }
}

export function* playHistoryCall() {
  if (!playTask) {
    playTask = yield fork(playHistory);
  }
}

export function* playHistoryToCall(action: any) {
  yield call(pausePlay);
  let cur = yield select((state: SortDto) => state.cur);
  let numSteps = action.payload - cur;
  if (numSteps !== 0) {
    const isForward = numSteps >= 0;
    numSteps = Math.abs(numSteps);
    if (isForward) {
      numSteps++;
    }
    while (numSteps > 0) {
      yield call(isForward ? forwardStep : backwardStep);
      numSteps--;
    }

    yield delay(0);
  }
}

function* pausePlay() {
  if (timerTask && !timerTask.isCancelled()) {
    yield cancel(timerTask);
    timerTask = null;
  }
  if (playTask && !playTask.isCancelled()) {
    yield cancel(playTask);
    playTask = null;
  }
}

export default function* rootSaga() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
  yield takeEvery("PLAY_HISTORY", playHistoryCall);
  yield takeEvery("PLAY_HISTORY_TO", playHistoryToCall);
  yield takeEvery("PAUSE_HISTORY", pausePlay);
}
