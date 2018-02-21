import * as constants from '../constants/general';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case constants.ADD_COMPANY_NAME:
    case constants.ADD_COMPANY_NAME_SUCCESS:
    case constants.ADD_COMPANY_NAME_FAIL:
      if (action.result) {
        return {
          ...state,
          ...action.result.postAdv
        };
      }
      return state;
    case constants.REMOVE_JOB_POST:
    case constants.ADD_JOB_POST:
      return {
        ...state,
        calculateError: null,
        calculateProcessing: true
      };
    case constants.ADD_JOB_POST_FAIL:
    case constants.REMOVE_JOB_POST_FAIL:
      return {
        ...state,
        calculateError: action.error && Array.isArray(action.error.errors) ? Array.map(action.error.errors, e => e) : [action.error.message],
        calculateProcessing: false
      };
    case constants.ADD_JOB_POST_SUCCESS:
    case constants.REMOVE_JOB_POST_SUCCESS:
      return {
        ...state,
        ...action.result,
        calculateProcessing: false
      };
    default:
      return state;
  }
}
