import axios from "axios";
import { actionTypes } from "../actions";

export const CALL_API = 'Call API';

// TODO use this for paginating posts
// Extracts the next page URL from Github API response.
// const getNextPageUrl = response => {
//     const link = response.headers.get('link')
//     if (!link) {
//       return null
//     }
  
//     const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
//     if (!nextLink) {
//       return null
//     }
  
//     return nextLink.trim().split(';')[0].slice(1, -1)
//   }
  
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (config) => {
    console.log("CALLED MY API")
    return axios(config);

    // TODO add in for pagination
    // .then(response => {
    //      const nextPageUrl = getNextPageUrl(response)
    //      return Object.assign({},
    //          response,
    //          { nextPageUrl }
    //      );
    // })
}

/**
 * API Middlware
 */
export default ({ getState }) => (next) => async (action) => {
    const callAPI = action[CALL_API];
    console.log("callAPI", callAPI)
    if (typeof callAPI === 'undefined') {
      return next(action)
    }

    const {type, name} = action;
    console.log("type", type)
  
    const {config} = callAPI;

  // TODO validate client requests with logged in session from state
  // getState();

  const [ rootType ] = type.split('.');
  const baseActionType = actionTypes[rootType];

  next(action);
  
  return callApi(config)
    .then((response) => {
        console.log("baseActionType", baseActionType.SUCCESS)
        console.log("RESPONSE", response)
        return next({
            name,
            type: baseActionType.SUCCESS,
            payload: response.data,
        });
    })
    .catch((error) => {
        return next({
            name,
            type: baseActionType.ERROR,
            payload: error.data,
        });
    });
};
