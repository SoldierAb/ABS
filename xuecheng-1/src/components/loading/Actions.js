import * as ActionTypes from './ActionTypes';

export const loading_show = ()=>({
    type:ActionTypes.LOADING_SHOW,
    loadingshow:true
})

export const loading_hide =()=>({
    type:ActionTypes.LOADING_HIDE,
    loadingshow:false
})