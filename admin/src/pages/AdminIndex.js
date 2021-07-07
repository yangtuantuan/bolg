import {
  DesktopOutlined, PieChartOutlined,
  ProfileOutlined, UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import apiPath from '../configs/apiPath';
import '../static/css/adminIndex.css';
import AddArticle from './AddArticle';

const { Header, Sider, Footer, Content } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [typeInfo, setTypeInfo] = useState([]);

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const getTypeInfo = async () => {
    const res = await axios.get(apiPath.getTypeInfo);
    if (res.data.error_code === "500") {
      props.history.push('/login');
      message.warn(res.data.data)
      return;
    }
    setTypeInfo(res.data.data);

  }
  const handleMenuClick = (e) => {
    if (e.key.startsWith('/index')) {
      props.history.push(e.key)
    }
  }

  useEffect(() => {
    getTypeInfo()
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['/index']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="/index">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="/index/add">添加文章</Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="9">
            <ProfileOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" component={AddArticle} exact />
              <Route path="/index/add" component={AddArticle} exact />
              <Route path="/index/add/:id" component={AddArticle} exact />
              {/* <Route path="/index/list"></Route> */}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>JSPang.com</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex