import React from 'react';
import { connect } from 'react-redux';
import * as LoginStatusTypes from '../Status';
import * as Actions from '../Actions';
import { Button, Avatar, Menu, Dropdown } from 'antd';
import Toast from '../../components/toast/Toast.jsx';
import {Link} from 'react-router-dom';



const mapState = (state) => {
    return {
        loginStatus: state.login.status,
        currentUser: state.login.data,
        msg: state.login.msg
    }
}

const mapDispatch = (dispatch) => {
    return {
        signOut: () => dispatch(Actions.signOut())
    }
}



class LoginCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'small',
            head: `http://localhost:3099/${props.currentUser.head}` || 'http://localhost:3099/default_head.jpg'
        }
    }

    render() {
        const { loginStatus, currentUser, msg, signOut } = this.props;
        const { size, head } = this.state;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to='/personal'>PER IM</Link>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={signOut} type="primary" size={size}>SIGN OUT</Button>
                </Menu.Item>
            </Menu>
        );
        switch (loginStatus) {
            case LoginStatusTypes.FAILURE:
                return <div style={{ color: 'orange' }}>{msg}<Toast /></div>;
            case LoginStatusTypes.SUCCESS: {
                return (
                    <div>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Avatar src={head} />
                        </Dropdown>
                    </div>);
            }
            case LoginStatusTypes.LOADING:
                return <div></div>;
            default:
                throw new Error('未知错误' + loginStatus);
        }
    }
}


export default connect(mapState, mapDispatch)(LoginCheck);