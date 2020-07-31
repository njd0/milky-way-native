import config from "../../config.json";
import {CALL_API} from "../middleware/api";

const {baseUrl, postLike, getComments} = config.services.milkyWay;

const _asyncTypes = (actionType) => {
  return (['PENDING', 'SUCCESS', 'ERROR'])
    .map((status) => `${actionType}_${status}`);
};

const actionTypes = {
  LIKE_POST:      _asyncTypes('LIKE_POST'),
  DISLIKE_POST:   _asyncTypes('DISLIKE_POST'),
  FETCH_POSTS:    _asyncTypes('FETCH_POSTS'),
  FETCH_COMMENTS: _asyncTypes('FETCH_COMMENTS'),
};

const fetchPosts = (query, nextPageUrl) => ({
  name: 'HOME',
  types: actionTypes.FETCH_POSTS,
  [CALL_API]: {
    url: nextPageUrl,
    method: "GET",
    params: query,
  },
});

const fetchComments = (id) => ({
  name: 'HOME',
  types: actionTypes.FETCH_COMMENTS,
  [CALL_API]: {
    url: `${baseUrl}${getComments}/${id}`,
    method: "GET",
  },
});

const likePost = (id) => ({
  name: 'HOME',
  types: actionTypes.LIKE_POST,
  [CALL_API]: {
    url: `${baseUrl}${postLike}/${id}`,
    method: "POST",
    data: {
      liked: true,
    },
  },
});

const dislikePost = (id) => ({
  name: 'HOME',
  type: actionTypes.DISLIKE_POST,
  [CALL_API]: {
    url: `${baseUrl}${postLike}/${id}`,
    method: "POST",
    data: {
      liked: false,
    },
  },
});

export default {
  actionTypes,
  fetchPosts,
  fetchComments,
  likePost,
  dislikePost,
};
