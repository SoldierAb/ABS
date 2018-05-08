import * as ActionTypes from './ActionTypes';
import * as Status from '../Status';

export default (state = { status: Status.LOADING }, action) => {
    switch (action.type) {
        case ActionTypes.MODIFY_START:
            return { status: Status.LOADING };
        case ActionTypes.MODIFY_SUCCESS:
            return { ...state, status: Status.SUCCESS, ...action.res };
        case ActionTypes.MODIFY_FAIL:
            return { status: Status.FAILURE, ...action.err, ...action.res };
        default:
            return state;
    }
}   
