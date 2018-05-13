import React from 'react';
import './style.less';
import pic_blank_search from './pic_blank_search.png'

const Empty = (props) => {
  const {
    message,
    callback,
    btnText,
    visible
  } = props;

  let visibleContent = (
    <div className="empty-no-data">
      <img className="empty-no-data-img" src={pic_blank_search}/>
      <div>{message}</div>
      <div className="empty-btn-container"
           style={{display: btnText ? '' : 'none'}}
           onClick={callback}>
        <span>{btnText}</span>
      </div>
    </div>
  );

  let emptyContent = null;

  return visible ? visibleContent : emptyContent;
};
export default Empty;
