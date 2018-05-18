import * as ActionTypes from './ActionTypes';
import * as Status from '../Status';

export default (state = { status: Status.LOADING }, action) => {
  switch (action.type) {
    case ActionTypes.GET_TEA_START:
      return { status: Status.LOADING };
    case ActionTypes.GET_TEA_SUCCESS:
      console.log('res-----------------------------');
      console.log({ ...action.res });
      console.log('res-----------------------------');
      return { ...state, status: Status.SUCCESS, ...action.res };
    case ActionTypes.GET_TEA_FAIL:
      return { ...state, status: Status.FAILURE, ...action.err, ...action.res };
    default:
      return state;
  }
}