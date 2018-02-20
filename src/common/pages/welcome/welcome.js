import React, { Component, PropTypes } from 'react';
import styles from './welcome.scss';
import { reduxForm, isSubmitting, Field } from 'redux-form';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import * as postAdvActions from '../../actions/postAdv';
import * as validationConstants from '../../constants/validation';

import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import InputField from '../../components/FormElements/InputField/InputField';

const validate = data => {
  const errors = {};
  const fieldsKey = ['companyName'];

  fieldsKey.map(field => {
    if (!data[field]) {
      errors[field] = validationConstants.REQUIRED_VALIDATION_ERROR;
    }
  });

  return errors;
};

@connect(
  state => ({
    submitting: isSubmitting('welcome')(state),
    ...state
  }),
  {
    pushRoute: routeActions.push,
    addCompanyName: postAdvActions.addCompanyName
  }
)

class Welcome extends Component {

  static propTypes = {
    pushRoute: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    submitting: PropTypes.bool
  };

  componentWillMount() {
  }

  async onNext(companyName) {
    const { pushRoute, addCompanyName } = this.props;

    addCompanyName(companyName);

    await pushRoute({ pathname: 'addJobPost' });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const validationMessages = validationConstants.SEEK_ADV_VALIDATION_MESSAGES.WELCOME;

    return (
      <Form onSubmit={handleSubmit(this.onNext.bind(this))} >
        <ScreenHeading>Welcome</ScreenHeading>
        <Card>
          <div className={styles.seekAdvContainer}>
            <Field
              component={InputField}
              name="companyName"
              label="Company Name"
              fieldId="companyName"
              validationMessages={validationMessages.COMPANY_NAME} />

            <Button className={styles.seekAdvButton} disabled={submitting} type="submit">Next</Button>
          </div>
        </Card>
      </Form>
    );
  }
}

export default reduxForm({ form: 'welcome', validate })(Welcome);