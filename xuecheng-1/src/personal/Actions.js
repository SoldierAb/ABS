import * as ActionTypes from './ActionTypes';
import * as UserTypes from '../UserTypes';
import { message } from 'antd';


export const modifyAct = (obj) => {
    
    const api = `/modify`;

    return {
        promise: fetch(api, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('出错啦： ' + res);
            }

            return res.json().then((resJson) => resJson)
        }),   
    
        types: [ActionTypes.MODIFY_START, ActionTypes.MODIFY_SUCCESS, ActionTypes.MODIFY_FAIL]
    }

}

