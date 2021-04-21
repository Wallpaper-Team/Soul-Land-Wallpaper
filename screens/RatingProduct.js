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
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
import {firebaseApp} from '../Components/FirebaseConfig';
export default class RatingProduct extends Component {
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
      orderSuccess: '',
      idUserSell: '',
      rating: 5,
    };
  }

  componentDidMount() {
    const address = this.props.navigation.getParam('address');
    const createAt = this.props.navigation.getParam('createAt');
    const idProduct = this.props.navigation.getParam('idProduct');
    const idUser = this.props.navigation.getParam('idUser');
    const phone = this.props.navigation.getParam('phone');
    const productImage = this.props.navigation.getParam('productImage');
    const productName = this.props.navigation.getParam('productName');
    const userPhoto = this.props.navigation.getParam('userPhoto');
    const productPrice = this.props.navigation.getParam('productPrice');
    const userName = this.props.navigation.getParam('userName');
    const key = this.props.navigation.getParam('key');
    const orderSuccess = this.props.navigation.getParam('orderSuccess');

    console.log('raitng', productName);

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
    });
  }

  ratingCompleted() {
    // console.log('Rating is: ' + rating);
    firebaseApp.database().ref('Ratings').push({
      idProduct: this.state.idProduct,
      idUser: this.state.idUser,
      rating: this.state.rating,
      key: this.state.key
    });

    alert('Cảm ơn bạn đã đánh giá');
    this.props.navigation.navigate('ManagerBuy');
  }

  setRating(rating) {
    console.log('Rating is: ' + rating);
   //this.setState({rating: rating});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center', marginHorizontal: 30}}>
            <Image
              style={styles.productImg}
              source={{
                uri: this.state.productImage,
              }}
            />
            <Text style={styles.name}>{this.state.productName}</Text>
            <Text style={styles.price}>{this.state.productPrice}</Text>
          </View>
          <AirbnbRating
            showRating
            count={5}
            reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
            defaultRating={11}
            size={25}
            onFinishRating={(text) => this.setState({rating: text})}
          />
        
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.ratingCompleted()}>
              <Text style={styles.shareButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
