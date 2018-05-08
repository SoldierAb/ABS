import React from 'react';
import {Select} from 'antd';
const Option = Select.Option;

const subjects = ['周一上午','周一下午','周一晚上','周二上午','周二下午','周二晚上','周三上午','周三下午','周三晚上','周四上午','周四下午','周四晚上','周五上午','周五下午','周五晚上','周六上午','周六下午','周六晚上','周日上午','周日下午','周日晚上'];

let arr=[]; 
subjects.forEach((item,index)=>{
    arr.push(<Option key={item+index} value={item}>{item}</Option>)
})

export default arr;