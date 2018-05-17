import React from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { Button, message, Modal, Pagination } from 'antd';
import * as UserTypes from '../../../UserTypes';
import Ordertable from '../../../components/table/AllOrderTable.jsx';

const Wrapper = styled.div`
  .Allcontainer{
    padding-right:20px;
  }
  .ant-table-header{
    table{
      thead{
        tr{
          th:nth-child(1){
            width:100px;
          }
          th:nth-child(2){
            width:120px;
          }
          th:nth-child(3){
            width:140px;
          }
          th:nth-child(4){
            width:170px;
          }
          th:nth-child(5){
            width:100px;
          }
          th:nth-child(6){
            width:100px;
          }
          th:nth-child(7){
            width:170px;
          }
          th:nth-child(8){
            width:180px;
          }
          th:nth-child(9){
            width:180px;
          }
          th:nth-child(10){
            width:80px;
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
            width:80px;
          }
          td:nth-child(2){
            width:120px;
          }
          td:nth-child(3){
            width:140px;
          }
          td:nth-child(4){
            width:170px;
          }
          td:nth-child(5){
            width:100px;
          }
          td:nth-child(6){
            width:100px;
          }
          td:nth-child(7){
            width:170px;
          }
          td:nth-child(8){
            width:180px;
          }
          td:nth-child(9){
            width:180px;
          }
          td:nth-child(10){
            width:80px;
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
      total: 0,
      pageSize: 10,
      currentPage: 1,
      orders: []
    };
  }

  onClick = () => {
    this.setState({
      loaded: !this.state.loaded,
    });
  }

  onAdd = () => {
    let items = this.state.items;
    items.push(<li key={Date.now()}>========</li>);
    this.setState({
      loaded: true,
      items,
    });
  }

  /**
   * 删除订单
   * 
   */
  onRemove = () => {
    let items = this.state.items;
    items.splice(items.length - 1, 1);
    this.setState({
      loaded: true,
      items,
    });
  }


  /**
   * 个人订单组件初始化加载数据
   * 
   */
  componentDidMount = () => {
    console.log('did mount');
    this.getOrders();
  }

  // switchPage = (current) => {
  //   console.log('当前页', current);
  //   this.setState({
  //     loaded: false,
  //     orders: []
  //   });
  //   // this.getOrders(current, 10);
  // }

  getOrders = () => {
    this.setState({
      loaded: false,
      orders: []
    });
    let { phone, type } = this.state.currentUser;
    let api = `/getOrders`;
    fetch(api).then((res) => {
      if (res.status !== 200) throw new Error('出错' + res);
      res.json().then((resJson) => {
        console.log('all order:  ==  ', resJson);
        this.setState({
          loaded: true,
          orders: resJson.data
        });
      })
    }).catch((err) => {
      throw new Error('Err' + err);
    })
  }

  // getOrders = (currentPage, pageSize) => {
  //   let { phone, type } = this.state.currentUser;
  //   let api = `/getOrders`;
  //   fetch(api).then((res) => {
  //     if (res.status !== 200) throw new Error('出错' + res);
  //     res.json().then((resJson) => {
  //       console.log('all order:  ==  ', resJson);
  //       this.setState({
  //         loaded: true,
  //         total: resJson.total,
  //         pageSize: parseInt(resJson.pageSize),
  //         currentPage: parseInt(resJson.currentPage),
  //         orders: resJson.data
  //       });
  //     })
  //   }).catch((err) => {
  //     throw new Error('Err' + err);
  //   })
  // }

  render() {
    let { loaded, total, pageSize, currentPage, orders } = this.state;
    if (orders.length < 1) return <div>暂无数据</div>;
    return (
      <Wrapper>
        <div className="Allcontainer" key="b">
          <QueueAnim component="ul" type={['right', 'left']} leaveReverse>
            {loaded ? <Ordertable refresh={this.getOrders} orders={orders} />
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

