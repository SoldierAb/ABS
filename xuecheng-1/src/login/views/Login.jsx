import React from 'react';
import * as Actions from '../Actions';
import { connect } from 'react-redux';
import * as LoginStatusTypes from '../Status';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Wrapper = styled.div`
    position:fixed;
    background:url('http://127.0.0.1:3099/bg.jpg') no-repeat;
    background-attachment: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    .loginBox{
       z-index:100;
       position:fixed;
       top:40%;
       right:50px;
       border:1px solid rgba(0,0,0,0.3);
       border-radius:10px;
       padding:20px 30px;
       background:rgba(0,0,0,0.3);
       color:rgba(255,255,255,0.8);
    }
`;

const colorWhite = {
    color: 'rgba(255,255,255,0.8)'
}

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('表单数据 ', values);
                _this.props.clickSignIn(values);
            }
        });
    }

    handleRegist(ev) {
        ev.preventDefault();
        this.props.history.push('/course');
    }

    componentDidUpdate() {
        if (this.props.loginStatus === LoginStatusTypes.FAILURE) {
            console.log('失败');
        }
        if (this.props.loginStatus === LoginStatusTypes.SUCCESS) {
            this.props.history.push('/');
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const isLogin = this.props.loginStatus === LoginStatusTypes.SUCCESS ? true : false;
        const { currentUser } = this.props;
        if (isLogin) {
            return <div>亲爱的~{currentUser.phone},你好@.@,点击菜单栏访问更多内容哦</div>;
        }
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit} className="loginBox">
                    <FormItem>
                        {getFieldDecorator('userphone', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('userpwd', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('usertype', {
                            rules: [{ required: true, message: '请选择账户类型!' }]
                        })(
                            <RadioGroup>
                                <Radio style={colorWhite} value={1}>用户</Radio>
                                <Radio style={colorWhite} value={5}>教员</Radio>
                                <Radio style={colorWhite} value={2}>管理员</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={colorWhite}>记住密码</Checkbox>
                            )}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </FormItem>
                </Form>
            </Wrapper>
        );
    }
}

const Login = Form.create()(NormalLoginForm);

const mapDispatch = (dispatch) => {
    return {
        clickSignIn: (obj) => {
            dispatch(Actions.signIn(obj))
        }
    }
}

const mapState = (state) => {
    return {
        loginStatus: state.login.status,
        currentUser: state.login.data,
        msg: state.login.msg
    }
}

export default connect(mapState, mapDispatch)(Login);