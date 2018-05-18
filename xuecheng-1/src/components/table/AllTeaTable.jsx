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
    title: '性别',
    dataIndex: 'sex',
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
      teachers: []
    };
  }

  componentDidMount() {
    let { teachers } = this.props;
    let data = [];
    console.log(teachers);
    for (let i = 0; i < teachers.length; i++) {
      data.push({
        key: teachers[i].phone,
        phone: teachers[i].phone,
        name: teachers[i].name,
        head: teachers[i].head ? <Avatar src={`http://localhost:3099/${teachers[i].head}`} /> : <Avatar src={`http://localhost:3099/default_head.jpg`} />,
        iden: teachers[i].iden,
        type: teachers[i].type,
        collect: teachers[i].collect,
        order_no: teachers[i].order_no,
        state: teachers[i].state === UserTypes.ACTIVE ? <span style={{ color: 'green' }}>已激活</span> : <span style={{ color: 'red' }}>未激活</span>
      });
    }
    this.setState({
      loaded: true,
      teachers: data
    })

  }

  clickAct = (e) => {
    let { selectedRowKeys, teachers } = this.state,
      _state = e.target.value;
    const _this = this;
    // console.log(e.target.value);
    // console.log(selectedRowKeys);
    // const updateApi = `/rootActive`;
    // if (selectedRowKeys.length > 0) {
    //   fetch(updateApi, {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ root: selectedRowKeys, state: _state, type: UserTypes.USER })
    //   }).then((res) => {
    //     if (res.status !== 200) throw new Error('更新状态出错' + res);
    //     res.json().then((resJson) => {
    //       // console.log('click teachers:  ', resJson);
    //       if (resJson.code === 200) {
    for (let j = 0; j < teachers.length; j++) {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (teachers[j].phone === selectedRowKeys[i]) {
          // teachers[i].state = teachers[i].state;
          teachers[i].state = parseInt(_state) === UserTypes.ACTIVE ? <span style={{ color: 'green' }}>已激活</span> : <span style={{ color: 'red' }}>未激活</span>;
          console.log(teachers[i].phone, teachers[i].state);
        }
      }
    }
    console.log('after active act :  ', teachers);
    _this.setState({
      selectedRowKeys: [],
      teachers
    });
    // _this.props.refresh();
    message.success('操作成功！', 2);
    //       }
    //     })
    //   }).catch((err) => {
    //     throw new Error('Err' + err);
    //   })
    // }
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
    const { loaded, selectedRowKeys, teachers } = this.state;
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
          dataSource={teachers} />
      </Wrapper>
    );
  }
}
