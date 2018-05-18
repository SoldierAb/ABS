import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import Pertea from './Tea/Pertea.jsx';
import Peruser from './User/Peruser.jsx';
import OrderAdd from '../../order/views/Addorder.jsx'
import Perorder from './User/Perorder.jsx';
import Allorder from './Admin/Allorder.jsx';
import Alluser from './Admin/Alluser.jsx';
import Allteacher from './Admin/Allteacher.jsx';
import * as UserTypes from '../../UserTypes';
import * as Actions from '../Actions';
import * as LoginStatusTypes from '../../Status';

const TabPane = Tabs.TabPane;

const mapDispatch = (dispatch) => {
    return {
        modifyAct: (obj) => {
            dispatch(Actions.modifyAct(obj))
        }
    }
}

const mapState = (state) => {
    return {
        currentUser: state.login.data,
        loginStatus: state.login.status,
    }
}


class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            loginStatus: props.loginStatus,
            timer: null,
        };
    }

    componentDidMount() {
        if (!this.state.timer) {
            this.setState({
                timer: setInterval(this.checkState, 3000)
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currentUser.state !== nextState.currentUser.state;
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        this.setState({
            timer: null
        })
    }

    checkState = () => {
        // let { pathname } = this.props.history.location;
        // console.log('路由：   ', pathname);
        // if (pathname !== '/personal') {
        //     this.setState({
        //         timer: null
        //     })
        //     return;
        // }
        const apiUrl = `/loginCheck`;
        let { currentUser, loginStatus } = this.state;
        if (loginStatus === LoginStatusTypes.SUCCESS) {
            let obj = {
                userphone: currentUser.phone,
                userpwd: currentUser.pwd,
                usertype: currentUser.type,
                remember: true
            };
            fetch(apiUrl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then((res) => {
                if (res.status !== 200) {
                    throw new Error('错误 ' + res);
                } else {
                    return res.json().then((resJson) => {
                        console.log('当前用户===校验---**：   ', resJson);
                        this.setState({ currentUser: resJson.data });
                        if (obj.remember) localStorage.setItem(`current_user`, JSON.stringify(obj));
                    })
                }
            })
        }
    }


    render() {
        let { modifyAct, history } = this.props;
        let { currentUser } = this.state;
        if (!currentUser) {
            history.push('/login');
            return null;
        }

        if (currentUser.type === UserTypes.ADMIN) {
            return (
                <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="用户信息管理" key="1">
                        <Tabs defaultActiveKey="2-1">
                            <TabPane tab="教员信息管理" key="2-1">
                                <div>
                                    {/* <Allteacher currentUser={currentUser} /> */}
                                </div>
                            </TabPane>
                            <TabPane tab="用户信息管理" key="2-2">
                                <div>
                                    <Alluser currentUser={currentUser} />
                                </div>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="招聘信息管理" key="2">
                        <div style={{ paddingTop: '10px' }}>
                            <Allorder currentUser={currentUser} />
                        </div>
                        {/* <Tabs defaultActiveKey="2-1">
                            <TabPane tab="招聘信息添加" key="2-1">
                                <div><OrderAdd data={currentUser} /></div>
                            </TabPane>
                            <TabPane tab="平台招聘信息" key="2-2">
                                <div>
                                </div>
                            </TabPane>
                        </Tabs> */}
                    </TabPane>
                </Tabs>
            );
        }

        if (currentUser.type === UserTypes.USER) {
            return (
                <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="个人信息管理" key="1">
                        <div><Peruser modifyAct={modifyAct} data={currentUser} /></div>
                    </TabPane>
                    <TabPane tab="招聘信息管理" key="2">
                        <Tabs defaultActiveKey="2-1">
                            <TabPane tab="招聘信息添加" key="2-1">
                                {
                                    currentUser.state === UserTypes.ACTIVE ?
                                        <div><OrderAdd data={currentUser} /></div> :
                                        <div>您暂时还没有添加招聘信息的权限哦，管理员审核中。。。</div>
                                }
                            </TabPane>
                            <TabPane tab="我的招聘信息" key="2-2">
                                <div>
                                    <Perorder currentUser={currentUser} />
                                </div>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            )
        }
        if (currentUser.type === UserTypes.TEACHER) {
            return <div><Pertea modifyAct={modifyAct} data={currentUser} /></div>
        }
    }
}

const PersonalBak = ({ currentUser, modifyAct, history }) => {
    if (!currentUser) {
        history.push('/login');
        return null;
    }

    if (currentUser.type === UserTypes.ADMIN) {
        return (
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="用户信息管理" key="1">
                    <Tabs defaultActiveKey="2-1">
                        <TabPane tab="教员信息管理" key="2-1">
                            <div>
                                {/* <Allteacher currentUser={currentUser} /> */}
                            </div>
                        </TabPane>
                        <TabPane tab="用户信息管理" key="2-2">
                            <div>
                                <Alluser currentUser={currentUser} />
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>
                <TabPane tab="招聘信息管理" key="2">
                    <div style={{ paddingTop: '10px' }}>
                        <Allorder currentUser={currentUser} />
                    </div>
                    {/* <Tabs defaultActiveKey="2-1">
                        <TabPane tab="招聘信息添加" key="2-1">
                            <div><OrderAdd data={currentUser} /></div>
                        </TabPane>
                        <TabPane tab="平台招聘信息" key="2-2">
                            <div>
                            </div>
                        </TabPane>
                    </Tabs> */}
                </TabPane>
            </Tabs>
        );
    }

    if (currentUser.type === UserTypes.USER) {
        return (
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="个人信息管理" key="1">
                    <div><Peruser modifyAct={modifyAct} data={currentUser} /></div>
                </TabPane>
                <TabPane tab="招聘信息管理" key="2">
                    <Tabs defaultActiveKey="2-1">
                        <TabPane tab="招聘信息添加" key="2-1">
                            {
                                currentUser.state === UserTypes.ACTIVE ?
                                    <div><OrderAdd data={currentUser} /></div> :
                                    <div>您暂时还没有添加招聘信息的权限哦，管理员审核中。。。</div>
                            }
                        </TabPane>
                        <TabPane tab="我的招聘信息" key="2-2">
                            <div>
                                <Perorder currentUser={currentUser} />
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>
            </Tabs>
        )
    }
    if (currentUser.type === UserTypes.TEACHER) {
        return <div><Pertea modifyAct={modifyAct} data={currentUser} /></div>
    }
}


export default connect(mapState, mapDispatch)(Personal);
