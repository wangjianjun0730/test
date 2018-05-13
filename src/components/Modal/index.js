import React from 'react';
import ReactDOM from 'react-dom';
import ModalInstance from './modal';

class Modal extends React.Component {
  componentDidUpdate() {
    const props = this.props;
    let modalContainer = null;
    if(props.visible) {
      modalContainer = document.createElement('div');
      document.body.style.overflow = 'hidden';
      modalContainer.setAttribute('id', 'docModalWrap');
      document.body.appendChild(modalContainer);
      ReactDOM.render(<ModalInstance {...props}/>, modalContainer);
    } else {
      document.body.style.overflow = '';
      modalContainer = document.getElementById('docModalWrap');
      if(!!modalContainer) {
        ReactDOM.unmountComponentAtNode(modalContainer);
        modalContainer.remove && modalContainer.remove();
      }
    }
  }

  render() {
    return null;
  }
}

export default Modal;
