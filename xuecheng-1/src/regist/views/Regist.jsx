import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Tabs } from 'antd';
import RegistUser from './RegistUser.jsx';
import RegistTea from './RegistTea.jsx';
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
const OverPack = ScrollAnim.OverPack;
const Parallax = ScrollAnim.Parallax;
const abcontent = `http://localhost:3000/img_bg_2.jpg`;

const mapDispatch = (dispatch) => {
  return {
    registAct: (obj) => { dispatch(Actions.regist(obj)) }
  }
}


const TabPane = Tabs.TabPane;

injectGlobal`
  *{
    margin:0;
    padding:0;
  }
  
  .clearfix:after{
    height:0;
    content:'';
    display:block;
    visibility:hidden;
    clear:both;
  }

  .clearfix{
    zoom:1;
  }
 
  .fl{
    float:left;
  }

  .fr{
    float:right;
  }
`;

const Wrapper = styled.div`
    *{
      box-sizing:border-box;
    }
    .registContainer{
       padding:20px 100px;
       .leftBar{
          width:30%;
          height:200px;
          img{
            height:100%;
            width:100%;
          }
       }
       .rightBar{
          width:70%;
          padding:10px 20px 10px 0;
       }
    }
     
`;


class RegistContainer extends Component {
  state = {
    confirmDirty: false,
    tab: '1',
    imgpath: ''
  };

  handleTabs = (key) => {
    console.log('tab key:  ', key);
    this.setState({
      tab: key
    })
  }

  render() {
    const { tab } = this.state;
    const { registAct } = this.props;
    return (
      <Wrapper>
        <div className="registContainer">
          <div className="leftBar fl">
            <img src={abcontent} alt="" />
          </div>
          <div className="rightBar fr">
            <Tabs defaultActiveKey={tab} onChange={this.handleTabs} tabPosition="left">
              <TabPane tab="雇主注册" key="1">
                <RegistUser registAct={registAct} />
              </TabPane>
              <TabPane tab="教员注册" key="5">
                <RegistTea registAct={registAct} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Wrapper>
    );
  }
}


export default connect(null, mapDispatch)(RegistContainer);
