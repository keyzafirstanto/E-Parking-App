const initialState = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  id: 0,
  errMsg: '',
  storageIsChecked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, ...action.payload, storageIsChecked: true };
    case 'USER_ERROR':
      return { ...state, errMsg: action.payload };
    default:
      return state;
  }
};

export default reducer;
