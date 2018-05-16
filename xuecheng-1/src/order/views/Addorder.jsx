import React, { Component } from 'react';
import { Form, Select, Input, Cascader, Checkbox, Button, Radio, Slider, InputNumber, Row, Col } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Actions from '../Actions';
import Avatar from '../../components/upload/Upload.jsx';
import Age from '../../components/age/Age.jsx';
import Address from '../../components/address/Address.jsx';
import univerSitys from '../../initdata/university';
import prices from '../../initdata/price';
import subjectOptions from '../../initdata/subject';
import timeOptions from '../../initdata/time';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { TextArea } = Input;

const Wrapper = styled.div`
    width:500px;    
    padding:20px;
`;

const mapDispatch = (dispatch) => {
    return {
        addOrder: (obj) => { dispatch(Actions.addOrder(obj)) }
    }
}


class OrderForm extends Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.order_address = JSON.stringify(values.order_address);
                values.order_time = JSON.stringify(values.order_time);
                values.order_subject = JSON.stringify(values.order_subject);
                values.order_no = JSON.stringify(new Date().getTime());
                values.order_state = 1;          //未处理
                console.log('order add : ', values);
                this.props.addOrder(values);
            }
        });
    }

    handleAge = (age) => {
        this.setState({ age });
    }

    handleGetFile = (path) => {
        // console.log('获取到的img_path： ', path);
        this.setState({
            imgpath: path
        })
    }
    /**
     * @param {any} e 
     */
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    /**
     * 两次输入密码校验
     * 
     * @param {any} rule 
     * @param {any} value 
     * @param {any} callback 
     */
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('pwd')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    /**
     * 
     * 是否同意规则
     * @param {any} rule 
     * @param {any} value 
     * @param {any} callback 
     */
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { age, time } = this.state;
        const { data } = this.props;
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit} className="clearfix">
                    <FormItem
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                            initialValue: data.phone
                        })(
                            <Input style={{ width: '100%' }} />
                            )}
                    </FormItem>

                    <FormItem
                        label="Price Per Hour"
                    >
                        {getFieldDecorator('order_price', {
                            rules: [{ required: true, message: 'Please check the price' }]
                        })(
                            <Select>
                                {
                                    prices.map((item, index) =>
                                        <SelectOption key={item + index} value={item}>{item}</SelectOption>
                                    )
                                }
                            </Select>
                            )}
                    </FormItem>

                    <FormItem
                        label="Address"
                    >
                        {getFieldDecorator('order_address', {
                            initialValue: {},
                            rules: [{ required: true, message: 'Please input your address' }]
                        })(
                            <Address />
                            )}
                    </FormItem>

                    <FormItem
                        label="Need Sex"
                        initialValue={1}
                    >
                        {getFieldDecorator('order_need_sex', {
                            rules: [{ required: true, message: 'Please check the sex' }]
                        })(
                            <RadioGroup >
                                <Radio value={1}>Male</Radio>
                                <Radio value={2}>Female</Radio>
                                <Radio value={3}>No-Limit</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>


                    <FormItem
                        label="Order Subject"
                    >
                        {getFieldDecorator('order_subject', {
                            rules: [{ required: true, message: 'Please check the subject' }]
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                            >
                                {subjectOptions}
                            </Select>
                            )}
                    </FormItem>

                    <FormItem
                        label="Order Time"
                    >
                        {getFieldDecorator('order_time', {
                            rules: [{ required: true, message: 'Please check your time' }]
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                            >
                                {timeOptions}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        label="Order Detail"
                    >
                        {getFieldDecorator('order_detail', {

                        })(
                            <TextArea rows={6} placeholder="words<200" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" htmlType="submit">Add</Button>
                    </FormItem>
                </Form>
            </Wrapper>
        );
    }
}


const AddOrderForm = Form.create()(OrderForm);


export default connect(null, mapDispatch)(AddOrderForm);
