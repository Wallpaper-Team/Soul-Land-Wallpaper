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
import { firebaseApp } from '../Components/FirebaseConfig';

class FollowerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
    };
  }

  clickEventListener = (item) => {
    this.setState({userSelected: item}, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _deleteFollowerUser() {
    alert('Are you sure to delete follower user?');
  }

 

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.props.followerUsers}
          keyExtractor={(item) => item.uid}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListener(item);
                }}>
                <Image style={styles.image} source={{uri: item.photoUrl}} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                 
                </View>
              </TouchableOpacity>
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

export default connect(mapStateToProps, null)(FollowerScreen);

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
    backgroundColor: '#00BFFF',
    alignContent: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    alignSelf: 'center',
  },
});
