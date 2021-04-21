import {SET_CHATROOMS} from '../actions/chats';
import auth from '@react-native-firebase/auth';

const initialState = {
  chatRooms: [],
  buyChatRooms: [],
  sellChatRooms: [],
};

const chatsReducer = (state = initialState, action) => {
  const myUserId = auth().currentUser ? auth().currentUser.uid : null;
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        chatRooms: action.chatRooms,
        buyChatRooms: action.chatRooms.filter(
          (chatRoom) => chatRoom.chatRoom.sellerId !== myUserId,
        ),
        sellChatRooms: action.chatRooms.filter(
          (chatRoom) => chatRoom.chatRoom.sellerId === myUserId,
        ),
      };
    default:
      return state;
  }
};

export default chatsReducer;
