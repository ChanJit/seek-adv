import React, { Component, PropTypes } from 'react';
import styles from './FieldHelpMessage.scss';

export default class FieldHelpMessage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
        { children }
      </div>
    );
  }
}