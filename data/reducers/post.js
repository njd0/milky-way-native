import { combineReducers } from 'redux';
import paginate from './paginate';
import postActions from "../actions/postActions";

const post = combineReducers({
  posts: paginate({
    types: postActions.actionTypes.FETCH_POSTS,
  }),
  comments: paginate({
    types: postActions.actionTypes.FETCH_COMMENTS,
  }),
})

export default post;
