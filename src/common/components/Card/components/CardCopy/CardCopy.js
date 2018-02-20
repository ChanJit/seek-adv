import React, { Component, PropTypes } from 'react';
import styles from './CardCopy.scss';

export default class CardCopy extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div {...this.props} className={styles.root}>
        {children}
      </div>
    );
  }
}