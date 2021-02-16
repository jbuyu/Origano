import { createStore, applyMiddleware } from "redux";
import { defaultState } from "../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import * as sagas from "./sagas.mock";

const sagaMiddleware = createSagaMiddleWare();
export const store = createStore(function reducer(
  state = defaultState,
  action
) {
  return state;
},
applyMiddleware(createLogger(), sagaMiddleware));

for (let saga in sagas) {
  sagaMiddleware.run();
}
