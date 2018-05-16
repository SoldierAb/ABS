import React from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import Minmap from '../../components/edumap/Minmap.jsx';

const Wrapper = styled.div`
  text-align:center;
  .detailHeader{
    margin:30px auto;
  }
  .detailContainer{
    width：1000px;
    height:400px;
    padding:20px 100px;
    .detailLeft{
      height:380px;
      width:760px;
      background: #D4D4D4;
      margin-right:20px;
    }
    .detailRight{
      height:380px;
      width:300px;
      background: #D4D4D4;
    }
    margin-bottom:20px;
  }
  .detailMap{
    width:1070px;
    height:400px;
    margin:20px auto;
  }
`;

const Detailbak = ({ location }) => {
  if (!location.state) return <div>非法访问</div>;
  let { order, currentUser } = location.state;
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
          <QueueAnim delay={200}>
            {
              loaded ? [
                <div key={Math.random()}>
                  <QueueAnim delay={300}>
                    <div className="detailLeft fl">

                    </div>
                  </QueueAnim>
                  <QueueAnim delay={320}>
                    <div key={Math.random()} className="detailRight fl">

                    </div>
                  </QueueAnim>
                </div>
              ] : <div>非法访问</div>
            }
          </QueueAnim>
        </div>
        <div className="detailMap">
          <QueueAnim delay={330}>
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