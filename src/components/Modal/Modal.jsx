import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handeleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handeleKeyDown);
  }

  handeleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('натиснули Escape, потрібно закрити модалку');
      this.props.onClose();
    }
  };
  handeleBackdropClick = e => {
    // console.log('натиснули в бекдроп');
    // console.log('currentTarget: ', e.currentTarget);
    // console.log('target: ', e.target);
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handeleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
