import React, { Component, PropTypes } from 'react';
import omit from 'lodash.omit';

import styles from './ErrorMessage.scss';

export default class ErrorMessage extends Component {
  static propTypes = {
    children: PropTypes.node,
    outsideCard: PropTypes.bool,
    extraTopMargin: PropTypes.bool
  };

  containerClass() {
    const {outsideCard} = this.props;

    return (outsideCard) ? styles.outsideCard : styles.root;
  }

  render() {
    const {children, extraTopMargin} = this.props;

    if (!children) {
      return false;
    }

    return (
      <div {...omit(this.props, 'extraTopMargin', 'outsideCard')}
        className={`${this.containerClass()} ${extraTopMargin ? styles.extraTopMargin : ''}`}>
        {
          React.Children.map(children, (element) => {
            const error = element;

            return (
              <div className={styles.errorItem}>
                <i className={styles.icon} aria-hidden="true"></i>
                <span className={styles.errorText}>{error || 'Error'}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}