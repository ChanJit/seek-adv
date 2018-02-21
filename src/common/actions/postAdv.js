import * as consts from '../constants/general';
import { getResponse } from '../helpers/responseData';

async function getTotal(postAdv) {
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

      const result = await getTotal(postAdv);

      return { ...postAdv, ...result };
    }
  };
}

export function removeJobPost(index) {
  return {
    types: [
      consts.REMOVE_JOB_POST,
      consts.REMOVE_JOB_POST_SUCCESS,
      consts.REMOVE_JOB_POST_FAIL
    ],
    promise: async (dispatch, getState) => {
      const state = getState();
      const { postAdv } = state;
      if (postAdv.advs.length > index) {
        postAdv.advs.splice(index, 1);
      }

      const result = await getTotal(postAdv);

      return { ...postAdv, ...result };
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
