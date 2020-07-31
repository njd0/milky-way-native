import axios from "axios";

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
    const {types, [CALL_API] : apiConfig} = action;
    if (typeof apiConfig === 'undefined') {
      return next(action);
    }

  // TODO validate client requests with logged in session from state
  // getState();

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))
  
  return callApi(apiConfig)
    .then((response) => {
        return next(actionWith({
            type: successType,
            payload: response.data,
        }));
    })
    .catch((error) => {
        return next(actionWith({
            type: failureType,
            payload: error.data,
        }));
    });
};
