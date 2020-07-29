const initialState = {
  counter: 0,
  posts: [],
};

// Reducers (Modifies The State And Returns A New State)
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return {
        ...state,
        // TODO REPLACE WITH API CALL
        posts: [{
          id: '0',
          username: 'noah davidson',
          imageSrc: 'https://via.placeholder.com/256x144',
          liked: true,
        },
        {
          id: '1',
          username: 'chococowmilk',
          imageSrc: 'https://via.placeholder.com/256x144',
          liked: false,
        }],
      }
    }
    case 'LIKE_POST': {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }
    case 'DISLIKE_POST': {
      return {
        ...state,
        counter: state.counter - 1,
      }
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default homeReducer;
