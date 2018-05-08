import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;

const subjects = ['数学','英语','高数','前端'];

let arr=[]; 
subjects.forEach((item,index)=>{
    arr.push(<Option key={item+index} value={item}>{item}</Option>)
})

export default arr;