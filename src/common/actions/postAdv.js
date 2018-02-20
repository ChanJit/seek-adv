import * as consts from '../constants/general';
import { getResponse } from '../helpers/responseData';

export function addJobPost(jobPost) {
  return {
    types: [
      consts.ADD_JOB_POST,
      consts.ADD_JOB_POST_SUCCESS,
      consts.ADD_JOB_POST_FAIL
    ],
    promise: async (dispatch, getState) => {
      const state = getState();
      const { postAdv } = state;
      if (postAdv.advs) {
        postAdv.advs.push(jobPost);
      } else {
        postAdv.advs = [jobPost];
      }
      return postAdv;
    }
  };
}
export function addCompanyName(companyName) {
  return {
    types: [
      consts.ADD_COMPANY_NAME,
      consts.ADD_COMPANY_NAME_SUCCESS,
      consts.ADD_COMPANY_NAME_FAIL
    ],
    promise: async (dispatch, getState) => {
      const state = getState();
      const { postAdv } = state;

      postAdv.advs = undefined;
      postAdv.grandTotal = undefined;
      return postAdv.companyName = companyName.companyName;
    }
  };
}

export function getTotal() {
  return {
    types: [
      consts.CALCULATE_ADV_PRICE,
      consts.CALCULATE_ADV_PRICE_SUCCESS,
      consts.CALCULATE_ADV_PRICE_FAIL
    ],
    promise: async (dispatch, getState, fetch) => {
      const state = getState();
      const { postAdv } = state;

      const responsePromise = await fetch('http://localhost:8000/api/purchaseAdv', {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(postAdv)
      });

      const response = await getResponse(responsePromise);

      return response;
    }
  };
}