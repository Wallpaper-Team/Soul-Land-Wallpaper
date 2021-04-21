import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {GiftedAvatar} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import UserTopNavigator from '../navigation/UserTopNavigator';
import * as authActions from '../store/actions/auth';
import * as usersActions from '../store/actions/users';
import {ButtonGroup} from 'react-native-elements';
import ExpandScreen from './ExpandScreen';

const UserScreen = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const userName = useSelector((state) => state.auth.userName);
  const userPhoto = useSelector((state) => state.auth.userPhoto);
  const email = useSelector((state) => state.auth.userEmail);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.users.users);
  const buttons = ['Hello', 'World', 'Buttons'];

  const fetchUserData = async () => {
    await dispatch(usersActions.fetchUsers());
    await dispatch(usersActions.fetchFollowerUsers());
    await dispatch(usersActions.fetchFollowingUsers());
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const updateIndex = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: userPhoto,
            }}
          />
          <Text style={styles.username}>{userName}</Text>
          <Text style={styles.name}>{email}</Text>
        </View>
      </View>
      <ExpandScreen {...props} />
    </View>
    // <View style={styles.container}>
    //   <View style={styles.card}>
    //     <GiftedAvatar
    //       user={{name: userName, avatar: userPhoto}}
    //       avatarStyle={styles.image}
    //     />

    //     <View style={{marginTop: 10}}>
    //       <Text style={styles.title}>{userName}</Text>
    //       <Text style={styles.location}>{email}</Text>
    //     </View>

    //     {/* <TouchableOpacity onPress={logoutHandler}>
    //       <Text>Logout</Text>
    //     </TouchableOpacity> */}
    //   </View>
    //   {/* <ButtonGroup
    //     onPress={()=> updateIndex()}
    //     buttons={buttons}
    //     containerStyle={{height: 100}}
    //   /> */}
    //   {/* <UserTopNavigator /> */}
    //   <ExpandScreen {...props} />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'tomato',
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FF6347',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: '#EE82EE',
    marginLeft: 4,
  },
  btn: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
  },
  body: {
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#ffffff',
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  name: {
    color: '#ffffff',
    fontSize: 12,
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default UserScreen;
