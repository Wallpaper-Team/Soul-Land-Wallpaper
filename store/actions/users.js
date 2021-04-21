import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as helper from '../../database/database-helper';

export const SET_USERS = 'SET_USERS';
export const SET_FOLLOWING_USERS = 'SET_FOLLOWING_USERS';
export const SET_FOLLOWER_USERS = 'SET_FOLLOWER_USERS';

export const fetchUsers = () => async (dispatch, getState) => {
  const myUserId = getState().auth.userId;
  database()
    .ref(helper.USERS)
    .orderByChild('name')
    .on('value', async (snapshot) => {
      const listUsers = [];
      snapshot.forEach((item) => {
        if (item.val().uid !== myUserId) {
          listUsers.push(item.val());
        }
      });
      dispatch({type: SET_USERS, users: listUsers});
    });
};

export const fetchFollowingUsers = () => async (dispatch, getState) => {
  const myUserId = getState().auth.userId;
  database()
    .ref(helper.FOLLOWS)
    .orderByChild('myUserid')
    .equalTo(myUserId)
    .on('value', async (snapshot) => {
      const listUsers = [];
      const listItem = [];
      snapshot.forEach((item) => {
        if (item.val().isFollowing) {
          listItem.push(item);
        }
      });
      for (let i = 0; i < listItem.length; i++) {
        const item = listItem[i];
        const user = await helper.lookUpUserFromUserId(item.val().userId);
        listUsers.push(user);
      }
      dispatch({type: SET_FOLLOWING_USERS, followingUsers: listUsers});
    });
};

export const fetchFollowerUsers = () => async (dispatch, getState) => {
  const myUserId = getState().auth.userId;
  database()
    .ref(helper.FOLLOWS)
    .orderByChild('userId')
    .equalTo(myUserId)
    .on('value', async (snapshot) => {
      const listUsers = [];
      const listItem = [];
      snapshot.forEach((item) => {
        if (item.val().isFollowing) {
          listItem.push(item);
        }
      });
      for (let i = 0; i < listItem.length; i++) {
        const item = listItem[i];
        const user = await helper.lookUpUserFromUserId(item.val().myUserid);
        listUsers.push(user);
      }
      dispatch({type: SET_FOLLOWER_USERS, followerUsers: listUsers});
    });
};
