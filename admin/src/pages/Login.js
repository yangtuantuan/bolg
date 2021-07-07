import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useState } from 'react';
import apiPath from '../configs/apiPath';
import '../static/css/login.css';



function Login(props) {
  const [isLoading, setIsLoading] = useState(false)
  // const [userName, setUserName] = useState('')
  // const [passWord, setPassWord] = useState('')

  const checkLogin = (values) => {
    setIsLoading(true);
    console.log(values);
    const {userName, passWord} = values;
    axios.post(`${apiPath.checkLogin}`, {
      userName,
      password: passWord
    })
      .then((res) => {
        console.log(res.data.openId);
        props.history.push('/index')
        message.success(res.data.data);
      })
      .catch((e) => {
        message.error('登陆失败')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const layout = {
    wrapperCol: {
      span: 24,
    },
    labelAlign: 'left'
  };

  return (
    <div className="login">
      <Spin tip="Loading.." spinning={isLoading}>
        <Card title="JsPang Blog System" bordered={true} style={{ width: 400 }}>
          <Form {...layout} onFinish={checkLogin} name="login">
            <Form.Item  rules={[{required: true,message: "请输入用户名！"}] } name="userName">
              <Input
                id="userName"
                size="large"
                placeholder="Enter you userName"
                prefix={<UserOutlined style={{ color: 'rgba(0, 0, .25)' }} />}
              />
            </Form.Item>
            <Form.Item rules={[{required: true, message: "请输入密码"}]} name="passWord">
              <Input.Password
                id="passWord"
                size="large"
                placeholder="Enter you passWord"
                prefix={<KeyOutlined style={{ color: 'rgba(0, 0, .25)' }} />}
              />
            </Form.Item>
            <Form.Item wrapperCol={24}>
              <Button type="primary" htmlType="submit" size="large" block > Login in </Button>
            </Form.Item>
          </Form>

        </Card>
      </Spin>
    </div>
  )
}

export default Login;