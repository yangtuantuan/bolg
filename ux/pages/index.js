import React, { useState } from 'react';
import { Col, List, Row } from 'antd';
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons';
import Link from 'next/link'
import axios from 'axios'

import Head from 'next/head';
import Advert from '../components/Advert';
import Author from '../components/Author';
import Header from '../components/Header';
import style from '../styles/list.module.css';
import Footer from '../components/Footer';

import apiPath from '../config/apiConfig';


const Home = (props) => {
  console.log(props);
  const [userList, setUserList] = useState(props.list);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={userList}
            renderItem={item => (
              <List.Item>
                <div className={style.title}>
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    {item.title}
                  </Link>
                </div>
                <div className={style.icon}>
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOpenOutlined />{item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                <div className={style.context}>{item.introduce}</div>
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

Home.getInitialProps = async () => {
  const promise = new Promise(
    (resolve) => {
      Promise.all([
        axios.get(apiPath.getTypeInfo),
        axios.get(apiPath.getArticleList)
      ]).then(([typeInfo, list]) => {
        resolve({
          list: list.data.data,
          typeInfo: typeInfo.data.data,
        })
      })
    },
    (reject) => {

    }
  );


  // const promise = new Promise((reslove) => {
  //   axios.get(`http://127.0.0.1:7001/default/getArticleList`).then(
  //     (res) => {
  //       reslove(res.data)
  //     }
  //   )
  // });

  return promise;
}

export default Home