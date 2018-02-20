import React, { Component, PropTypes } from 'react';
import styles from './Card.scss';

export default class Card extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;

    return (
      <div {...this.props} className={`${styles.root} ${className || ''}`}>
        {children}
      </div>
    );
  }
}