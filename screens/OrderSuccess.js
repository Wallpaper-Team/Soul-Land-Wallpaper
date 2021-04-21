import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import {firebaseApp} from '../Components/FirebaseConfig';

export default class OrderSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      productName: '',
      productPrice: '',
      productDescription: '',
      productImage1: '',
    };
  }

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');

    //read info product
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productImage1 = snapshot.child('imageUrl1').val();
        this.setState({isLoading: false});
      });
  }

  clickEventListener() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <>
        <>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color="#000" />
          )}
        </>
        <View style={styles.container}>
          <ScrollView>
            <View style={{alignItems: 'center', marginHorizontal: 30}}>
              <Image
                style={styles.productImg}
                source={{
                  uri: this.state.productImage1,
                }}
              />
              <Text style={styles.name}>{this.state.productName}</Text>
              <Text style={styles.price}>{this.state.productPrice} VND</Text>
              <Text style={styles.description}>
                {this.state.productDescription}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={styles.icon}
                source={{
                  uri:
                    'https://img.icons8.com/color/70/000000/facebook-like.png',
                }}
              />
              <Text style={styles.title}>Bạn đã đặt hàng thành công</Text>
            </View>

            <View style={styles.separator}></View>
            <View style={styles.addToCarContainer}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.shareButtonText}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 22,
    color: '#5F6D7A',
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
