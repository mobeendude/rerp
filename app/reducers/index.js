import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import following from './follow';
import todos from '../Todo/TodoReducer';
const rootReducer = combineReducers({
  counter,
  todos,
  routing,
  following
});

export default rootReducer;
