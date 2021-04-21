import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import { firebaseApp } from '../Components/FirebaseConfig';

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }

  openComment = (
    avatarUser,
    createdAt,
    eventId,
    type,
    userName,
    image,
    idProduct,
    productName,
    productPrice,
    productDescription,
    comment
  ) => {
  
    if (type == 'comment') {
      this.props.navigation.navigate('myCmt', {
        avatarUser: avatarUser,
        createdAt: createdAt,
        eventId: eventId,
        type: type,
        userName: userName,
        image: image,
        idProduct: idProduct,
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        comment: comment
      });
    }else if(type == 'offer'){
      alert("chat voi nguoi mua")
      //  this.props.navigation.navigate('myCmt', {
      //    avatarUser: avatarUser,
      //    createdAt: createdAt,
      //    eventId: eventId,
      //    type: type,
      //    userName: userName,
      //    image: image,
      //    idProduct: idProduct,
      //    productName: productName,
      //    productPrice: productPrice,
      //    productDescription: productDescription,
      //    comment: comment,
      //  });
    }
  };

componentDidMount(){
   firebaseApp
      .database()
      .ref('Notifications/')
      .orderByChild('uid2')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            attachment: child.val().attachment,
            avatarUser: child.val().avatarUser,
            comment: child.val().comment,
            eventId: child.val().eventId,
            idProduct: child.val().idProduct,
            productDescription: child.val().productDescription,
            productName: child.val().productName,
            productPrice: child.val().productPrice,
            type: child.val().type,
            uid1: child.val().uid1,
            uid2: child.val().uid2,
            userName: child.val().userName,
            content: child.val().content,
            createdAt: child.val().createdAt,
          });
        });
        this.setState({
          notifications: li
        });
      });

    }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.notifications}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View />;

          let mainContentStyle;
          if (Notification.attachment) {
            mainContentStyle = styles.mainContent;
            attachment = (
              <Image
                style={styles.attachment}
                source={{uri: Notification.attachment}}
              />
            );
          }
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                this.openComment(
                  Notification.avatarUser,
                  Notification.createdAt,
                  Notification.eventId,
                  Notification.type,
                  Notification.userName,
                  Notification.attachment,
                  Notification.idProduct,
                  Notification.productName,
                  Notification.productPrice,
                  Notification.productDescription,
                  Notification.comment
                );
              }}>
              <Image
                source={{uri: Notification.avatarUser}}
                style={styles.avatar}
              />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.userName}</Text>
                    <Text>{Notification.content}</Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    {moment(new Date(Notification.createdAt)).fromNow()}
                  </Text>
                </View>
                {attachment}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.notifications,
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(NotificationScreen);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
