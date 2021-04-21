import {
  SET_FOLLOWER_USERS,
  SET_FOLLOWING_USERS,
  SET_USERS,
} from '../actions/users';

const initialState = {
  users: [],
  followingUsers: [],
  followerUsers: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_FOLLOWING_USERS:
      return {
        ...state,
        followingUsers: action.followingUsers,
      };
    case SET_FOLLOWER_USERS:
      return {
        ...state,
        followerUsers: action.followerUsers,
      };
    default:
      return state;
  }
};

export default usersReducer;
