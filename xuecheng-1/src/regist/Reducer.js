import * as ActionTypes from './ActionTypes';
import * as Status from '../Status';

export default (state = { status: Status.LOADING }, action) => {
    const { type } = action;
    switch (type) {
        case ActionTypes.REGIST_START:
            return { status: Status.LOADING }
        case ActionTypes.REGIST_SUCCESS:
            return { ...state, status: Status.SUCCESS, ...action.res}
        case ActionTypes.REGIST_FAIL:
            return { status: Status.FAILURE, ...action.res, ...action.err }
        default:
            return state;
    }
}