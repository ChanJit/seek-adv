import React, { Component, PropTypes } from 'react';
import styles from './Spinner.scss';
//reference: http://tobiasahlin.com/spinkit/

const DEFAULT_DELAY = 500;
let renderDelay;

export default class Spinner extends Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    fullPageOverlay: PropTypes.bool,
    delay: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      delayedLoad: true
    };
  }

  componentDidMount = () => {
    const { delay } = this.props;
    const delayRender = (delay || delay === 0) ? delay : DEFAULT_DELAY;

    renderDelay = setTimeout(function() {
      this.setState({
        delayedLoad: false
      });
    }.bind(this), delayRender);
  };

  componentWillUnmount = () => {
    if (renderDelay) {
      clearTimeout(renderDelay);
    }
  };

  render() {
    const {fullPageOverlay, size} = this.props;
    const {delayedLoad} = this.state;

    const sizeString = (size.indexOf('px') === -1) ? size + 'px' : size;

    const sizeStyle = {
      width: sizeString,
      height: sizeString
    };

    if (delayedLoad) {
      return false;
    }

    return (
      <div className={fullPageOverlay ? styles.fullPageOverlay : ''}>
        <div className={styles.fadingCircle} style={sizeStyle}>
          <div className={`${styles.circle}`}></div>
          <div className={`${styles.circle2} ${styles.circle}`}></div>
          <div className={`${styles.circle3} ${styles.circle}`}></div>
          <div className={`${styles.circle4} ${styles.circle}`}></div>
          <div className={`${styles.circle5} ${styles.circle}`}></div>
          <div className={`${styles.circle6} ${styles.circle}`}></div>
          <div className={`${styles.circle7} ${styles.circle}`}></div>
          <div className={`${styles.circle8} ${styles.circle}`}></div>
          <div className={`${styles.circle9} ${styles.circle}`}></div>
          <div className={`${styles.circle10} ${styles.circle}`}></div>
          <div className={`${styles.circle11} ${styles.circle}`}></div>
          <div className={`${styles.circle12} ${styles.circle}`}></div>
        </div>
      </div>
    );
  }
}
