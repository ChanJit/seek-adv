import React, { Component, PropTypes } from 'react';
import omit from 'lodash.omit';

import styles from './ButtonGroup.scss';
import * as constants from '../../../constants/general';
import ValidationMessage from '../../FormElements/ValidationMessage/ValidationMessage';

export default class ButtonGroup extends Component {
  static propTypes = {
    initialValue: PropTypes.any,
    input: PropTypes.object.isRequired,
    meta: React.PropTypes.shape({
      touched: React.PropTypes.bool.isRequired,
      error: React.PropTypes.any
    }),
    validationMessages: PropTypes.object,
    label: PropTypes.string,
    fieldId: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }))
  };

  constructor(props) {
    const { initialValue } = props;

    super(props);

    this.state = {
      selectedOption: initialValue || null
    };
  }

  handleKeyPress(event) {
    const { input: { onChange } } = this.props;
    const keyCode = (event.which ? event.which : event.keyCode);

    if (keyCode === constants.KEYCODE_ENTER || keyCode === constants.KEYCODE_SPACEBAR) {
      const selectedButtonVal = event.target.dataset.value;

      event.preventDefault();

      this.setState({
        selectedOption: selectedButtonVal
      });

      return onChange(selectedButtonVal);
    }
  }

  handleClick = event => {
    const { input: { onChange } } = this.props;
    const selectedButtonVal = event.target.dataset.value;

    this.setState({
      selectedOption: selectedButtonVal
    });

    return onChange(selectedButtonVal);
  };

  render() {
    const { options, meta, validationMessages, fieldId, label } = this.props;
    const { selectedOption } = this.state;

    return (
      <div>
        <div>
          <label className={styles.label} htmlFor={fieldId}>{label}</label>
        </div>
        <div className={styles.root}
          {...omit(this.props, 'options', 'fieldId', 'validationMessages', constants.REDUX_FORM_PROPS)}
          value={selectedOption}>
          {
            options.map(option =>
              <div key={option.key}
                tabIndex="0"
                role="button"
                id={option.key}
                data-value={option.key}
                className={option.key === selectedOption ? styles.selected : styles.button}
                onKeyPress={this.handleKeyPress.bind(this)}
                onClick={this.handleClick.bind(this)}>{option.label}</div>
            )
          }
        </div>
        <div>
          {
            validationMessages ? <ValidationMessage field={meta} messages={validationMessages} /> : null
          }
        </div>
      </div>
    );
  }
}