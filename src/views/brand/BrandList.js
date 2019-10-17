import React, { Component } from 'react';
import axios from 'axios';
import {Card, Button, Table, Icon, Popconfirm, Divider, notification } from 'antd'
import { Resizable } from 'react-resizable';
import BrandInfoModal from './InfoModal'
import './style.less'

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      data: null,
      isLoading: false,
      isShowInfoModal: false,
      brandInfo: {},   //当前行的信息
      pagination: {
        total: 0,
        current: 1,  //前台分页是从1开始的，后台分页是从0开始的，所以要注意一下
        pageSize: 10,
        showQuickJumper: true
      },
      selectedRowKeys: [],  //选择中的行keys
      columns: [
        {
          title: 'ID',
          key: 'key',
          dataIndex: 'key',
          align: 'center',
          width: 40,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          width: 100,
        },
        {
          title: '标题',
          dataIndex: 'name',
          width: 100,
        },
        {
          title: '图片',
          dataIndex: 'image',
          render: (text, record) => ( 
            <div><img src={text}/></div>
          ),
          width: 40,
        },
        {
          title: '描述',
          dataIndex: 'note',
          width: 240,
        },
        {
          title: '操作',
          key: 'active',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <div style={{ textAlign: 'center' }}>
                <span className='my-a' onClick={() => this.showInfoModal(record)}><Icon type="eye" /> 查看</span>
                {
                  <Popconfirm title='您确定删除当前用户吗？' onConfirm={() => this.singleDelete(record)}>
                      <span className='my-a'><Divider type='vertical' /><Icon type='delete' /> 删除</span>
                  </Popconfirm>
                }
            </div>
          )
        },
      ],
    };
  }

  componentDidMount() { //  This is a good place to instantiate the network request(created) 
    this.getUserList()  
  }
  
  componentDidUpdate(prevProps) {
    // 典型用法（不要忘记比较 props）：当修改用户信息时，重新加载
    if (this.props.userID !== prevProps.userID) {
      this.getUsers(this.state.pagination.current);
    }
  }

  /**
   * 打开用户信息模特框，并初始化用户信息回显
   */
  showInfoModal = (record) => {
    const info = {
      key: record.key,
      date: record.date,
      name: record.name,
      image: record.image.split(','),
      note: record.note,
    }
    this.setState({
      isShowInfoModal: true,
      brandInfo: info
    })
  }
  /**
   * 关闭用户信息模态框
   */
  closeInfoModal = () => {
    this.setState({
        isShowInfoModal: false,
        brandInfo: {}
    })
  }
  getUserList = async () => {
    // -----------------------------------
    await axios.get(API + DEFAULT_QUERY)
      .then(result => this.setState({
        hits: result.data.hits,
    // -----------------------------------
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    this.setState({ isLoading: true });
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  data = [
    {
      key: 0,
      date: '2019-10-16 08:54:09',
      name: '108匠',
      image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350171032,3227234175&fm=26&gp=0.jpg',
      note: '这是一段描述内容,这是一段描述内容,这是一段描述内容,这是一段描述内容.',
    },
    {
      key: 1,
      date: '2019-10-16 08:54:09',
      name: '咪咕烤鱼',
      image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350171032,3227234175&fm=26&gp=0.jpg',
      note: '这是一段描述内容,这是一段描述内容,这是一段描述内容,这是一段描述内容.',
    },
    {
      key: 2,
      name: '蘑菇香香鸡',
      date: '2019-10-16 08:54:09',
      image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2350171032,3227234175&fm=26&gp=0.jpg',
      note: '这是一段描述内容,这是一段描述内容,这是一段描述内容,这是一段描述内容.',
    },
  ];

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  
  /**
   * table分页
   */
  onTableChange = async (page) => {
    await this.setState({
      pagination: page
    })
    console.log(page.current)
    console.log(this.props.user)
  }
  
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  /**
   * 单条删除
   */
  singleDelete = async (record) => {
    // const res = await json.post('/user/delete', {
    //     ids: [record.id]
    // })
    const res = {
      status: 0
    }
    if (res.status === 0) {
      notification.success({
          message: '删除成功',
          description: '3秒后自动退出登录',
          duration: 3
      })
    }
  }

  render() {
    const { pagination, selectedRowKeys, brandInfo, isShowInfoModal } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <div style={{ padding: 24 }}>
        <Card bordered={false}>
         <div className="brand-container">
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button type='primary' icon='plus'>新增</Button>&emsp;
              <Button type='danger' icon='delete' disabled={!selectedRowKeys.length}>批量删除</Button>
            </div>
            <Table 
              bordered
              components={this.components} 
              columns={columns} 
              dataSource={this.data} 
              pagination={pagination}
              rowSelection={rowSelection}
              onChange={this.onTableChange}
            />
          </div>  
        </Card>
        <BrandInfoModal visible={isShowInfoModal} brandInfo={brandInfo} onCancel={this.closeInfoModal} />
      </div>
    )  
  }    
}

export default BrandList