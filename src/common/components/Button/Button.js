import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    secondary: PropTypes.bool,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    insideCard: PropTypes.bool,
    isExternal: PropTypes.bool,
    className: PropTypes.string
  };

  render() {
    let {isExternal, href, children, secondary, insideCard, className, ...propsToSpread} = this.props;
    let theme = secondary ? styles.secondary : styles.primary;
    className = className || '';

    if (insideCard) {
      theme += ' ' + styles.insideCard;
    }

    if (isExternal) {
      return (
        <a href={ href }
          className={theme + ' ' + className}
          {...propsToSpread}>
          {children}
        </a>
      );
    }

    if (href) {
      return (
        <Link to={{ pathname: href }}
          className={theme + ' ' + className}
          {...propsToSpread}>
          {children}
        </Link>
      );
    }

    return (
      <button {...propsToSpread}
        className={theme + ' ' + className}>
        {children}
      </button>
    );
  }
}