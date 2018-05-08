import * as ActionTypes from './ActionTypes';

const apiUrl = '/regist';

export const regist = (obj) => {
    return {
        promise: fetch(apiUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Error: ' + res);
            }

            return res.json().then((resJson) => {
                return resJson;
            })
        }),
        types: [ActionTypes.REGIST_START, ActionTypes.REGIST_SUCCESS, ActionTypes.REGIST_FAIL]
    }
}