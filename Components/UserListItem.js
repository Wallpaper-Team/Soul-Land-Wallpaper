import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {GiftedAvatar} from 'react-native-gifted-chat';

class UserListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlowing: false,
      userId: ''
    };
  }

  componentDidMount() {
    this._checkFollowState(this.props.userId, this.props.item.uid);
  }

  _checkFollowState = (myUserid, userId) => {
    const key = myUserid + '_' + userId;
    database()
      .ref(`Follows/`)
      .orderByChild('myUserid_userId')
      .equalTo(key)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            if (item.val()) {
              this.setState({isFlowing: item.val().isFollowing});
            }
          });
        }
      });
  };

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
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ProfileFriend', {
              userId: this.props.item.uid,
              userName: this.props.item.name,
              userPhoto: this.props.item.photoUrl,
            })
          }>
          <GiftedAvatar
            user={{
              name: this.props.item.name,
              avatar: this.props.item.photoUrl,
            }}
            avatarStyle={styles.image}
            textStyle={{fontSize: 30}}
          />
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <TouchableOpacity
          // style = {{backgroundColor: 'tomato'}}
            onPress={() => {
              this._toggleFollowState(this.props.userId, this.props.item.uid);
            }}>
            {this.state.isFlowing ? (
              <Text style={styles.followButton}>Đang theo dõi</Text>
            ) : (
              <Text style={styles.followButton}>Theo dõi</Text>
            )}
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, null)(UserListItem);

const styles = StyleSheet.create({
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
  shareBtn: {
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderColor: '#ffffff',
    borderWidth: 0.5,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexBasis: '46%',
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
