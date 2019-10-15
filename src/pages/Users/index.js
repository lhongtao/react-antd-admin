import React from 'react';
import { Table, Card, Form, Input, Button, DatePicker , message, Icon, Row, Col, Divider, Modal, Popconfirm, notification } from 'antd'
// import InfoModal from './InfoModal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import CreateUserModal from './CreateUserModal'

const { RangePicker } = DatePicker;
const store = connect(
  (state) => ({ user: state.user })
)

@withRouter @store @Form.create()
class User extends React.Component {
  state = {
    users: [], // 用户列表
    usersLoading: false,//获取用户loading
    pagination: {
      total: 0,
      current: 1,  //前台分页是从1开始的，后台分页是从0开始的，所以要注意一下
      pageSize: 10,
      showQuickJumper: true
    },
    isShowInfoModal: false,
    userInfo: {},        //当前行的user信息
    selectedRowKeys: [],   //选择中的行keys
    isShowCreateModal: false
  }
  
  componentDidMount() {
    // this.getUsers()
  }

  componentDidUpdate(prevProps) {
    // 典型用法（不要忘记比较 props）：当修改用户信息时，重新加载
    if (this.props.userID !== prevProps.userID) {
      this.getUsers(this.state.pagination.current);
    }
  }
  /**
   * 分页
   */
  getUsers = async (page = 1) => {
    const { pagination } = this.state
    const fields = this.props.form.getFieldsValue()
    this.setState({
        usersLoading: true,
    })
    const res = await json.get('/user/getUsers', {
        current: page - 1,
        username: fields.username || '',   //koa会把参数转换为字符串，undefined也会
        startTime: fields.startTime ? fields.startTime.valueOf() : '',
        endTime: fields.endTime ? fields.endTime.valueOf() : ''
    })
    if (res.status !== 0) {
        this.setState({
            usersLoading: false,
        })
        return
    }
    this.setState({
        usersLoading: false,
        users: res.data.list,
        pagination: {
            ...pagination,
            total: res.data.total,
            current: page
        }
    })
  }
  /**
   * table分页
   */
  onTableChange = async (page) => {
    await this.setState({
        pagination: page
    })
    this.getUsers(page.current)
  }

  onDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  onOk = (value) => {
    console.log('onOk: ', value);
  }
  /**
   * 搜索函数
   */
  onSearch = () => {
    const fields = this.props.form.getFieldsValue()
    console.log(fields)
    // this.getUsers()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ padding: 24 }}>
        <Card bordered={false}>
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Row>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator('username')(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item>
                  {getFieldDecorator('startTime')(
                    <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['注册开始时间', '注册结束时间']}
                      onChange={this.onDateChange}
                      onOk={this.onOk}
                    />,
                  )}
                </Form.Item>    
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button type="primary" icon='search' onClick={this.onSearch}>搜索</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default User;