import React, { useState } from 'react';
import { Col, List, Row, Breadcrumb } from 'antd';
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons';
import Head from 'next/head';
import Advert from '../components/Advert';
import Author from '../components/Author';
import Header from '../components/Header';
import Footer from '../components/Footer';
import style from '../styles/list.module.css';
import axios from 'axios';
import apiPath from '../config/apiConfig';



const BlogList = (props) => {
  const [userList, setUserList] = useState(props);
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>视频列表</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={userList}
            renderItem={item => (
              <List.Item>
                <div className={style.title}>{item.title}</div>
                <div className={style.icon}>
                  <span><CalendarOutlined /> 2019-06-28</span>
                  <span><FolderOpenOutlined />视频教程</span>
                  <span><FireOutlined /> 5555人</span>
                </div>
                <div className={style.context}>{item.context}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </>
  )
}


BlogList.getInitProps = () => {
  const promise = new Promise();
  axios.get(`${apiPath.getArticleList}`).then((res) => {
    promise.resolve(res.data);
  })

  return promise;
}

export default BlogList