import React from 'react';

import style from '../styles/components/footer.module.css';

const Footer = () => {
  return ( 
    <div className={style.footer}>
        <div>系统由 React+Node+Ant Desgin驱动 </div>
        <div>JSPang.com</div>
    </div>
  );
}
 
export default Footer;