import React from 'react';
import { Table, Button, message } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
   .btnBox{
     span{
       margin-right:10px;
     }
   }
`

const columns = [
  {
    title: '编号',
    dataIndex: 'order_no',
  },
  {
    title: '辅导科目',
    dataIndex: 'order_subject',
  },
  {
    title: '单价(元/时)',
    dataIndex: 'order_price',
  },
  {
    title: '教员性别',
    dataIndex: 'order_need_sex',
  },
  {
    title: '辅导时间',
    dataIndex: 'order_time',
  },
  {
    title: '详情',
    dataIndex: 'order_detail',
  },
  {
    title: '地址',
    dataIndex: 'order_address',
  },
  {
    title: '状态',
    dataIndex: 'order_state',
  },
];

const _sex = ['男', '女', '不限'],
  _state = ['待接单', '已处理'];


export default class Ordertable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loaded: false,
      orders: []
    };
  }

  componentDidMount() {
    let { orders } = this.props;
    let data = [];

    if (orders.length < 1) {
      this.setState({
        loaded: false,
        orders: data
      })
      return;
    }
    for (let i = 0; i < orders.length; i++) {
      orders[i].order_address = typeof orders[i].order_address === 'string' ? JSON.parse(orders[i].order_address) : orders[i].order_address;
      orders[i].order_subject = typeof orders[i].order_subject === 'string' ? JSON.parse(orders[i].order_subject) : orders[i].order_subject;
      orders[i].order_time = typeof orders[i].order_time === 'string' ? JSON.parse(orders[i].order_time) : orders[i].order_time;
      data.push({
        key: orders[i].order_no,
        order_no: orders[i].order_no,
        order_price: orders[i].order_price,
        order_address: orders[i].order_address.city.join('') + orders[i].order_address.address,
        order_need_sex: _sex[parseInt(orders[i].order_need_sex) - 1],
        order_subject: orders[i].order_subject.join('，'),
        order_time: orders[i].order_time.join('，'),
        order_detail: orders[i].order_detail,
        order_state: _state[parseInt(orders[i].order_state) - 1]
      });
    }
    this.setState({
      loaded: true,
      orders: data
    })

  }

  clickRefresh = () => {
    this.props.refresh();
  }

  clickAct = (e) => {
    let { selectedRowKeys, orders } = this.state,
      _type = e.target.value;
    const _this = this;
    console.log(e.target.value);
    console.log(selectedRowKeys);
    const delApi = `/updateOrder`;
    if (selectedRowKeys.length > 0) {
      fetch(delApi, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: selectedRowKeys, type: _type })
      }).then((res) => {
        if (res.status !== 200) throw new Error('出错' + res);
        res.json().then((resJson) => {
          console.log('del order:  ', resJson);
          if (resJson.code === 200) {
            for (let j = 0; j < orders.length; j++) {
              for (let i = 0; i < selectedRowKeys.length; i++) {
                if (orders[j].order_no === selectedRowKeys[i]) {
                  orders[i].order_state = _state[_type - 1];
                }
              }
            }
            _this.setState({
              selectedRowKeys: [],
              orders
            });
            message.success('操作成功！', 2);
            _this.props.refresh();
          }
        })
      }).catch((err) => {
        throw new Error('Err' + err);
      })
    }
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loaded, selectedRowKeys, orders } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    if (orders.length < 1) {
      return <div>暂无数据~</div>
    }
    return (
      <Wrapper>
        <div style={{ marginBottom: 16 }}>
          <div className="btnBox">
            <span>
              <Button disabled={!hasSelected} type="primary" value={2} onClick={this.clickAct}>设为已处理</Button>
            </span>
            <span>
              <Button disabled={!hasSelected} type="danger" value={1} onClick={this.clickAct}>设为未处理</Button>
            </span>
            <span>
              <Button onClick={this.clickRefresh}>刷新</Button>
            </span>
          </div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `当前选中 ${selectedRowKeys.length} 条数据` : ''}
          </span>
        </div>
        <Table scroll={{ y: 400 }} rowSelection={rowSelection} columns={columns} dataSource={orders} />
      </Wrapper>
    );
  }
}
