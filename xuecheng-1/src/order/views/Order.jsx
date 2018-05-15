import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Actions from '../Actions';
import * as Status from '../../Status';
import QueueAnim from 'rc-queue-anim';
import * as DateUtil from '../../utils/DateUtil';
import { Button, message, Modal } from 'antd';
const confirm = Modal.confirm;

const Wrapper = styled.div`
  padding:40px;
  .orderContainerLeft{
    border:1px solid #eee;
    padding:20px 10px;
    width:60%;
    margin-right:10%;
    position:relative;
    .orderBox{
      border:2px dashed #096dd9;
      padding:10px 20px;
      margin:20px 10px;
      &:hover{
        box-shadow:2px 2px 2px 2px lightblue;
      }
      .orderHeader{
        padding:10px 0;
        border-bottom:1px solid #dcdcdc;
      }
      .orderContent{
        padding:10px 0;
      }
    }
  }

  .orderContainerRight{
      width:30%;
      border:1px solid yellow;
  }
  
`;

class Order extends React.Component {

  clickContact = (e) => {
    const _this = this;
    if (!this.props.currentUser) {
      confirm({
        title: '您还未登录哦~',
        content: '赶快登陆吧',
        okText: '朕就答应你吧',
        okType: 'success',
        cancelText: '才不要~',
        cancelType: 'danger',
        onOk() {
          _this.props.history.push('/login');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      return;
    }
    if (this.props.currentUser.type !== 5) {
      message.warning('您不是教员哦！', 2);
      return;
    }
    console.log('order_no: ', e.target.getAttribute('data-order-no'), '  phone  :', e.target.getAttribute('data-phone'));
    let order_no = e.target.getAttribute('data-order-no'),
      phone = e.target.getAttribute('data-phone');
  }

  componentDidMount() {
    this.props.getOrders(1, 5);
  }

  getOrderTem = () => {
    const { orders } = this.props;
    if (orders.length < 1) return <div>~暂无数据~</div>;
    for (let i in orders) {
      orders[i].order_address = typeof orders[i].order_address === 'string' ? JSON.parse(orders[i].order_address) : orders[i].order_address;
      orders[i].order_subject = typeof orders[i].order_subject === 'string' ? JSON.parse(orders[i].order_subject) : orders[i].order_subject;
      orders[i].order_time = typeof orders[i].order_time === 'string' ? JSON.parse(orders[i].order_time) : orders[i].order_time;
    }
    return orders.map((item, index) => {
      const { phone, order_no, order_price, order_address, order_need_sex, order_subject, order_time, order_detail, order_state } = item;
      return (
        <div
          key={item + index}
          className="orderBox"
        >
          <div className="orderHeader clearfix">
            <div className="orderHeaderLeft fl">
              <span>订单号：</span>
              <span>{order_no}</span>
            </div>
            <div className="orderHeaderRight fr">
              <span>发布时间：</span>
              <span>{DateUtil.toDate(order_no)}</span>
              <span>订单状态：</span>
              {order_state == 1 ? <span style={{ color: 'green' }}>待接单</span> : <span style={{ color: 'yellow' }}>已接单</span>}
            </div>
          </div>
          <div className="orderContent">
            <div className="clearfix">
              <div className="fl">
                <span>订单价位：</span>
                <span>&yen;{order_price}.00/小时</span>
              </div>
              <div className="fr">
                <span>需要教员性别：</span>
                <span>{order_need_sex === 1 ? '男' : '女'}</span>
              </div>
            </div>
          </div>
          <div className="orderContent">
            <div className="">
              <span style={{ marginRight: "10px" }}>需要辅导的科目：</span>
              {order_subject.map((item, i) =>
                <span key={item + i} style={{ marginRight: "10px" }}>{item}</span>
              )}
            </div>
          </div>
          <div className="orderContent clearfix">
            <div className="fl">
              <span>基本情况：</span>
              <span>{order_detail}</span>
            </div>
            <div className="fr">
              <Button type="primary" onClick={this.clickContact} data-order-no={order_no} data-phone={phone}>点击申请</Button>
            </div>
          </div>
        </div >
      );
    })
  }

  render() {
    const { getOrderStatus, orders, msg } = this.props;
    switch (getOrderStatus) {
      case Status.LOADING:
        return <Wrapper></Wrapper>;
      case Status.SUCCESS:
        return (
          <Wrapper>
            <div className="clearfix">
              <div className="orderContainerLeft fl">
                <QueueAnim delay={300}>
                  {this.getOrderTem()}
                </QueueAnim>
              </div>
              <div className="orderContainerRight fr">

              </div>
            </div>
          </Wrapper>
        );
      case Status.FAILURE:
        return <Wrapper>加载失败 。。。</Wrapper>;
      default:
        return <Wrapper>加载中 。。。</Wrapper>;
    }
  }
}

const mapState = (state) => {
  return {
    getOrderStatus: state.order.status,
    orders: state.order.data,
    msg: state.order.msg,
    currentUser: state.login.data
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOrders: (currentPage, pageSize) => dispatch(Actions.getOrders(currentPage, pageSize))
  }
}


export default connect(mapState, mapDispatch)(Order);