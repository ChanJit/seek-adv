import React, { Component, PropTypes } from 'react';
import styles from './Shell.scss';
import { connect } from 'react-redux';

@connect(
  state => state
)
export default class Shell extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    config: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className={styles.layout}>
        <main className={styles.container}>
          {children}
        </main>
      </div>
    );
  }
}
