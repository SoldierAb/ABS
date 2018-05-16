import React, { Component } from 'react';
import { Form, Select, Input, Cascader, Checkbox, Button, Radio, Slider, InputNumber, Row, Col } from 'antd';
import styled from 'styled-components';
import Avatar from '../../../components/upload/Upload.jsx';
import Age from '../../../components/age/Age.jsx';
import Address from '../../../components/address/Address.jsx';
import univerSitys from '../../../initdata/university';
import prices from '../../../initdata/price';
import subjectOptions from '../../../initdata/subject';
import timeOptions from '../../../initdata/time';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { TextArea } = Input;

const Wrapper = styled.div`
    width:500px;    
    padding:20px;
`;

class TeaForm extends Component {
    state = {
        confirmDirty: false,
        tab: '5',
        imgpath: this.props.data.head,
        age: 20,
        time: undefined
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.head = this.state.imgpath;
                values.type = this.state.tab;
                values.age = values.age.age;
                values.address = JSON.stringify(values.address);
                values.time = JSON.stringify(values.time);
                values.subject = JSON.stringify(values.subject);
                console.log('modify Teacher: ', values);
                this.props.modifyAct(values);
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
        const { data } = this.props;
        const { age, time } = this.state;

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
                            <Input disabled style={{ width: '100%' }} />
                            )}
                    </FormItem>

                    <FormItem
                        label="Password"
                    >
                        {getFieldDecorator('pwd', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                            initialValue: data.pwd
                        })(
                            <Input type="password" />
                            )}
                    </FormItem>
                    <FormItem
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.checkPassword,
                            }],
                            initialValue: data.pwd
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Name"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input you name'
                            }],
                            initialValue: data.name
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem
                        label="Sex"
                        initialValue={1}
                    >
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: 'Please check the sex' }],
                            initialValue: data.sex
                        })(
                            <RadioGroup >
                                <Radio value={1}>Male</Radio>
                                <Radio value={2}>Female</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>

                    <FormItem
                        label="Head Image"
                    >
                        {getFieldDecorator('head', {
                            rules: [{ require: true, message: 'Please upload a image for your head' }],
                            initialValue: data.head
                        })(
                            <Avatar getfile={this.handleGetFile} path={data.head} />
                            )}
                    </FormItem>
                    <FormItem
                        label="Identity Card"
                    >
                        {getFieldDecorator('iden', {
                            rules: [{ required: true, message: 'Please input your identify card' }],
                            initialValue: data.iden
                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                    <FormItem
                        label="Age"
                    >
                        {getFieldDecorator('age', {
                            initialValue: { age: data.age },
                            rules: [{ required: true, message: 'Please input your age' }]
                        })(
                            <Age />
                            )}
                    </FormItem>
                    <FormItem
                        label="College"
                    >
                        {getFieldDecorator('college', {
                            rules: [{ required: true, message: 'Please check the college' }],
                            initialValue: data.college
                        })(
                            <Select>
                                {
                                    univerSitys.map((item, index) =>
                                        <SelectOption key={item + index} value={item}>{item}</SelectOption>
                                    )
                                }
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        label="Price Per Hour"
                    >
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Please check the price' }],
                            initialValue: data.price
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
                        label="Subject Support"
                    >
                        {getFieldDecorator('subject', {
                            rules: [{ required: true, message: 'Please check the subject' }],
                            initialValue: JSON.parse(data.subject)
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
                        label="Address"
                    >
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your address' }],
                            initialValue: JSON.parse(data.address)
                        })(
                            <Address />
                            )}
                    </FormItem>
                    <FormItem
                        label="Time"
                    >
                        {getFieldDecorator('time', {
                            rules: [{ required: true, message: 'Please check your time' }],
                            initialValue: JSON.parse(data.time)
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
                        label="Evaluation"
                    >
                        {getFieldDecorator('evaluation', {
                            initialValue: data.evaluation
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
                    <FormItem>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </FormItem>
                </Form>
            </Wrapper>
        );
    }
}


const UpdateTeaForm = Form.create()(TeaForm);


export default UpdateTeaForm;
