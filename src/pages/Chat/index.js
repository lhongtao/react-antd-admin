import React from 'react';
import { message, Avatar, Divider, Card } from 'antd'
import 'braft-editor/dist/index.css'
import { initChatList, initWebsocket } from '@/store/actions'
import moment from 'moment'
import { connect } from 'react-redux'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import './style.less'
import { createMessage, getMessageBoard, getAllUserList } from "@/api/common"
import { bindActionCreators } from 'redux'

const store = connect(
  (state) => ({ user: state.user, websocket: state.websocket, chatList: state.chatList, onlineList: state.onlineList}),
  (dispatch) => bindActionCreators({ initChatList, initWebsocket }, dispatch)
)

@store
class Chat extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),   //留言内容
    userList: [], //所有用户列表
  }
  componentDidMount() {
    if (this.props.websocket && this.props.websocket.readyState !== 1) {
      this.props.initWebsocket(this.props.user)
    }
    // this.chatListDom.scrollTop = this.chatListDom.scrollHeight
    this.getUserList()
    // window.onmouseup = this.onMouseUp
  }
  /**
   * 获取所有用户列表
   */
  getUserList = async () => {
    const res = await getAllUserList()
    await this.setState({
      userList: res.data || []
    })
    this.handleUserList()
  }

  /**
   * 处理用户列表(管理员、在线用户放在数组前面)
   */
  handleUserList = () => {
    const userList = this.state.userList
    const onlineList = this.props.onlineList
    let list1 = []
    let list2 = []
    let list3 = []
    for (let item of userList) {
        const isHave = onlineList.find(i => i.id === item.id)
        const user = {
            ...item,
            online: !!isHave
        }
        if (item.isAdmin) {
            list1.push(user)
        } else if (!!isHave) {
            list2.push(user)
        } else {
            list3.push(user)
        }
    }
    this.setState({
        userList: list1.concat(list2, list3)
    })
  }

  render() {
    const { editorState, userList } = this.state
    const { chatList, user, onlineList } = this.props
    const controls = ['emoji', 'italic', 'text-color', 'separator', 'link', 'separator', 'media']
    return (
      <div className='chat-container' ref={el => this.chatContainer = el}>
        <div className='chat-box' ref={el => this.chatBox = el}>
          <div className='chat-header' onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} ref={el => this.chatHeader = el}>
            <div className='header-left'>
                <img src={require('./imgs/header1.png')} alt="" />
            </div>
            <div className='header-center'>
                <img src={require('./imgs/header2.png')} alt="" />
            </div>
            <div className='header-right'>
                <Avatar src={user.avatar} />
            </div>
          </div>
          <div className='chat-body'>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;