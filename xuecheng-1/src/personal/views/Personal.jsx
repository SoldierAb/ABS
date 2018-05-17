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
        currentUser: state.login.data
    }
}


const Personal = ({ currentUser, modifyAct, history }) => {
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
                                <Allteacher currentUser={currentUser} />
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
                            <div><OrderAdd data={currentUser} /></div>
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
