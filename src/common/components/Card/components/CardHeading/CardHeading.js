import React, { Component, PropTypes } from 'react';
import omit from 'lodash.omit';

import styles from './CardHeading.scss';

export default class CardHeading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    removeTopMargin: PropTypes.bool,
    className: PropTypes.string
  };

  render() {
    const { children, removeTopMargin, className } = this.props;

    return (
      <h2 {...omit(this.props, 'removeTopMargin')}
        className={`${removeTopMargin ? styles.removeTopMargin : styles.root} ${className}`}>
        {children}
      </h2>
    );
  }
}