import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import ChatListItem from '../Components/ChatListItem';
import * as chatActions from '../store/actions/chats';

const ChatRoomsScreen = (props) => {
  const onClick = (item) => {
    props.navigation.navigate('Chat', {
      title: item.chatRoom.title ? item.chatRoom.title : item.otherUser.name,
      uid: item.otherUser.uid,
      chatRoomId: item.key,
    });
  };

  const data = useSelector((state) => state.chats.buyChatRooms);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    setIsLoading(true);
    dispatch(chatActions.fetchChatRooms()).then(setIsLoading(false));
  }, []);

  useEffect(() => {
    if (data.length === 0) fetchData();
  }, [fetchData]);

  const [searchKey, setSearchKey] = useState();

  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        round="true"
        onChangeText={(key) => setSearchKey(key)}
        value={searchKey}
        lightTheme="true"
        backgroundColor="transparent"
      />
    );
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          style={styles.flatlist}
          data={
            !searchKey
              ? data
              : data.filter(
                  (item) =>
                    (item.chatRoom.title &&
                      item.chatRoom.title.includes(searchKey)) ||
                    item.otherUser.name.includes(searchKey),
                )
          }
          ListHeaderComponent={renderSearchBar}
          renderItem={({item, index}) => {
            return (
              <ChatListItem
                key={(item) => item.id + index}
                chatRoom={item}
                onClickItemHandler={() => onClick(item)}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    width: '100%',
  },
  searchbar: {
    padding: 10,
    borderRadius: 10,
  },
});

export default ChatRoomsScreen;
