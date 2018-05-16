import * as ActionTypes from './ActionTypes';

export const addOrder = (obj) => {
    const api = `/orderadd`;

    return {
        promise: fetch(api, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.status !== 200) throw new Error('出错' + res)
            return res.json().then((resJson) => resJson)
        }),

        types: [ActionTypes.ADD_START, ActionTypes.ADD_SUCCESS, ActionTypes.ADD_FAIL]
    }
}

export const getOrders = (currentPage, pageSize) => {
    const api = `/getOrders?currentPage=${currentPage}&&pageSize=${pageSize}`;
    return {
        promise: fetch(api).then((res) => {
            if (res.status !== 200) throw new Error('订单数据请求获取出错', res);
            return res.json().then(resJson => resJson);
        }),
        types: [ActionTypes.GET_START, ActionTypes.GET_SUCCESS, ActionTypes.GET_FAIL]
    }
}
