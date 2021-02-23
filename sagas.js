import {all, put, takeEvery, call} from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
// 非同期処理を模した incerment task
export function* incrementAsync() {
  yield call(delay, 1000); // 多分このdelay(1000)を非同期処理(API通信とか)に模してるんだと思う。
  yield put({type: 'INCREMENT'});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// 'spawn'は俗語で「産み出す」という意味。ゲームとかでいう「スポーン」。
// INCREMENT_ASYNC のアクションが diapatch されるのを監視して、 dispatch されたら incrementAsync を実行する、という意味。
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
