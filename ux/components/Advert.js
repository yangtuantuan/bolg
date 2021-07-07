import React from 'react';

import style from '../styles/components/advert.module.css'

const Advert = () => {
  return (
    <div className={`${style.ad} common-box`}>
      <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
    </div>
  ); 
}

export default Advert;