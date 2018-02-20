import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import * as events from '../../../constants/events';
import omit from 'lodash.omit';

import styles from './InputField.scss';
import * as constants from '../../../constants/general';
import ValidationMessage from '../../FormElements/ValidationMessage/ValidationMessage';

export default class InputField extends Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: React.PropTypes.shape({
      touched: React.PropTypes.bool.isRequired,
      error: React.PropTypes.any
    }),
    forceFocus: PropTypes.bool,
    extraRightPadding: PropTypes.bool,
    shortField: PropTypes.bool,
    rows: PropTypes.string,
    className: PropTypes.string,
    validationMessages: PropTypes.object,
    value: PropTypes.any
  };

  componentDidMount() {
    this.subscription = PubSub.subscribe(events.AUTO_FILL_CHECK_REQUIRED, this.autoFillCheck.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.subscription);
  }

  //check if field value have been changed by browser autofill
  //iOS chrome doesn't detect the changes otherwise and the user will receive a validation error
  autoFillCheck() {
    const { input: { onChange, value }, fieldId } = this.props;
    const currentFieldValue = this.refs[fieldId].value;

    if (currentFieldValue !== value) {
      onChange(currentFieldValue);
    }
  }

  inputClass() {
    const { meta: { error, touched }, forceFocus, extraRightPadding } = this.props;

    if (forceFocus) {
      return styles.forceFocus;
    } else if (extraRightPadding) {
      return `${styles.input} ${styles.extraRightPadding}`;
    }

    return (error && touched) ? styles.inputInvalid : styles.input;
  }

  fieldBlur() {
    const { input: { onBlur } } = this.props;

    PubSub.publish(events.AUTO_FILL_CHECK_REQUIRED);

    onBlur();
  }

  render() {
    const { label, fieldId, shortField, rows, className, validationMessages, meta, input } = this.props;
    const propsToSpread = omit(this.props, 'validationMessages', 'shortField', 'forceFocus', 'extraRightPadding', 'fieldId', 'className', constants.REDUX_FORM_PROPS);

    return (
      <div className={`${shortField ? styles.shortField : styles.root} ${className || ''}`}>
        <label className={styles.label} htmlFor={fieldId}>{label}</label>
        {
          rows ?
            <textarea id={fieldId}
              ref={fieldId}
              className={this.inputClass()}
              {...propsToSpread}
              {...input}
              onBlur={this.fieldBlur.bind(this)}></textarea> :
            <input type="text"
              id={fieldId}
              ref={fieldId}
              className={this.inputClass()}
              {...propsToSpread}
              {...input}
              onBlur={this.fieldBlur.bind(this)} />
        }
        {
          validationMessages ? <ValidationMessage field={meta} messages={validationMessages} /> : null
        }
      </div>
    );
  }
}
