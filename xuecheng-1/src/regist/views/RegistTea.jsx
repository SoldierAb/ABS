import React, { Component } from 'react';
import { Form, Select, Input, Cascader, Checkbox, Button, Radio, Slider, InputNumber, Row, Col } from 'antd';
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

class RegistForm extends Component {
    state = {
        confirmDirty: false,
        tab: '5',
        imgpath: 'default_head.jpg',
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
                console.log('注册Tea的数据: ', values);
                this.props.registAct(values);
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
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} className="clearfix">
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input style={{ width: '100%' }} />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="登录密码"
                >
                    {getFieldDecorator('pwd', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名/昵称"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please input you name'
                        }]
                    })(
                        <Input type="text" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                    initialValue={1}
                >
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: 'Please check the sex' }]
                    })(
                        <RadioGroup >
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="头像"
                >
                    {getFieldDecorator('head', {
                        rules: [{ require: true, message: 'Please upload a image for your head' }]
                    })(
                        <Avatar getfile={this.handleGetFile} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="身份证号"
                >
                    {getFieldDecorator('iden', {
                        rules: [{ required: true, message: 'Please input your identify card' }]
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年龄"
                >
                    {getFieldDecorator('age', {
                        initialValue: { age: 20 },
                        rules: [{ required: true, message: 'Please input your age' }]
                    })(
                        <Age />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="就读院校"
                >
                    {getFieldDecorator('college', {
                        rules: [{ required: true, message: 'Please check the college' }]
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
                    {...formItemLayout}
                    label="期望时薪"
                >
                    {getFieldDecorator('price', {
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
                    {...formItemLayout}
                    label="授课支持"
                >
                    {getFieldDecorator('subject', {
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
                    {...formItemLayout}
                    label="现居住地址"
                >
                    {getFieldDecorator('address', {
                        initialValue: {},
                        rules: [{ required: true, message: 'Please input your address' }]
                    })(
                        <Address />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="授课时间"
                >
                    {getFieldDecorator('time', {
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
                    {...formItemLayout}
                    label="自我评价"
                >
                    {getFieldDecorator('evaluation', {

                    })(
                        <TextArea rows={6} placeholder="words<200" />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}


const RegistTea = Form.create()(RegistForm);


export default RegistTea;
