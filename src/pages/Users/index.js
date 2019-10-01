import React from 'react';
import {Card} from 'antd'

class User extends React.Component {
  state = { };
  render() {
    return (
      <div style={{ padding: 24 }}>
        <Card bordered={false} hoverable style={{ marginBottom: 24 }} bodyStyle={{ minHeight: 130 }}>
          <h3>用户列表</h3>
          这个人很懒，什么也没留下...
        </Card>
      </div>
    );
  }
}

export default User;