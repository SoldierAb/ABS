import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import Pertea from './Tea/Pertea.jsx';
import Peruser from './User/Peruser.jsx';
import OrderAdd from '../../order/views/Addorder.jsx'
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


const Personal = ({ currentUser, modifyAct ,history }) => {
    if (!currentUser){
        return null;
        history.push('/login');
    }

    if (currentUser.type === UserTypes.USER) {
        return (
            <Tabs defaultActiveKey="1"  tabPosition="left">
                <TabPane tab="Personal IM" key="1">
                    <div><Peruser modifyAct={modifyAct} data={currentUser} /></div>
                </TabPane>
                <TabPane tab="Order IM" key="2">
                    <Tabs defaultActiveKey="2-1">
                        <TabPane tab="Order Add" key="2-1">
                            <div><OrderAdd data={currentUser} /></div>
                        </TabPane>
                        <TabPane tab="My Orders" key="2-2">
                            <div>My Orders</div>
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
