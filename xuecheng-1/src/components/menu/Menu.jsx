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
        height:30px;
        border-bottom:1px solid #eee;
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
                                    <Link to="/login" >Login</Link>
                                </Button>
                                <Button size="small" style={{ marginLeft: '4px' }}>
                                    <Link to="/regist" >Regist</Link>
                                </Button>
                            </li>
                    }
                    <li><Link to="/contact" className={locat.pathname === '/contact' ? 'menuActive' : ' menuNormal'}>Contact</Link></li>
                    <li><Link to="/about" className={locat.pathname === '/about' ? 'menuActive' : ' menuNormal'}>About</Link></li>
                    <li><Link to="/order" className={locat.pathname === '/order' ? 'menuActive' : ' menuNormal'}>Order</Link></li>
                    <li><Link to="/teacher" className={locat.pathname === '/teacher' ? 'menuActive' : ' menuNormal'}>Teacher</Link></li>
                    <li><Link to="/course" className={locat.pathname === '/course' ? 'menuActive' : ' menuNormal'}>Course</Link></li>
                    <li><Link to="/" className={locat.pathname === '/' ? 'menuActive' : ' menuNormal'}>Home</Link></li>
                </ul>
                <span className="logo fl">
                    <img src="http://localhost:3099/logo.png" alt="logo" />
                </span>
            </div>
        </Wrapper>
    );
}


export default connect(mapState)(Nav);