import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
  Button,
  Dimensions,
  Switch,
} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../Components/FirebaseConfig';
import Modal from 'react-native-modalbox';
import { TouchableOpacity } from 'react-native-gesture-handler';

var screen = Dimensions.get('window');
export default class EditInfoProduct extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productCreateAt: '',
      productCategory: '',
      idUser: '',
      location: '',
      userName: '',
      idProduct: '',
    };
  }

  showEditModal = (idProduct) => {
      this.setState({idProduct: idProduct})
  //  console.log('modal' + infoProduct);
    this.refs.myModal.open();
  };

  render() {
   firebaseApp
     .database()
     .ref(`Products/${this.state.idProduct}`)
     .once('value', (snapshot) => {
       this.state.productName = snapshot.child('name').val();
       this.state.productDescription = snapshot.child('description').val();
       this.state.productPrice = snapshot.child('price').val();
       this.state.productImage1 = snapshot.child('imageUrl1').val();
       this.state.productCreateAt = snapshot.child('createAt').val();
       this.state.idUser = snapshot.child('idUser').val();
       this.state.location = snapshot.child('location').val();
       this.state.userName = snapshot.child('userName').val();
     });
    return (
      <Modal
        ref={'myModal'}
        style={{
          justifyContent: 'center',
          borderRadius: 10,
          shadowRadius: 10,
          width: screen.width - 80,
          height: 280,
          marginTop: 50,
        }}
        // position="center"
        backdrop={true}
        onClosed={() => {}}>
        <Text>{this.state.productName}</Text>
        <Text>{this.state.productCreateAt}</Text>
        <Text>{this.state.location}</Text>
        <Text>{this.state.productPrice}</Text>
        <Text>{this.state.productDescription}</Text>
        <TextInput
          style={styles.input}
          placeholder="Giá"
          keyboardType="numeric"
          onChangeText={(text) =>
            this.setState({productPrice: text})
          }></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Mô tả"
          onChangeText={(text) =>
            this.setState({productDescription: text})
          }></TextInput>
        <TouchableOpacity
          title="Lưu"
          onPress={() => {
           firebaseApp
             .database()
             .ref(`Products/${this.state.idProduct}`)
             .update({
               price: this.state.productPrice,
               description: this.state.productDescription,
               //timeUpdate: new Date.toString();
             });
            this.refs.myModal.close();
            //alert('sua')
          }}>
          <Text>Luu</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    width: 350,
    marginTop: 100,
    marginLeft: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    margin: 10,
  },
});
