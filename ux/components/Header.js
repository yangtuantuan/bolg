import React from 'react'
import style from '../styles/components/header.module.css';

import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'

const Header = () => (
  <div className={style.header}>
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className={style.logo}>技术胖</span>
        <span className={style.txt}>专注前端开发,每年100集免费视频。</span>
      </Col>

      <Col className={style.memu} xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <HomeOutlined className={style.icon} />
            首页
          </Menu.Item>
          <Menu.Item key="video">
            <YoutubeOutlined className={style.icon} />
            视频
          </Menu.Item>
          <Menu.Item key="life">
            <SmileOutlined className={style.icon}  />
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header
