import * as ActionTypes from './ActionTypes';
import * as Status from '../Status';

export default (state = { status: Status.LOADING }, action) => {
  switch (action.type) {
    case ActionTypes.GET_START:
      return { status: Status.LOADING };
    case ActionTypes.GET_SUCCESS:
      return { ...state, status: Status.SUCCESS, ...action.res };
    case ActionTypes.GET_FAIL:
      return { ...state, status: Status.FAILURE, ...action.err, ...action.res };
    default:
      return state;
  }
}