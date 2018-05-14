import * as ActionTypes from './ActionTypes';
import { locale } from 'moment';

export const signIn = (obj) => {

    const apiUrl = `/loginCheck`;

    return {
        promise: fetch(apiUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('错误 ' + res);
            } else {
                return res.json().then((resJson) => {
                    console.log('当前用户：   ', resJson);
                    if (obj.remember) localStorage.setItem(`current_user`, JSON.stringify(obj));
                    return resJson;
                })
            }
        }),

        types: [ActionTypes.LOGIN_START, ActionTypes.LOGIN_SUCCESS, ActionTypes.LOGIN_FAIL]

    }
}


export const signOut = () => {

    return {
        type: ActionTypes.SIGN_OUT,
        res: { status: 200, msg: '退出成功' }
    }
}