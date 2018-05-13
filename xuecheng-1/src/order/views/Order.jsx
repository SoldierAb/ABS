import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Actions from '../Actions';
import * as Status from '../../Status';
import QueueAnim from 'rc-queue-anim';

const Wrapper = styled.div`

`;

const mapState = (state) => {
  return {
    getOrderStatus: state.order.status,
    orders: state.order.data,
    msg: state.order.msg
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOrders: () => dispatch(Actions.getOrders())
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, orders: [] };
  }

  componentDidMount() {
    this.props.getOrders();
  }

  getOrderTem = () => {
    const { orders } = this.props;
    for (let i in orders) {
      orders[i].order_address = JSON.parse(JSON.stringify(orders[i].order_address));
    }
    return orders.map((item, index) => {
      const { phone, order_no, order_price, order_address, order_need_sex, order_subject, order_time, order_detail } = item;
      console.log('city: ', order_address.city);
      console.log('address : ', order_address.address);
      return (
        <div
          key={item + index}
          className=""
        >
          {order_no}
        </div>
      );
    })
  }

  render() {
    const { getOrderStatus, orders, msg } = this.props;
    switch (getOrderStatus) {
      case Status.LOADING:
        return <Wrapper>加载中 。 。 。</Wrapper>;
      case Status.SUCCESS:
        return (
          <Wrapper>
            <QueueAnim delay={300}>
              {this.getOrderTem()}
            </QueueAnim>
          </Wrapper>
        );
      case Status.FAILURE:
        return <Wrapper>加载失败 。。。</Wrapper>;
      default:
        return <Wrapper>加载中 。。。</Wrapper>;
    }
  }
}




export default connect(mapState, mapDispatch)(Order);