import database from '@react-native-firebase/database';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import * as helper from '../database/database-helper';
import {CHATTING_MESSAGES} from '../database/database-helper';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const uid = props.navigation.getParam('uid', 'uid');
  const idProduct = props.navigation.getParam('idProduct', '');
  const [otherUser, setOtherUser] = useState(null);
  const myId = useSelector((state) => state.auth.userId);
  const myPhotoUrl = useSelector((state) => state.auth.userPhoto);
  const myName = useSelector((state) => state.auth.userName);
  const chatRoomId = props.navigation.getParam('chatRoomId', 'chatRoomId');

  const fetchUser = useCallback(
    async (uid) => {
      const user = await helper.lookUpUserFromUserId(uid);
      setOtherUser(user);
      if (user && idProduct) {
        const product = await helper.lookUpProductFromId(idProduct);
        if (product) {
          const message = {
            user: {
              _id: uid,
              name: user.name,
              avatar: user.photoUrl,
            },
            text: 'Bạn đang quan tâm đến sản phẩm của chúng tôi?',
            image: product.imageUrl1,
            createdAt: new Date(),
          };
          onSend([message]);
        }
      }
    },
    [setOtherUser],
  );

  useEffect(() => {
    fetchUser(uid);
  }, []);
  useEffect(() => {
    const onChildAdd = database()
      .ref(CHATTING_MESSAGES + `/${chatRoomId}`)
      .orderByChild('createdAt')
      .on('child_added', (snapshot) => {
        const message = {
          ...snapshot.val(),
          createdAt: new Date(snapshot.val().createdAt),
        };
        //update unread message in chat room
        const chatRoomRef = database().ref(
          helper.CHATTING_CHATS + `/${chatRoomId}/`,
        );
        if (message.user._id !== myId) {
          chatRoomRef.update({
            unread: 0,
          });
        } else {
          chatRoomRef.child('unread').transaction((unread) => {
            if (unread) {
              return unread + 1;
            }
            return 1;
          });
        }
        appendMessage(message);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(CHATTING_MESSAGES + `/${chatRoomId}`)
        .off('child_added', onChildAdd);
  }, []);

  const appendMessage = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  const onSend = (messages = []) => {
    const writes = messages.map((m) => {
      const newRef = database()
        .ref(CHATTING_MESSAGES + `/${chatRoomId}`)
        .push();
      newRef.set({
        ...m,
        createdAt: new Date(m.createdAt).getTime(),
      });
      //update last message in chat room
      const chatRoomRef = database().ref(
        helper.CHATTING_CHATS + `/${chatRoomId}/`,
      );
      chatRoomRef.update({
        timestamp: new Date(m.createdAt).getTime(),
        lastMessageId: newRef.key,
      });
    });
    Promise.all(writes);
  };

  if (!otherUser)
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: myId,
        name: myName,
        avatar: myPhotoUrl,
      }}
    />
  );
};

ChatScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'User'),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
