import React from 'react';
import { Modal, Row, Col, Form, Input, Button, Upload, Icon, notification } from 'antd'
import { createFormField } from '../../utils/util'
import './style.less'
const { TextArea } = Input;

@Form.create()
class BrandInfoAdd extends React.Component {
  state = {}

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  submitForm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        notification.success({
          message: '提交成功',
          description: values.name,
          duration: 3
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { brandInfo } = this.props
    const formItemLayout = {
      labelCol: {
          span: 4
      },
      wrapperCol: {
          span: 20
      },
    };
    return (
      <Modal
        visible={this.props.visible}
        width={800}
        centered
        onOk={this.submitForm}
        onCancel={this.props.onCancel}
        title='添加品牌'>
        <Form {...formItemLayout} className="brand-info-model">
          <Form.Item label="标题">
            {getFieldDecorator('name', {})(<Input />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 点击上传图片
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('note', {})(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    ) 
  }
}

export default BrandInfoAdd;