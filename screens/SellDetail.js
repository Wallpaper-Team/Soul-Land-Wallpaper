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


class SellDetail extends React.Component {
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
      key: '',
      soLuong: '',
      total: '',
      location: '',
      soLuongProduct: '',
      confirmOrder: '',
      cancelOrder: '',
      district: '',
      ward: '',
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
    const location = this.props.navigation.getParam('location');
    const soLuong = this.props.navigation.getParam('soLuong');
    const total = this.props.navigation.getParam('total');
    const key = this.props.navigation.getParam('key');
     const district = this.props.navigation.getParam('district');
     const ward = this.props.navigation.getParam('ward');

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
      location: location,
      total: total,
      soLuong: soLuong,
      district: district,
      ward: ward,
    });

    //lay so luong cua san pham
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .on('value', (snapshot) => {
        this.state.soLuongProduct = snapshot.child('soLuong').val();
      });

    //check trang thai don hang
    firebaseApp
      .database()
      .ref(`Orders/${key}`)
      .on('value', (snapshot) => {
        this.state.confirmOrder = snapshot.child('orderSuccess').val();
        this.state.cancelOrder = snapshot.child('cancelOrder').val();
      });

    
  }

  xacThucDonHang() {
   
    Alert.alert('X??c th???c', 'X??c nh???n ????n h??ng', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          if(this.state.soLuongProduct == 0){
            alert('S??? l?????ng h??ng ???? h???t');
            this.props.navigation.navigate('Manager');
          }else {
            // update trang thai don thanh cong
            firebaseApp.database().ref(`Orders/${this.state.key}`).update({
              orderSuccess: true,
            });
            //update san pham da ban
            firebaseApp
              .database()
              .ref(`Products/${this.state.idProduct}`)
              .update({
                sold: true,
                soLuong: this.state.soLuongProduct - this.state.soLuong,
              });
            alert('X??c nh???n ????n h??ng th??nh c??ng');
            this.props.navigation.navigate('Manager');
          }
         
        },
      },
    ]);
  }

  huyDonHang = () => {
    Alert.alert('H???y ????n', 'X??c nh???n h???y ????n h??ng', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // update trang thai don thanh cong
          firebaseApp.database().ref(`Orders/${this.state.key}`).update({
            cancelOrder: true,
          });
          alert('H???y ????n h??ng th??nh c??ng');
          this.props.navigation.navigate('Manager');
        },
      },
    ]);
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: this.state.productImage}} />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{this.state.productName}</Text>
            <Text style={styles.description}>
              {this.state.productPrice} VND
            </Text>
            <Text style={styles.description}>
              S??? l?????ng hi???n c??: {this.state.soLuongProduct}
            </Text>
          </View>
        </View>
        <View>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>1. M?? ????n h??ng</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.key}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>2. T??n ng?????i mua</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.userName}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>3. S??? ??i???n tho???i</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.phone}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>4. Th???i gian ?????t</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.createAt}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>5. S??? l?????ng ?????t mua</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.soLuong}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>6. ????n gi??</DataTable.Cell>
              <DataTable.Cell numeric>
                {this.state.productPrice} VN??
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>7. ?????a ch??? c??? th???</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.address}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>8. X??/Ph?????ng</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.ward}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>9. Qu???n/Huy???n</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.district}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>10. T???nh</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.location}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  T???ng ????n h??ng
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  {this.state.total} VN??
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        {/* <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.xacThucDonHang()}>
          <Text style={styles.loginText}>X??c nh???n ????n h??ng</Text>
        </TouchableOpacity> */}
        {this.state.cancelOrder ? (
          <Text
            style={{marginLeft: 20, marginTop: 10, color: 'red', fontSize: 18}}>
            ????n h??ng ???? h???y
          </Text>
        ) : this.state.confirmOrder ? (
          <Text
            style={{marginLeft: 20, marginTop: 10, color: 'red', fontSize: 18}}>
            ????n h??ng x??c nh???n th??nh c??ng
          </Text>
        ) : (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.huyDonHang()}>
              <Text style={styles.loginText}>H???y ????n</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.xacThucDonHang()}>
              <Text style={styles.loginText}>X??c nh???n ????n h??ng</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(SellDetail);
const styles = StyleSheet.create({
  loginText: {
    color: 'white',
  },
  buttonContainer: {
    flex: 2,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
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
