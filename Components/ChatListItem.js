import database from '@react-native-firebase/database';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GiftedAvatar} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {CHATTING_CHATS, CHATTING_MESSAGES} from '../database/database-helper';

const ChatListItem = (props) => {
  const {chatRoom} = props;
  const [lastMessage, setLastMessage] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const myId = useSelector((state) => state.auth.userId);
  const getLastMessage = async (chatRoomId, messageId) => {
    if (!chatRoomId || !messageId) {
      return;
    }
    database()
      .ref(CHATTING_MESSAGES + `/${chatRoomId}/${messageId}`)
      .on('value', (snapshot) => {
        setLastMessage(snapshot.val());
        if (lastMessage) {
          const res =
            lastMessage.user._id !== myId && chatRoom.chatRoom.unread > 0;
          setIsNew(res);
        }
      });
  };

  useEffect(() => {
    getLastMessage(chatRoom.key, chatRoom.chatRoom.lastMessageId);
  }, [chatRoom]);

  const onClick = () => {
    if (isNew) {
      // console.log('Mark as read');
      database()
        .ref(CHATTING_CHATS + `/${chatRoom.key}/`)
        .update({unread: 0});
      setIsNew(false);
    }
    props.onClickItemHandler();
  };

  if (!chatRoom.otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <GiftedAvatar
            user={{
              name: chatRoom.otherUser.name,
              avatar: chatRoom.otherUser.photoUrl,
            }}
            avatarStyle={styles.avatar}
          />

          <View style={styles.midContainer}>
            <Text style={styles.username}>
              {chatRoom.chatRoom.title
                ? chatRoom.chatRoom.title
                : chatRoom.otherUser.name}
            </Text>
            <Text
              numberOfLines={2}
              style={isNew ? styles.lastMessageNew : styles.lastMessage}>
              {lastMessage
                ? (lastMessage.user._id === myId ? 'You: ' : '') +
                  `${lastMessage.text}`
                : ''}
            </Text>
          </View>
        </View>

        <Text style={isNew ? styles.timeNew : styles.time}>
          {lastMessage && moment(new Date(lastMessage.createdAt)).fromNow()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor: 'red',
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 14,
    color: 'grey',
  },
  lastMessageNew: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'grey',
    position: 'absolute',
    right: 10,
    top: 5,
  },
  timeNew: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    right: 10,
    top: 5,
  },
});

export default ChatListItem;
