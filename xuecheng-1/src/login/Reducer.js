import * as Status from './Status';
import * as ActionTypes from './ActionTypes';

export default (state = { status: Status.LOADING }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_START:
            return { status: Status.LOADING };
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, status: Status.SUCCESS, ...action.res };
        case ActionTypes.LOGIN_FAIL:
            return { status: Status.FAILURE, ...action.err,...action.res };
        case ActionTypes.SIGN_OUT:
            return { status: Status.LOADING}    
        default: {
            return state;
        }
    }
}   
