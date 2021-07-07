import React, { useState, useEffect } from 'react';
import { Col, Row, Breadcrumb, Affix } from 'antd';
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons';
import axios from 'axios';
import MarkNav from 'markdown-navbar';
import marked from 'marked';

import Head from 'next/head';
import Advert from '../components/Advert';
import Author from '../components/Author';
import Header from '../components/Header';
import Footer from '../components/Footer';

import apiPath from '../config/apiConfig'

import style from '../styles/detailed.module.css';
import 'highlight.js/styles/monokai-sublime.css';
import 'markdown-navbar/dist/navbar.css';

const Detailed = (props) => {
  const [detailData, setUserList] = useState(props);
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  let html = marked(detailData.article_content);
  

  return (
    <>
      <Head>
        <title>博客详情页面</title>
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className={style.bread}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/list">视频列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {detailData.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className={style.title}>
              {detailData.title}
            </div>
            <div className={style.icon}>
              <span><CalendarOutlined />{detailData.addTime}</span>
              <span><FolderOpenOutlined />{detailData.typeName}</span>
              <span><FireOutlined />{detailData.view_count}</span>
            </div>
            <div className={style.content} dangerouslySetInnerHTML={{ __html: html }}>
            </div>
          </div>
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className={`${style.nav} common-box`}>
              <div className={style.nav_title}>文章目录</div>
              <MarkNav
                className="article"
                source={detailData.article_content}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )

}

Detailed.getInitialProps = async (context) => {
  const id = context.query.id;
  const promise = new Promise(resolve => {
    axios.get(`${apiPath.getArticleById}?id=${id}`).then((res) => {
      resolve(res.data.data)
    })
  })

  return promise
}

export default Detailed;




