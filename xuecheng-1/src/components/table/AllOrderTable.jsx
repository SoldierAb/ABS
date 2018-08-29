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
    fixed: 'left',
    width: 120
  },
  {
    title: '手机号',
    dataIndex: 'phone',
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
    fixed: 'right',
    width: 80
  },
];

const _sex = ['男', '女', '不限'],
  _state = ['待接单', '已处理'];


export default class AllOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loaded: false,
      orders: []
    };
  }

  componentDidMount() {
    let { orders } = this.props;
    let data = [];

    for (let i = 0; i < orders.length; i++) {
      data.push({
        key: orders[i].order_no,
        phone: orders[i].phone,
        order_no: orders[i].order_no,
        order_price: orders[i].order_price,
        order_address: orders[i].order_address,
        order_need_sex: _sex[parseInt(orders[i].order_need_sex) - 1],
        order_subject: orders[i].order_subject,
        order_time: orders[i].order_time,
        order_detail: orders[i].order_detail,
        order_state: _state[parseInt(orders[i].order_state) - 1]
      });
    }
    this.setState({
      loaded: true,
      orders: data
    })

  }

  start = () => {
    this.setState({ loaded: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loaded: false,
      });
    }, 1000);
  }


  delOrder = () => {
    let { selectedRowKeys, orders } = this.state;
    const _this = this;
    const delApi = `/delOrder`;
    if (selectedRowKeys.length > 0) {
      fetch(delApi, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: selectedRowKeys })
      }).then((res) => {
        if (res.status !== 200) throw new Error('删除操作出错' + res);
        for (var i = 0; i < selectedRowKeys.length; i++) {
          for (var j = 0; j < orders.length; j++) {
            if (orders[j].order_no === selectedRowKeys[i]) {
              orders.splice(j, 1);
            }
          }
        }
        _this.setState({
          selectedRowKeys: [],
          orders
        });
        _this.props.refresh();
        message.success('删除操作成功！', 2);
      })
    }
  }

  /**
   * 已处理未处理状态设置
   * 
   * @param {any} e 
   */
  clickAct = (e) => {
    let { selectedRowKeys, orders } = this.state,
      _type = e.target.value;
    const _this = this;
    const updateApi = `/updateOrder`;
    if (selectedRowKeys.length > 0) {
      fetch(updateApi, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: selectedRowKeys, type: _type })
      }).then((res) => {
        if (res.status !== 200) throw new Error('更新状态出错' + res);
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
            _this.props.refresh();
            message.success('操作成功！', 2);
          }
        })
      }).catch((err) => {
        throw new Error('Err' + err);
      })
    }
  }

  /**
   * 选中的数据同步
   * 
   * @param {any} selectedRowKeys 
   */
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loaded, selectedRowKeys, orders } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
              <Button
                type="primary"
                onClick={this.delOrder}
                disabled={!hasSelected}
              >
                删除
            </Button>
            </span>
          </div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `当前选中 ${selectedRowKeys.length} 条数据` : ''}
          </span>
        </div>
        <Table scroll={{ x: 1200, y: 400 }} rowSelection={rowSelection} columns={columns} dataSource={orders} />
      </Wrapper>
    );
  }
}
