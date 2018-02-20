import React, { Component, PropTypes } from 'react';
import omit from 'lodash.omit';

import styles from './SubHeading.scss';

export default class SubHeading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    outsideCard: PropTypes.bool,
    extraTopMargin: PropTypes.bool
  };

  render() {
    const { children, outsideCard, extraTopMargin } = this.props;

    return (
      <div className={extraTopMargin ? styles.extraTopMargin : ''}>
        <h2 {...omit(this.props, 'outsideCard', 'extraTopMargin')}
          className={ outsideCard ? styles.outsideCard : styles.insideCard }>
          {children}
        </h2>
      </div>
    );
  }
}