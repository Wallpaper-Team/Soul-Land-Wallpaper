import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {firebaseApp} from '../Components/FirebaseConfig';
import {connect} from 'react-redux';
class ManagerBuy extends Component {
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
      .orderByChild('idUser')
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
            orderSuccess: child.val().orderSuccess,
            soLuong: child.val().soLuong,
            total: child.val().total,
            location: child.val().location,
            district: child.val().district,
            ward: child.val().ward,
            cancelOrder: child.val().cancelOrder,
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
        enableEmptySections={true}
        data={this.state.data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.box} onPress = {()=> {
                this.props.navigation.navigate('BuyDetail', {
                  key: item.key,
                  address: item.address,
                  createAt: item.createAt,
                  idProduct: item.idProduct,
                  idUser: item.idUser,
                  idUserSell: item.idUserSell,
                  phone: item.phone,
                  productImage: item.productImage,
                  productName: item.productName,
                  userName: item.userName,
                  userPhoto: item.userPhoto,
                  productPrice: item.productPrice,
                  orderSuccess: item.orderSuccess,
                  soLuong: item.soLuong,
                  total: item.total,
                  location: item.location,
                  district: item.district,
                  ward: item.ward,
                  cancelOrder: item.cancelOrder,
                });
            }}>
              <Image style={styles.image} source={{uri: item.productImage}} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={styles.description}>
                  Bạn đã đặt mua sản phẩm này
                </Text>
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

export default connect(mapStateToProps, null)(ManagerBuy);
const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
  box: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#1E90FF',
  },
  message: {
    backgroundColor: '#228B22',
  },
});
