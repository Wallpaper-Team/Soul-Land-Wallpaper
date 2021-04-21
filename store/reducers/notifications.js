import {SET_NOTIFICATIONS} from '../actions/notifications';

const initialState = {
  notifications: [],
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        notifications: action.notifications,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
