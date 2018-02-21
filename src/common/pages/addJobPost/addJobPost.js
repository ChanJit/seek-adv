import React, { Component, PropTypes } from 'react';
import styles from './addJobPost.scss';
import { reduxForm, isSubmitting, Field } from 'redux-form';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import * as postAdv from '../../actions/postAdv';
import * as validationConstants from '../../constants/validation';

import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import InputField from '../../components/FormElements/InputField/InputField';
import ButtonGroup from '../../components/FormElements/ButtonGroup/ButtonGroup';

const validate = data => {
  const errors = {};
  const fieldsKey = ['advType', 'jobTitle', 'jobDescription'];

  fieldsKey.map(field => {
    if (!data[field]) {
      errors[field] = validationConstants.REQUIRED_VALIDATION_ERROR;
    }
  });

  return errors;
};

@connect(
  state => ({
    submitting: isSubmitting('add-job-post')(state),
    ...state
  }),
  {
    pushRoute: routeActions.push,
    addJobPost: postAdv.addJobPost,
    removeJobPost: postAdv.removeJobPost
  }
)

class AddJobPost extends Component {

  static propTypes = {
    removeJobPost: PropTypes.func.isRequired,
    addJobPost: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    submitting: PropTypes.bool
  };

  componentWillMount() {
    const { postAdv: { companyName }, pushRoute } = this.props;
    if (!companyName) {
      pushRoute('welcome');
    }
  }

  async onAdd(jobPost) {
    const { addJobPost } = this.props;
    await addJobPost(jobPost);
  }

  async onRemove(index) {
    const { removeJobPost } = this.props;
    await removeJobPost(index);
  }

  async onBack() {
    const { pushRoute } = this.props;

    await pushRoute('welcome');
  }

  async onJobTypeChange() {
  }

  render() {
    const { postAdv: { companyName, advs, calculateProcessing, calculateError, grandTotal, advTypeMap }, handleSubmit, submitting } = this.props;
    const validationMessages = validationConstants.SEEK_ADV_VALIDATION_MESSAGES.ADD_JOB_POST;

    const jobTypeOptions = [{ label: 'Classic', key: 'classic' }, { label: 'Stand Out', key: 'standout' }, { label: 'Premium', key: 'premium' }];

    // if (calculateProcessing) {
    //   return (<Spinner delay={0} size="80" fullPageOverlay />);
    // }

    return (
      <div>
        <Form onSubmit={handleSubmit(this.onAdd.bind(this))} >
          <ScreenHeading>Job Post For {companyName}</ScreenHeading>
          <Card>
            <div className={styles.seekAdvContainer}>
              <Field
                component={ButtonGroup}
                options={jobTypeOptions}
                onChange={this.onJobTypeChange.bind(this)}
                name="advType"
                label="Advertisement Type"
                fieldId="advType"
                validationMessages={validationMessages.ADV_TYPE} />

              <Field
                component={InputField}
                name="jobTitle"
                label="Job Title"
                fieldId="jobTitle"
                validationMessages={validationMessages.JOB_TITLE} />

              <Field
                component={InputField}
                name="jobDescription"
                label="Job Description"
                fieldId="jobDescription"
                validationMessages={validationMessages.JOB_DESCRIPTION} />

              <Button className={styles.seekAdvButton} disabled={submitting} type="submit">Add</Button>
              <Button className={styles.seekAdvButton} secondary onClick={this.onBack.bind(this)}>Back</Button>

              <div>
                {
                  grandTotal ? <span className={styles.total}>Total Fees : {grandTotal}</span> : null
                }
              </div>
            </div>
          </Card>
        </Form>
        {
          !calculateError && advs ? advs.map((adv, index) =>
            <Card key={index} className={styles.jobAdvs}>
              <div>
                <span className={styles.jobTitle}>{adv.jobTitle} ({adv.advType})</span> {
                  advTypeMap[adv.advType].currentUnitPrice !== advTypeMap[adv.advType].originalPrice ?
                    <span>
                      <strike><span className={styles.originalPriceWithStrike}>{advTypeMap[adv.advType].originalPrice}</span></strike> <span className={styles.discountPrice}>{advTypeMap[adv.advType].currentUnitPrice}</span>
                    </span> :
                    <span className={styles.originalPrice}>{advTypeMap[adv.advType].originalPrice}</span>
                }
                <Button className={styles.seekAdvButton} secondary onClick={this.onRemove.bind(this, index)}> Delete </Button>
                <br /><hr />
                <span className={styles.jobDescription}>{adv.jobDescription}</span>
              </div>
            </Card>) : null
        }
        <ErrorMessage className={styles.errorMessage}>
          {calculateError ? (calculateError || []).map((error, index) => <span key={index}>{error}</span>) : null}
        </ErrorMessage>
      </div>
    );
  }
}

export default reduxForm({ form: 'add-job-post', validate })(AddJobPost);