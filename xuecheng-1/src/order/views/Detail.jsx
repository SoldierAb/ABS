import React from 'react';
import styled, { keyframes } from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import QRCode from 'qrcode.react';
import Minmap from '../../components/edumap/Minmap.jsx';
import * as DateUtil from '../../utils/DateUtil';
import { Icon } from 'antd';

const fadeUp = keyframes`
  0%{
    margin-right:10px;
    
  }
  100%{
    margin-right:6px;
  }
`;

const Wrapper = styled.div`
  text-align:center;
  .detailHeader{
    margin:30px auto;
  }
  .detailContainer{
    font-size:16px;
    width：1000px;
    height:300px;
    padding:20px 100px;
    .detailLeft{
      height:280px;
      width:760px;
      background: #fff8ff;
      margin-right:20px;
      padding:20px 30px;
        &:hover{
          box-shadow:2px 2px 2px 2px rgba(57, 34, 245, 0.2);
        }
        .orderHeader{
          padding:10px 0;
          border-bottom:1px solid #dcdcdc;
        }
        .orderContent{
          padding:10px 0;
        }
    }
    .detailRight{
      height:280px;
      width:300px;
      background: #fff8ff;
      padding:30px 20px;
      &:hover{
        box-shadow:2px 2px 2px 2px rgba(57, 34, 245, 0.2);
      }
      .qrBox{

      }
      .phoneBox{
        padding:20px;
        font-size:24px;
        text-align:center;
        .phoneIcon{
          animation:${fadeUp} .5s ease infinite;
          margin-right:10px;
        }
      }
    }
    margin-bottom:20px;
  }
  .detailMap{
    width:1070px;
    height:400px;
    margin:20px auto;
  }
`;



class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: null, currentUser: null, loaded: false };
  }

  componentDidMount() {
    if (!this.props.location.state) return;
    let { order, currentUser } = this.props.location.state;
    let address = order.order_address.city.join('') + order.order_address.address;
    this.setState({
      order, currentUser, address, loaded: true
    });

  }


  render() {
    let { order, currentUser, loaded, address } = this.state;
    return (
      <Wrapper>
        <div className="detailHeader">
          <h1>ORDER DETAIL</h1>
        </div>
        <div className="detailContainer clearfix">
          <QueueAnim delay={300}>
            {
              loaded ? [
                <div key={Math.random()}>
                  <QueueAnim delay={400}>
                    <div className="detailLeft fl">
                      <div className="orderHeader clearfix">
                        <div className="orderHeaderLeft fl">
                          <span>订单号：</span>
                          <span>{order.order_no}</span>
                        </div>
                        <div className="orderHeaderRight fr">
                          <span>发布时间：</span>
                          <span>{DateUtil.toDate(order.order_no)}</span>
                          <span>订单状态：</span>
                          {order.order_state == 1 ? <span style={{ color: 'green' }}>待接单</span> : <span style={{ color: 'yellow' }}>已接单</span>}
                        </div>
                      </div>
                      <div className="orderContent">
                        <div className="clearfix">
                          <div className="fl">
                            <span>订单价位：</span>
                            <span style={{ fontWeight: 'bold', color: 'orange' }}>&yen;{order.order_price}.00/小时</span>
                          </div>
                          <div className="fr">
                            <span>需要教员性别：</span>
                            <span>{order.order_need_sex === 1 ? '男' : '女'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="orderContent clearfix">
                        <div className="fl">
                          <span style={{ marginRight: "10px" }}>需要辅导的科目：</span>
                          {order.order_subject.map((item, i) =>
                            <span key={item + i} style={{ marginRight: "10px" }}>{item}</span>
                          )}
                        </div>
                      </div>
                      <div className="orderContent clearfix">
                        <div className="fl">
                          <span>地址：</span>
                          <span>{order.order_address.city[0]}</span>
                          <span>{order.order_address.city[1]}</span>
                          <span>{order.order_address.city[2]}</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>{order.order_address.address}</span>
                        </div>
                      </div>
                      <div className="orderContent clearfix">
                        <div className="fl">
                          <span>基本情况：</span>
                          <span>{order.order_detail}</span>
                        </div>
                      </div>
                    </div>
                  </QueueAnim>
                  <QueueAnim delay={420}>
                    <div key={Math.random()} className="detailRight fl">
                      <div className="qrBox">
                        <QRCode value={order.phone} />
                      </div>
                      <div className="phoneBox">
                        <span class="phoneIcon">
                          <Icon type="phone" />
                        </span>
                        <span>
                          {order.phone}
                        </span>
                      </div>
                    </div>
                  </QueueAnim>
                </div>
              ] : <div>非法访问</div>
            }
          </QueueAnim>
        </div>
        <div className="detailMap">
          <QueueAnim delay={520}>
            <div key={Math.random()}>
              <Minmap address={address} history={this.props.history} />
            </div>
          </QueueAnim>
        </div>
      </Wrapper>
    );
  }

}


export default Detail;



const Detailbak = ({ location }) => {
  let { order, currentUser } = location.state;
  let { phone, order_no, order_price, order_address, order_need_sex, order_subject, order_time, order_detail, order_state } = order;
  return (
    <Wrapper>
      <div className="detailHeader">
        <h1>ORDER DETAIL</h1>
      </div>
      <div className="detailContainer clearfix">
        <QueueAnim delay={200}>
          <div key={Math.random()}>
            <QueueAnim delay={300}>
              <div className="detailLeft fl">
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
                      <span style={{ color: 'orange' }}>&yen;{order_price}.00/小时</span>
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
                <div className="orderContent">
                  <div className="">
                    <span>地址：</span>
                    <span>{order_address.city[0]}</span>
                    <span>{order_address.city[1]}</span>
                    <span>{order_address.city[2]}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>{order_address.address}</span>
                  </div>
                </div>
                <div className="orderContent">
                  <div className="">
                    <span>基本情况：</span>
                    <span>{order_detail}</span>
                  </div>
                </div>


              </div>
            </QueueAnim>
            <QueueAnim delay={320}>
              <div key={Math.random()} className="detailRight fl">

              </div>
            </QueueAnim>
          </div>
        </QueueAnim>
      </div>
    </Wrapper>
  );
}

