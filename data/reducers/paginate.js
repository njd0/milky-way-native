const paginate = ({ types }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  const [ requestType, successType, failureType ] = types

  return (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    data: [],
  }, action) => {
      console.log("ACTION PAGINATE", action)
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          data: [
              ...state.data,
              ...action.payload,
          ],
        //   nextPageUrl: action.response.nextPageUrl,
        //   pageCount: state.pageCount + 1
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }
}

export default paginate
