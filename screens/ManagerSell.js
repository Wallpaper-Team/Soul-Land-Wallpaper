import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { firebaseApp } from '../Components/FirebaseConfig';
import {connect} from 'react-redux';
import moment from 'moment';


class ManagerSell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('Orders/')
      .orderByChild('idUserSell')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            address: child.val().address,
            createAt: child.val().createAt,
            idProduct: child.val().idProduct,
            idUser: child.val().idUser,
            idUserSell: child.val().idUserSell,
            phone: child.val().phone,
            productImage: child.val().productImage,
            productName: child.val().productName,
            productPrice: child.val().productPrice,
            userName: child.val().userName,
            userPhoto: child.val().userPhoto,
            location: child.val().location,
            soLuong: child.val().soLuong,
            total: child.val().total,
            district: child.val().district,
            ward: child.val().ward,
          });
        });
        this.setState({
          data: li,
        });

      });
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
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
          if (Notification.productImage) {
            mainContentStyle = styles.mainContent;
            attachment = (
              <Image
                style={styles.attachment}
                source={{uri: Notification.productImage}}
              />
            );
          }
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                this.props.navigation.navigate('SellDetail', {
                  address: Notification.address,
                  createAt: Notification.createAt,
                  idProduct: Notification.idProduct,
                  idUser: Notification.idUser,
                  idUserSell: Notification.idUserSell,
                  phone: Notification.phone,
                  productImage: Notification.productImage,
                  productName: Notification.productName,
                  userName: Notification.userName,
                  userPhoto: Notification.userPhoto,
                  productPrice: Notification.productPrice,
                  key: Notification.key,
                  location: Notification.location,
                  soLuong: Notification.soLuong,
                  total: Notification.total,
                  district: Notification.district,
                  ward: Notification.ward
                })
              }>
              <Image
                source={{uri: Notification.userPhoto}}
                style={styles.avatar}
              />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.userName}</Text>
                    <Text>
                      Đã đặt sản phẩm {Notification.productName} của bạn
                    </Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    {moment(new Date(Notification.createAt)).fromNow()}
                  </Text>
                </View>
                {attachment}
                {/* <Image
                  style={styles.attachment}
                  source={{uri: Notification.productImage}}
                /> */}
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
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ManagerSell);

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
