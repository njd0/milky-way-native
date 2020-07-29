export const LIKE_POST = 'LIKE_POST';
export const likePost = (id : string) => ({
    type: 'LIKE_POST',
    name: 'HOME',
    id,
  });

export const DISLIKE_POST = 'DISLIKE_POST';
export const dislikePost = (id : string) => ({
  type: 'DISLIKE_POST',
  name: 'HOME',
  id,
});

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = () => ({
  type: 'FETCH_POSTS',
  name: 'HOME',
});

// TODO
// import actions constants where used
// use persistent storage for posts
// make action to invalidate posts cache