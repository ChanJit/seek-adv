import React, { Component, PropTypes } from 'react';
import styles from './ValidationMessage.scss';

export default class ValidationMessage extends Component {
  static propTypes = {
    field: React.PropTypes.shape({
      touched: React.PropTypes.bool.isRequired,
      error: React.PropTypes.any
    }),
    text: PropTypes.string,
    messages: PropTypes.object,
    extraTopMargin: PropTypes.bool
  };

  render() {
    const {field: {touched, error}, text, extraTopMargin, messages} = this.props;
    const errorText = (messages) ? messages[error] : text;

    if (!touched || !error) {
      return false;
    }

    return (
      <div className={extraTopMargin ? styles.extraTopMargin : styles.root}>
        <i className={styles.icon} aria-hidden="true"></i>
        <span className={styles.errorText}>{errorText || error}</span>
      </div>
    );
  }
}