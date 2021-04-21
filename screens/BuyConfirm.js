import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';
import {firebaseApp} from '../Components/FirebaseConfig';
import {DataTable} from 'react-native-paper';

class BuyConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      createAt: '',
      idProduct: '',
      idUser: '',
      phone: '',
      productImage: '',
      idProduct: '',
      productName: '',
      userPhoto: '',
      productPrice: '',
      userName: '',
      orderSuccess: '',
      soLuong: '',
      total: '',
      location: '',
      key: '',
      cancelOrder: '',
      receiveProductSuccess: '',
      district: '',
      ward: ''
    };
  }

  componentDidMount() {
    const address = this.props.navigation.getParam('address');
    const createAt = this.props.navigation.getParam('createAt');
    const idProduct = this.props.navigation.getParam('idProduct');
    const idUser = this.props.navigation.getParam('idUser');
    const idUserSell = this.props.navigation.getParam('idUserSell');
    const phone = this.props.navigation.getParam('phone');
    const productImage = this.props.navigation.getParam('productImage');
    const productName = this.props.navigation.getParam('productName');
    const userPhoto = this.props.navigation.getParam('userPhoto');
    const productPrice = this.props.navigation.getParam('productPrice');
    const userName = this.props.navigation.getParam('userName');
    const key = this.props.navigation.getParam('key');
    const orderSuccess = this.props.navigation.getParam('orderSuccess');
    const soLuong = this.props.navigation.getParam('soLuong');
    const total = this.props.navigation.getParam('total');
    const location = this.props.navigation.getParam('location');
    const district = this.props.navigation.getParam('district');
    const ward = this.props.navigation.getParam('ward');
    const cancelOrder = this.props.navigation.getParam('cancelOrder');

    this.setState({
      address: address,
      createAt: createAt,
      idProduct: idProduct,
      idUser: idUser,
      phone: phone,
      productImage: productImage,
      idProduct: idProduct,
      productName: productName,
      userPhoto: userPhoto,
      productPrice: productPrice,
      userName: userName,
      key: key,
      orderSuccess: orderSuccess,
      soLuong: soLuong,
      total: total,
      location: location,
      district: district,
      ward: ward,
      cancelOrder: cancelOrder,
    });

    //check ham da nhan don
    firebaseApp
      .database()
      .ref(`Orders/${key}`)
      .on('value', (snapshot) => {
        this.state.receiveProductSuccess = snapshot
          .child('receiveProductSuccess')
          .val();
      });
  }

  //xác nhận đã nhận được hàng thành công
  daNhanDon() {
    // update trang thai don thanh cong
    firebaseApp.database().ref(`Orders/${this.state.key}`).update({
      receiveProductSuccess: true,
    });

    this.props.navigation.navigate('Rating', {
      address: this.state.address,
      createAt: this.state.createAt,
      idProduct: this.state.idProduct,
      idUser: this.state.idUser,
      phone: this.state.phone,
      productImage: this.state.productImage,
      idProduct: this.state.idProduct,
      productName: this.state.productName,
      userPhoto: this.state.userPhoto,
      productPrice: this.state.productPrice,
      userName: this.state.userName,
      key: this.state.key,
      orderSuccess: this.state.orderSuccess,
      idUserSell: this.state.idUserSell,
    });
  }

  render() {
    return (
      <View style = {{backgroundColor: '#ffffff'}}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: this.state.productImage}} />

          <View style={styles.boxContent}>
            <Text style={styles.title}>{this.state.productName}</Text>
            <Text style={styles.description}>
              {this.state.productPrice} VND
            </Text>
          </View>
        </View>

        <DataTable>
         

          <DataTable.Row>
            <DataTable.Cell>1. Mã đơn hàng</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.key}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>2. Tên người mua</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.userName}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>3. Số điện thoại</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.phone}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>4. Thời gian đặt</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.createAt}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>5. Số lượng đặt mua</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.soLuong}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>6. Đơn giá</DataTable.Cell>
            <DataTable.Cell numeric>
              {this.state.productPrice} VNĐ
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>7. Địa chỉ cụ thể</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.address}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>8. Xã/Phường</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.ward}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>9. Quận/Huyện</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.district}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>10. Tỉnh</DataTable.Cell>
            <DataTable.Cell numeric>{this.state.location}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
    
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                Tổng đơn hàng
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric><Text style={{color: 'red', fontWeight: 'bold'}}>{this.state.total} VNĐ</Text></DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <ListItem bottomDivider>
          <ListItem.Content>
           
            <ListItem.Title>
              {this.state.cancelOrder ? (
                <Text style={{color: 'blue', fontSize: 18}}>
                  Đơn hàng của bạn đã bị hủy
                </Text>
              ) : (
                <Text style={{color: 'tomato', fontSize: 18}}>
                  Trạng thái giao dịch{' '}
                  {this.state.orderSuccess ? (
                    <Text>thành công</Text>
                  ) : (
                    <Text>chưa được xác nhận</Text>
                  )}
                </Text>
              )}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {/* check da dat hang thanh cong va da danh gia hay chua, chi duoc danh gia 1 lan */}
        {this.state.orderSuccess ? (
          this.state.receiveProductSuccess ? null : (
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.daNhanDon()}>
              <Text style={styles.loginText}>Đã nhận đơn</Text>
            </TouchableOpacity>
          )
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(BuyConfirm);
const styles = StyleSheet.create({
  loginText: {
    color: 'white',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 80,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
    fontWeight: 'bold'
  },
  description: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold'
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
