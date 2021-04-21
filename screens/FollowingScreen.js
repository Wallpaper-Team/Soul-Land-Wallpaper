import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GiftedAvatar} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

class FollowingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      users: [],
    };
  }

  // clickEventListener = (item) => {
  //   this.setState({userSelected: item}, () => {
  //     this.setModalVisible(true);
  //   });
  // };

  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }
  _unfollow(item) {
    // database().ref(`Follows/${key}`).update({
    //   isFollowing: false,
    // });
    console.log('Item', item);
  }

  _toggleFollowState = (myUserid, userId) => {
    const key = myUserid + '_' + userId;
    database()
      .ref(`Follows/`)
      .orderByChild('myUserid_userId')
      .equalTo(key)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            database()
              .ref(`Follows/${item.key}/isFollowing`)
              .transaction((state) => !state);
          });
        } else {
          database().ref('Follows').push().set({
            myUserid_userId: key,
            myUserid: myUserid,
            userId: userId,
            isFollowing: true,
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.props.followingUsers}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <GiftedAvatar
                  user={{
                    name: item.name,
                    avatar: item.photoUrl,
                  }}
                  avatarStyle={styles.image}
                  textStyle={{fontSize: 30}}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() =>
                      this._toggleFollowState(this.props.userId, item.uid)
                    }>
                    <Text style={{color: '#ffffff'}}>Bỏ theo dõi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
    ...state.users,
  };
};

export default connect(mapStateToProps, null)(FollowingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eeeeee',
  },
  header: {
    backgroundColor: '#00CED1',
    height: 200,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  userList: {
    flex: 1,
  },

  cardContent: {
    marginLeft: 20,

    alignItems: 'flex-start',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  card: {
   
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: 'white',
   
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },

  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },

  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'tomato',
    alignContent: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    alignSelf: 'center',
  },
});
