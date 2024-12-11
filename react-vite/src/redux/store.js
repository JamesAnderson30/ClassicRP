import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import postReducer from "./post";
import categoryReducer from "./category";
import topicReducer from "./topic";
import profileReducer from "./topic_profile";
import documentReducer from "./document";

const rootReducer = combineReducers({
  session: sessionReducer,
  post: postReducer,
  category: categoryReducer,
  topic: topicReducer,
  profile: profileReducer,
  document: documentReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
