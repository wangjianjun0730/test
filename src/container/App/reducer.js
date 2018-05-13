import { combineReducers } from 'redux';
const REQUEST_APP_START = 'REQUEST_APP_START';
const REQUEST_APP_SUCCESS = 'REQUEST_APP_SUCCESS';
const REQUEST_APP_FAIL = 'REQUEST_APP_FAIL';
const maximum = (state = {fetch: false}, action) => {
  switch (action.type) {
    case REQUEST_APP_START:
      return Object.assign({}, state, {fetch: true})
    case REQUEST_APP_SUCCESS:
      return Object.assign({}, state, {
        fetch: false,
        error: undefined,
        data: action.data
      });
    case REQUEST_APP_FAIL:
      return Object.assign({}, state, {
        fetch: false,
        data: action.data,
        error: true
      });
    default:
      return state;
  }
};
export default combineReducers({maximum});