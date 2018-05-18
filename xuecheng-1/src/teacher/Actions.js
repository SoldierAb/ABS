import * as ActionTypes from './ActionTypes';

export const getTeachers = (currentPage, pageSize, city) => {
  const api = `/getTeachers?city=${city}&&currentPage=${currentPage}&&pageSize=${pageSize}`;
  return {
    promise: fetch(api).then((res) => {
      console.log('teas res_____', res);
      if (res.status !== 200) throw new Error('出错' + res);
      return res.json().then((resJson) => {
        console.log('教师： ', resJson);
        return resJson;
      })
    }).catch((err) => {
      throw new Error('Err' + err);
    }),

    types: [ActionTypes.GET_TEA_START, ActionTypes.GET_TEA_SUCCESS, ActionTypes.GET_TEA_FAIL]
  }
}