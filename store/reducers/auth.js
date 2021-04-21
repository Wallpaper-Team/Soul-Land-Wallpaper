import {AUTHENTICATE, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  userName: null,
  userEmail: null,
  userPhone: null,
  userPhoto: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        userPhone: action.userPhone,
        userEmail: action.userEmail,
        userPhoto: action.userPhoto,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
