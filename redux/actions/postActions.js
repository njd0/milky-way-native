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
  [CALL_API]: {
    type: actionTypes.LIKE_POST.PENDING,
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
  [CALL_API]: {
    type: actionTypes.DISLIKE_POST.PENDING,
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
  [CALL_API]: {
    type: actionTypes.FETCH_POSTS.PENDING,
    config: {
      url: `${baseUrl}${getPosts}/${id}`,
      method: "GET",
      params: query,
    },
  },
});

export const fetchComments = (id) => ({
  name: 'HOME',
  [CALL_API]: {
    type: actionTypes.FETCH_COMMENTS.PENDING,
    config: {
      url: `${baseUrl}${getComments}/${id}`,
      method: "GET",
    },
  },
});

export default {
  likePost,
  dislikePost,
  fetchPosts,
  fetchPosts,
};
