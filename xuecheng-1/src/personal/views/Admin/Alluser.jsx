import React from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { Button, message, Modal, Pagination } from 'antd';
import * as UserTypes from '../../../UserTypes';
import AllUserTable from '../../../components/table/AllUserTable.jsx';

const Wrapper = styled.div`
  .Percontainer{
    padding-right:20px;
  }
  .ant-table-header{
    table{
      thead{
        tr{
          th:nth-child(1){
            width:60px;
          }
          th:nth-child(2){
            width:140px;
          }
          th:nth-child(3){
            width:170px;
          }
          th:nth-child(4){
            width:100px;
          }
          th:nth-child(5){
            width:100px;
          }
          th:nth-child(6){
            width:170px;
          }
          th:nth-child(7){
            width:300px;
          }
          th:nth-child(8){
            width:100px;
          }
        }
      }
    }
  }
  .ant-table-body{
    table{
      tbody{
        tr{
          td:nth-child(1){
            width:60px;
          }
          td:nth-child(2){
            width:140px;
          }
          td:nth-child(3){
            width:170px;
          }
          td:nth-child(4){
            width:100px;
          }
          td:nth-child(5){
            width:100px;
          }
          td:nth-child(6){
            width:170px;
          }
          td:nth-child(7){
            width:300px;
          }
          td:nth-child(8){
            width:100px;
          }
        }
      }
    }
  
  }
`;


export default class Perorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentUser: props.currentUser,
      users: []
    };
  }

  /**
   * 个人订单组件初始化加载数据
   * 
   */
  componentDidMount = () => {
    this.getUsers();
  }


  getUsers = () => {
    this.setState({
      loaded: false,
      users: []
    });
    let { phone, type } = this.state.currentUser, api = '';
    // let api = `/getPerOrders?currentPage=${currentPage}&&pageSize=${pageSize}&&phone=${phone}`;
    if (type === UserTypes.ADMIN) {
      api = `/getUsers`;
    }
    fetch(api).then((res) => {
      if (res.status !== 200) throw new Error('出错' + res);
      res.json().then((resJson) => {
        console.log('allusers : ', resJson);
        this.setState({
          loaded: true,
          users: resJson.data
        });
      })
    }).catch((err) => {
      throw new Error('Err' + err);
    })
  }

  render() {
    let { loaded, users } = this.state;
    if (users.length < 1) return <div>暂无数据~</div>;
    return (
      <Wrapper>
        <div className="Percontainer" key="b">
          <QueueAnim component="ul" type={['right', 'left']} leaveReverse>
            {loaded ? <AllUserTable users={users} refresh={this.getUsers} />
              : <li>加载中。。。</li>}
          </QueueAnim>
        </div>
        <div>
          {/* <Pagination showQuickJumper defaultCurrent={parseInt(currentPage)} total={total} onChange={this.switchPage} />, */}
        </div>
      </Wrapper>
    );
  }
};

