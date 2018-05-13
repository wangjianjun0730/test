import React from 'react';
import './style.less';
const ModalInstance = (props) => {
  const title = props.title || '';
  const content = props.content || '';

  const confirm = props.confirm || {};
  const confirmTxt = confirm.text || '';
  const confirmCall = confirm.callback || null;

  const cancel = props.cancel || {};
  const cancelTxt = cancel.text || '';
  const cancelCall = cancel.callback || null;

  return (
    <div className="Modal">
      <div className="bg"> </div>
      <div className="modal-container">
        <div className="modal-title">{title}</div>
        <div className="modal-body">
          <div className="modal-content">
            <span className="modal-content-txt">{content}</span>
          </div>
          <div className="modal-config">
            <div className="modal-confirm modal-btn" onClick={confirmCall}>{confirmTxt}</div>
            <div className="modal-cancel modal-btn" onClick={cancelCall}>{cancelTxt}</div>
          </div>
        </div>
        <div className="modal-quit" onClick={cancelCall}>
        </div>
      </div>
    </div>
  )
};
export default ModalInstance;
