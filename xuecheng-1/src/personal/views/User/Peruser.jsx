import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import Upload from '../../../components/upload/Upload.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
    width:500px;    
    padding:20px;
`;

const FormItem = Form.Item;

class UserForm extends Component {
    state = {
        confirmDirty: false,
        tab: '1',
        imgpath: this.props.data.head
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.head = this.state.imgpath;
                values.type = this.state.tab;
                console.log('修改User的数据: ', values);
                this.props.modifyAct(values);
            }
        });
    }

    handleGetFile = (path) => {
        // console.log('获取到的img_path： ', path);
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
        const { data, imgpath } = this.props;

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
                                require: true, message: 'Please input you name'
                            }, {

                            }],
                            initialValue: data.name
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem
                        label="Head Image"
                    >
                        {getFieldDecorator('head', {
                            rules: [{ require: true, message: 'Please upload a image for your head' }],
                            initialValue: data.head
                        })(
                            <Upload getfile={this.handleGetFile} path={data.head} />
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
                    <FormItem >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                    </FormItem>
                    <FormItem >
                        <Button type="primary" htmlType="submit">Update</Button>
                    </FormItem>
                </Form>
            </Wrapper>
        );
    }
}


const UpdateUser = Form.create()(UserForm);


export default UpdateUser;
