import config from "../../config.json";
import postActions from "./postActions";

const {baseUrl, postLike, getComments, getPosts} = config.services.milkyWay;

const loadPosts = (nextPage) => (dispatch, getState) => {
    const {
      nextPageUrl = `${baseUrl}${getPosts}`,
      pageCount = 0,
    } = getState().home.posts || {};
  
    if (pageCount > 0 && !nextPage) {
      return;
    }

    const query = {
        // TODO add query for home posts
    };
  
    return dispatch(postActions.fetchPosts(query, nextPageUrl));
}

export default {
  loadPosts,
};
  