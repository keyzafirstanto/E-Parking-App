const initialState = {
  ticketData: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...state, ...action.payload };
    case 'USER_CHECKOUT':
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default reducers;
