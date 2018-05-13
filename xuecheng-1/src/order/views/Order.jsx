import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Actions from '../Actions';
import * as Status from '../../Status';

const Wrapper = styled.div`

`;

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getOrders();
  }
  componentDidUpdate() {

  }

  render() {
    return (
      <Wrapper>
        orders = =
      </Wrapper>
    );
  }
}

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


export default connect(mapState, mapDispatch)(Order);