import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export const fetchNotifications = () => async (dispatch) => {
  const myUserId = auth().currentUser.uid;
 // console.log('Uid', myUserId);
  database()
    .ref('Notifications')
    .orderByChild('uid2')
    .equalTo(myUserId)
    .on('value', async (snapshot) => {
      const listItem = [];
      snapshot.forEach((item) => {
        listItem.push(item.val());
      });
      dispatch({type: SET_NOTIFICATIONS, notifications: listItem.reverse()});
    });
};
