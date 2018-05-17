import React from 'react';
import { Table, Button, message, Avatar } from 'antd';
import styled from 'styled-components';
import * as UserTypes from '../../UserTypes';


const Wrapper = styled.div`
   .btnBox{
     span{
       margin-right:10px;
     }
   }
`

const columns = [
  {
    title: '头像',
    dataIndex: 'head',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '身份证号',
    dataIndex: 'iden',
  },
  {
    title: '状态',
    dataIndex: 'state',
  }
];

const _active = ['未激活', '已激活'];

export default class AllOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loaded: false,
      users: []
    };
  }

  componentDidMount() {
    let { users } = this.props;
    let data = [];

    for (let i = 0; i < users.length; i++) {
      data.push({
        key: users[i].phone,
        phone: users[i].phone,
        name: users[i].name,
        head: users[i].head ? <Avatar src={`http://localhost:3099/${users[i].head}`} /> : <Avatar src={`http://localhost:3099/default_head.jpg`} />,
        iden: users[i].iden,
        type: users[i].type,
        collect: users[i].collect,
        order_no: users[i].order_no,
        state: users[i].state === UserTypes.ACTIVE ? <span style={{ color: 'green' }}>已激活</span> : <span style={{ color: 'red' }}>未激活</span>
      });
    }
    this.setState({
      loaded: true,
      users: data
    })

  }

  clickAct = (e) => {
    let { selectedRowKeys, users } = this.state,
      _state = e.target.value;
    const _this = this;
    console.log(e.target.value);
    console.log(selectedRowKeys);
    const updateApi = `/rootActive`;
    if (selectedRowKeys.length > 0) {
      fetch(updateApi, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ root: selectedRowKeys, state: _state, type: UserTypes.USER })
      }).then((res) => {
        if (res.status !== 200) throw new Error('更新状态出错' + res);
        res.json().then((resJson) => {
          // console.log('click users:  ', resJson);
          if (resJson.code === 200) {
            for (let j = 0; j < users.length; j++) {
              for (let i = 0; i < selectedRowKeys.length; i++) {
                if (users[j].phone === selectedRowKeys[i]) {
                  users[i].state = _active[_state - 1];
                  console.log(users[i].phone, users[i].state);
                }
              }
            }
            console.log('after active act :  ', users);
            _this.setState({
              selectedRowKeys: [],
              users
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loaded, selectedRowKeys, users } = this.state;
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
              <Button disabled={!hasSelected} type="primary" value={2} onClick={this.clickAct}>激活</Button>
            </span>
            <span>
              <Button disabled={!hasSelected} type="danger" value={1} onClick={this.clickAct}>禁用</Button>
            </span>
          </div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `当前选中 ${selectedRowKeys.length} 条数据` : ''}
          </span>
        </div>
        <Table
          // scroll={{ x: 1200, y: 400 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users} />
      </Wrapper>
    );
  }
}
