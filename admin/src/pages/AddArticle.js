import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message
} from 'antd'

import axios from 'axios'

import marked from 'marked';

import '../static/css/addArticle.css'
import TextArea from 'antd/lib/input/TextArea';
import apiPath from '../configs/apiPath';
const { Option } = Select;

function AddArticle(props) {

  const [articleContent, setAticleCentent] = useState('');
  const [markDownCentent, setMarkDownCentent] = useState('');
  const [introducemd, setIntroducemd] = useState('');
  const [introducehtml, setIntroducehtml] = useState('');
  const [articleTitle, setAticleTitle] = useState('');
  const [showDate, setShowDate] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [selectArticleType, setSelectArticleType] = useState('');
  const [typeInfo, setTypeInfo] = useState([]);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false
  })

  const changeContent = (e) => {
    setAticleCentent(e.target.value);
    let html = marked(e.target.value);
    setMarkDownCentent(html);
  }
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html)
  }

  const selectTypeHandler = (value) => {
    setSelectArticleType(value)
  }

  const getTypeInfo = async () => {
    const res = await axios.get(apiPath.getTypeInfo);
    if (res.data.error_code === '500') {
      message.warn(res.data.data);
      setTypeInfo([]);
      setTimeout(() => {
        props.history.push('/login');
      }, 1000);
    }else if (res.data.data) {
      setTypeInfo(res.data.data);
      selectTypeHandler(res.data.data[0].id)
    }
  }

  const saveAticle = async () => {
    let dataProps = {};
    dataProps.type_id = selectArticleType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace('-', '/'); //??????????????????????????????
    dataProps.addTime = (new Date(datetext).getTime()) / 1000;
    axios.post(`${apiPath.addArticle}`, dataProps).then((res) => {
      message.success('????????????');
    }).catch((err) => {
      message.error('????????????')
    })
  }

  useEffect(() => {
    getTypeInfo();
  }, [])

  return (
    <>
      <div>
        <Row gutter={5}>
          <Col span={18}>
            <Row gutter={10}>
              <Col span={20}>
                <Input
                  value={articleTitle}
                  placeholder="????????????"
                  size="large"
                  allowClear
                  onChange={(e) => { setAticleTitle(e.target.value) }}
                ></Input>
              </Col>
              <Col span={4}>
                <Select
                  size="large"
                  className="type-select"
                  onChange={selectTypeHandler}
                  // value={selectArticleType}
                >
                  {
                    typeInfo.map((item) => {
                      return (<Option value={item.id}>{item.typeName}</Option>)
                    })
                  }
                </Select>
              </Col>
            </Row>
            <br />
            <Row gutter={10}>
              <Col span={12}>
                <TextArea
                  className="markdown-content"
                  rows="35"
                  placeholder="????????????"
                  onChange={changeContent}
                  onPressEnter={changeContent}
                ></TextArea>
              </Col>
              <Col span={12}>
                <div className="show-html" dangerouslySetInnerHTML={{ __html: markDownCentent }}>

                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <Button size="large">????????????</Button>
                <Button size="large" type="primary" onClick={saveAticle}>????????????</Button>
              </Col>
              <Col span={24}>
                <br />
                <TextArea
                  rows={4}
                  value={introducemd}
                  onChange={changeIntroduce}
                  onPressEnter={changeIntroduce}
                  placeholder="????????????"
                />
                <br /><br />
                <div className="intriduce-html" dangerouslySetInnerHTML={{ __html: "????????????" + introducehtml }}></div>
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    size="large"
                    onChange={(date, dateString) => setShowDate(dateString)}
                    placeholder="????????????"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    size="large"
                    onChange={(date, dateString) => setUpdateDate(dateString)}
                    placeholder="????????????"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AddArticle;