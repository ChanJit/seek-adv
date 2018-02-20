import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    withRef: PropTypes.any
  };

  render() {
    const { children, withRef, ...rest } = this.props;

    return (
      <form {...rest} ref={withRef}>
        {children}
      </form>
    );
  }
}