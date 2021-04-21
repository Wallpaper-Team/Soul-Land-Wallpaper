import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator} from 'react-native';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productImage1Changed: false,
      productImage2: '',
      productImage2Changed: false,
      productImage3: '',
      productImage3Changed: false,
      productCreateAt: '',
      productCategory: '',
      productStatus: '',
      idUser: '',
      location: '',
      userName: '',
      userAvatar: '',
      idProduct: '',
      comment: '',
      listComment: [],
      isLike: false,
      valueLike: 0,
      selectedImage: '',
      listImage: '',
      isSoldOut: '',
      isUploading: false,
      soLuongBanDau: '',
      soLuongHienCon: ''
    };
  }

  uploadImage = async (image) => {
    this.setState({isUploading: true});
    const reference = storage().ref(image);
    const pathToFile = image;
    await reference.putFile(pathToFile);
    const imageUrl = await reference.getDownloadURL();
    this.setState({isUploading: false});
    return imageUrl;
  };

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('key');
    this.setState({idProduct: idProduct});
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .once('value', (snapshot) => {
        this.setState({
          productName: snapshot.child('name').val(),
        });
        this.state.productName = snapshot.child('name').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productImage1 = snapshot.child('imageUrl1').val();
        this.state.productImage2 = snapshot.child('imageUrl2').val();
        this.state.productImage3 = snapshot.child('imageUrl3').val();
        this.state.productCreateAt = snapshot.child('createAt').val();
        this.state.productCategory = snapshot.child('description').val();
        this.state.idUser = snapshot.child('idUser').val();
        this.state.userName = snapshot.child('userName').val();
        this.state.location = snapshot.child('location').val();
        this.state.productStatus = snapshot.child('status').val();
        this.state.productCategory = snapshot.child('category').val();
        this.state.userAvatar = snapshot.child('userAvatar').val();
        this.state.isSoldOut = snapshot.child('sold').val();
        this.state.soLuongBanDau = snapshot.child('soLuongBanDau').val();
        this.state.soLuongHienCon = snapshot.child('soLuong').val();
      });
  }
  takeImage = (productImage) => {
    if (productImage == 'productImage1' && !!this.state.productImage1) {
      return;
    } else if (productImage == 'productImage2' && !!this.state.productImage2) {
      return;
    } else if (productImage == 'productImage3' && !!this.state.productImage3) {
      return;
    }

     launchImageLibrary(
       {
         mediaType: 'photo',
         includeBase64: false,
       },
       (response) => {
         if (productImage == 'productImage1') {
           this.setState({productImage1: response.uri});
         } else if (productImage == 'productImage2') {
           this.setState({productImage2: response.uri});
         } else if (productImage == 'productImage3') {
           this.setState({productImage3: response.uri});
         }
       },
     );
  };

  deleteImage = (productImage) => {
    if (productImage == 'productImage1') this.setState({productImage1: null});
    else if (productImage == 'productImage2')
      this.setState({productImage2: null});
    else if (productImage == 'productImage3')
      this.setState({productImage3: null});
  };

  editProduct = async () => {
    const imageUrl1 = this.state.productImage1Changed
      ? await this.uploadImage(this.state.productImage1)
      : this.state.productImage1;
    const imageUrl2 = this.state.productImage2Changed
      ? await this.uploadImage(this.state.productImage2)
      : this.state.productImage2;
    const imageUrl3 = this.state.productImage3Changed
      ? await this.uploadImage(this.state.productImage3)
      : this.state.productImage3;

    firebaseApp.database().ref(`Products/${this.state.idProduct}`).update({
      description: this.state.productDescription,
      price: this.state.productPrice,
      imageUrl1: imageUrl1,
      imageUrl2: imageUrl2,
      imageUrl3: imageUrl3,
    });

    this.props.navigation.navigate('List');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Tên sản phẩm:{' '}
          <Text style={{color: 'tomato'}}>{this.state.productName}</Text>
        </Text>
        <Text style={styles.title}>
          Phân loại:{' '}
          <Text style={{color: 'tomato'}}>{this.state.productCategory}</Text>
        </Text>
        <Text style={styles.title}>
          Tạo :{' '}
          <Text style={{color: 'tomato'}}>{this.state.productCreateAt}</Text>
        </Text>
        <Text style={styles.title}>
          Địa điểm :{' '}
          <Text style={{color: 'tomato'}}>{this.state.location}</Text>
        </Text>
        <Text style={styles.title}>
          Số lượng ban đầu :{' '}
          <Text style={{color: 'tomato'}}>{this.state.soLuongBanDau}</Text>
        </Text>
        <Text style={styles.title}>
          Số lượng hiện còn :{' '}
          <Text style={{color: 'tomato'}}>{this.state.soLuongHienCon}</Text>
        </Text>
        <Text style={styles.title}>Mô tả:</Text>
        <TextInput
          style={{
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#3399ff',
            borderRadius: 10,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
          numberOfLines={3}
          onChangeText={(text) => this.setState({productDescription: text})}
          value={this.state.productDescription}></TextInput>
        <Text style={styles.title}>Giá (VNĐ)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => this.setState({productPrice: text})}
          value={this.state.productPrice}
          readonly></TextInput>
        <Text style={styles.title}>Ảnh sản phẩm</Text>
        <View style={styles.imageContainer}>
          <ImageViewHolder
            image={this.state.productImage1}
            onAddingHandler={() => {
              this.takeImage('productImage1');
            }}
            onDeletingHandler={() => {
              this.deleteImage('productImage1');
            }}
          />
          <ImageViewHolder
            image={this.state.productImage2}
            onAddingHandler={() => {
              this.takeImage('productImage2');
            }}
            onDeletingHandler={() => {
              this.deleteImage('productImage2');
            }}
          />
          <ImageViewHolder
            image={this.state.productImage3}
            onAddingHandler={() => {
              this.takeImage('productImage3');
            }}
            onDeletingHandler={() => {
              this.deleteImage('productImage3');
            }}
          />
        </View>

        {!this.state.isUploading ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.editProduct()}>
            <Text style={styles.textbutton}>Sửa thông tin</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="gray" />
        )}
      </View>
    );
  }
}
const ImageViewHolder = (props) => {
  return (
    <TouchableOpacity style={styles.image} onPress={props.onAddingHandler}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgray',
        }}>
        {!props.image && <AntDesign name="plus" size={50} color="white" />}
        {!!props.image && (
          <Image
            source={{uri: props.image}}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
        {!!props.image && (
          <TouchableOpacity
            style={styles.close}
            onPress={props.onDeletingHandler}>
            <AntDesign name="closesquareo" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(EditProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    justifyContent: 'flex-end',
  },
  textbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 13,
  },
  imageContainer: {
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  image: {
    width: '30%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightgray',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 15,
 
  },
  location: {
    fontSize: 15,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
