import React, { Component, PropTypes } from 'react';
import omit from 'lodash.omit';

import styles from './ScreenHeading.scss';

export default class ScreenHeading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    subHeading: PropTypes.string
  };

  subHeading = () => {
    const {subHeading} = this.props;

    if (subHeading) {
      return (
        <h2 className={styles.subHeading}>{subHeading}</h2>
      );
    }
  };

  render() {
    const {children} = this.props;

    return (
      <div className={styles.root}>
        <h1 {...omit(this.props, 'subHeading')}>
          {children}
        </h1>
        {this.subHeading()}
      </div>
    );
  }
}