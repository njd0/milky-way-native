import config from "../../config.json";
import {CALL_API} from "../middleware/api";

const {baseUrl, postLike, getComments, getPosts} = config.services.milkyWay;

const _asyncTypes = (actionType) => {
  return ([ 'PENDING', 'SUCCESS', 'ERROR' ]).reduce((types, result) => {
    types[result] = `${actionType}.${result}`;
    return types;
  }, {});
};

export const actionTypes = {
  LIKE_POST:      _asyncTypes('LIKE_POST'),
  DISLIKE_POST:   _asyncTypes('DISLIKE_POST'),
  FETCH_POSTS:    _asyncTypes('FETCH_POSTS'),
  FETCH_COMMENTS: _asyncTypes('FETCH_COMMENTS'),
};
console.log("ACTION TYPES", actionTypes);

// TODO replace "name" with "reducerName"
// TODO pass in reducerName to action
export const likePost = (id) => ({
  name: 'HOME',
  type: actionTypes.LIKE_POST.PENDING,
  [CALL_API]: {
    
    config: {
      url: `${baseUrl}${postLike}/${id}`,
      method: "POST",
      data: {
        liked: true,
      },
    },
  },
});

export const dislikePost = (id) => ({
  name: 'HOME',
  type: actionTypes.DISLIKE_POST.PENDING,
  [CALL_API]: {
    
    config: {
      url: `${baseUrl}${postLike}/${id}`,
      method: "POST",
      data: {
        liked: false,
      },
    },
  },
});

export const fetchPosts = (query) => ({
  name: 'HOME',
  type: actionTypes.FETCH_POSTS.PENDING,
  [CALL_API]: {
    config: {
      url: `${baseUrl}${getPosts}`,
      method: "GET",
      params: query,
    },
  },
});

export const fetchComments = (id) => ({
  name: 'HOME',
  type: actionTypes.FETCH_COMMENTS.PENDING,
  [CALL_API]: {
    
    config: {
      url: `${baseUrl}${getComments}/${id}`,
      method: "GET",
    },
  },
});

// Login
export const login = (trueFalse) => ({
    type: 'LOGIN',
    trueFalse: trueFalse,
});

// export default {
//   likePost,
//   dislikePost,
//   fetchPosts,
//   fetchPosts,
// };
