import React from 'react';
import { Link } from 'react-router-dom';
import LoginCheck from '../../login/views/LoginCheck.jsx';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { Button } from 'antd';
import styled from 'styled-components';

injectGlobal`
    .menuActive{
        color: black;
        font-weight:bold;
        font-size:14px;
    }
    .menuNormal{
        color: grey;
    }
`;

const Wrapper = styled.div`
    .xTitle{
        background:white;
        height:30px;
        border-bottom:1px solid #eee;
        padding:0 80px;
        div{
            height:100%;
        }
    }
`;


const mapState = (state) => {
    return {
        loginStatus: state.login.status,
        currentUser: state.login.data,
        msg: state.login.msg
    }
}


const Nav = ({ locat, currentUser }) => {
    return (
        <Wrapper>
            {/* <div className="xTitle clearfix">
                <div className="fl">
                    <span>当前城市：</span>
                    <span>{localStorage.getItem('currentCity')}</span>
                </div>
            </div> */}
            <div className="xHeader">
                <ul className="clearfix fr">
                    {
                        !!currentUser ?
                            <li>
                                <LoginCheck />
                            </li>
                            : <li>
                                <Button type="primary" size="small">
                                    <Link to="/login" >登陆</Link>
                                </Button>
                                <Button size="small" style={{ marginLeft: '4px' }}>
                                    <Link to="/regist" >注册</Link>
                                </Button>
                            </li>
                    }
                    <li><Link to="/contact" className={locat.pathname === '/contact' ? 'menuActive' : ' menuNormal'}>联系我们</Link></li>
                    <li><Link to="/about" className={locat.pathname === '/about' ? 'menuActive' : ' menuNormal'}>关于家教</Link></li>
                    <li><Link to="/order" className={locat.pathname === '/order' ? 'menuActive' : ' menuNormal'}>招聘信息</Link></li>
                    <li><Link to="/teacher" className={locat.pathname === '/teacher' ? 'menuActive' : ' menuNormal'}>优秀教员</Link></li>
                    {/* <li><Link to="/course" className={locat.pathname === '/course' ? 'menuActive' : ' menuNormal'}>课程推荐</Link></li> */}
                    <li><Link to="/" className={locat.pathname === '/' ? 'menuActive' : ' menuNormal'}>主页</Link></li>
                </ul>
                <span className="logo fl">
                    <img src="http://localhost:3099/logo.png" alt="logo" />
                </span>
            </div>
        </Wrapper>
    );
}


export default connect(mapState)(Nav);