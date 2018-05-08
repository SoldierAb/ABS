import * as ActionTypes from './ActionTypes'

export default (state = { loadingshow: false }, act) => {
    const { type, loadingshow } = act;
    switch (type) {
        case ActionTypes.LOADING_HIDE:
            return { ...state, [loadingshow]: state.loadingshow = false }
        case ActionTypes.LOADING_SHOW:
            return { ...state, [loadingshow]: state.loadingshow = true }
        default:
            return state;
    }
}