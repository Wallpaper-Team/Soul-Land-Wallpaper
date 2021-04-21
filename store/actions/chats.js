import database from '@react-native-firebase/database';
import {CHATTING_CHATS} from '../../database/database-helper';
import * as helper from '../../database/database-helper';
import auth from '@react-native-firebase/auth';

export const SET_CHATROOMS = 'SET_CHATROOMS';

export const fetchChatRooms = () => async (dispatch) => {
  const myUserId = auth().currentUser.uid;
  database()
    .ref(CHATTING_CHATS)
    .orderByChild('timestamp')
    .on('value', async (snapshot) => {
      const listChatRoom = [];
      snapshot.forEach((item) => {
        listChatRoom.push(item);
      });
      const listItem = [];
      for (let i = 0; i < listChatRoom.length; i++) {
        const item = listChatRoom[i];
        const members = await helper.lookUpMembersInChatRoomWithId(item.key);
        if (members.uid1 === myUserId || members.uid2 === myUserId) {
          const otherUser = await (members.uid1 === myUserId
            ? helper.lookUpUserFromUserId(members.uid2)
            : helper.lookUpUserFromUserId(members.uid1));
          listItem.push({
            chatRoom: item.val(),
            otherUser: otherUser,
            key: item.key,
          });
        }
      }
      dispatch({type: SET_CHATROOMS, chatRooms: listItem.reverse()});
    });
};
