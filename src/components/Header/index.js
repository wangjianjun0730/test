import React from 'react';
// import backIcon from './images/icon-left.png'
import backIcon from './images/icon-left2.png'
import './style.less';

const Header = (props) => {

  const callback = () => {};

  const backHandler = () => {
    window.history.back();
  };

  const title = props.title || 'Header';
  const back = props.back || backHandler;
  const bgColor = props.bgColor || '#fff';
  const shadow = props.shadow || 'rgba(0, 0, 0, 0)';
  const fontColor = props.fontColor || '#333';
  const option = props.option || {};

  return (
    <div className="Header" style={{background : bgColor, boxShadow: `${shadow} 0 0 8px`}}>
      <div className="header-container">
        <div className="header-back" onClick={back}>
          <img src={backIcon} alt="back"/>
        </div>
        <div className="header-content" style={{color: fontColor}}>{title}</div>
        <div className="header-option" onClick={option.callback || callback}>{option.content || null}</div>
      </div>
    </div>
  )
};

export default Header;
