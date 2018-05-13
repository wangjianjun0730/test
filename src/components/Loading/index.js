import React from 'react';
import './style.less';

const Load = (props) => props.isLoad ? (
  <div className="loadingWrap">
    <div className="loading-black-bg">
      <span className="loading-svg">
      </span>
    </div>
  </div>
) : null;

export default Load;
