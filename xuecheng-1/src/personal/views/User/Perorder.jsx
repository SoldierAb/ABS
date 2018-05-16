import React from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

const Wrapper = styled.div`

`;


export default class Perorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      currentUser: props.currentUser,
      items: [
        <li key="0">==</li>,
        <li key="1">==</li>,
        <li key="2">==</li>
      ],
    };
  }
  onClick = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  onAdd = () => {
    let items = this.state.items;
    items.push(<li key={Date.now()}>========</li>);
    this.setState({
      show: true,
      items,
    });
  }
  onRemove = () => {
    let items = this.state.items;
    items.splice(items.length - 1, 1);
    this.setState({
      show: true,
      items,
    });
  }


  componentDidMount = () => {
    console.log('did mount');
    let { phone } = this.state.currentUser;
    const api = `/getPerOrders?currentPage=1&&pageSize=10&&phone=${phone}`;
    fetch(api).then((res) => {
      if (res.status !== 200) throw new Error('出错' + res);
      res.json().then((resJson) => {
        console.log('perorder:  ==  ', resJson);
      })
    }).catch((err) => {
      throw new Error('Err' + err);
    })
  }

  render() {
    return (
      <Wrapper>
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
          <Button onClick={this.onAdd} style={{ marginLeft: 10 }}>添加</Button>
          <Button onClick={this.onRemove} style={{ marginLeft: 10 }}>删除</Button>
        </p>
        <div className="demo-content">
          <div className="demo-tbody" key="b">
            <QueueAnim component="ul" type={['right', 'left']} leaveReverse>
              {this.state.show ? this.state.items : null}
            </QueueAnim>
          </div>
        </div>
      </Wrapper>
    );
  }
};

