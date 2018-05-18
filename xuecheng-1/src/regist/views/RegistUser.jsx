import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import Avatar from '../../components/upload/Upload.jsx';
import * as UserTypes from '../../UserTypes';
const FormItem = Form.Item;


class RegistForm extends Component {
    state = {
        confirmDirty: false,
        tab: '1',
        imgpath: 'default_head.jpg'
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.head = this.state.imgpath;
                values.type = this.state.tab;
                values.state = UserTypes.UNACTIVE;
                console.log('注册User的数据: ', values);
                this.props.registAct(values);
            }
        });
    }

    handleGetFile = (path) => {
        this.setState({
            imgpath: path
        })
    }


    /**
     * 
     * 
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
                    label="登陆密码"
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
                            require: true, message: 'Please input you name'
                        }, {

                        }]
                    })(
                        <Input type="text" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="头像"
                    initialValue={this.state.imgpath}
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


const RegistUser = Form.create()(RegistForm);


export default RegistUser;
