import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import CardInfoShop from '../Components/CardInfoShop';
import ModalBuyItem from '../Components/ModalBuyItem';

export default class ItemDetailHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      productName: '',
      productDescription: '',
      productPrice: '',
      productCreateAt: '',
      productCategory: '',
      idUser: '',
      location: '',
    };
  }

  render() {
    firebaseApp
      .database()
      .ref(`Products/${this.state.key}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.location = snapshot.child('location').val();
        var images = [];
        images.push([
          snapshot.child('imageUrl1').val(),
          snapshot.child('imageUrl2').val(),
          snapshot.child('imageUrl3').val(),
        ]);
        this.setState({images: images});
      });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            {this.state.productName} - {this.state.productPrice}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <ButtonBuyItem
              onPress={() => this.refs.modalBuyItem.showAddModal()}
            />
            <ButtonChat />
          </View>
          <View
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              padding: 5,
              borderRadius: 10,
              backgroundColor: '#ffffff',
            }}>
            <Text>{this.state.productDescription}</Text>
          </View>
          <CardInfoShop />
          <ModalBuyItem ref={'modalBuyItem'} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
