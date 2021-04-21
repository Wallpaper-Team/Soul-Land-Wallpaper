import storage from '@react-native-firebase/storage';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import {CITIES} from '../constants/Cities';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const category = [
  {label: 'Thời trang', value: 'Thời trang'},
  {label: 'Điện thoại', value: 'Điện thoại'},
  {label: 'Đồ gia dụng', value: 'Đồ gia dụng'},
  {label: 'Bàn ghế', value: 'Bàn ghế văn phòng'},
  {label: 'Máy móc văn phòng', value: 'Máy móc văn phòng'},
  {label: 'Đồ gỗ', value: 'Đồ gỗ'},
  {label: 'Đồ điện tử', value: 'Đồ điện tử'},
  {label: 'Điều hòa - Ti vi - Tủ lạnh', value: 'Điều hòa - Ti vi - Tủ lạnh'},
];

const status = [
  {label: 'Mới', value: 'Mới'},
  {label: 'Cũ', value: 'Cũ'},
];

const productRef = firebaseApp.database();
class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: null,
      productImage2: null,
      productImage3: null,
      productImage4: '',
      productCreateAt: '',
      soLuong: '',
      productCategory: 'Thời trang',
      idUser: '',
      location: 'Hà Nội',
      userName: '',
      productStatus: 'Mới',
      count: 0,
      isUploading: false,
    };
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('category');

    this.setState({
      productImage1: null,
      productImage2: null,
      productImage3: null,
    });
    this.getCityAPI();

  }

  getCityAPI = async () => {
    try {
      let response = await fetch('https://thongtindoanhnghiep.co/api/city');
      let json = await response.json();
      console.log(json.LtsItem);
    } catch (error) {
      console.error(error);
    }
  };

  uploadImage = async (image) => {
    this.setState({isUploading: true});
    const reference = storage().ref(image);
    const pathToFile = image;
    await reference.putFile(pathToFile);
    const imageUrl = await reference.getDownloadURL();
    this.setState({isUploading: false});
    return imageUrl;
  };

  //tạo sản phẩm
  addNewproduct = () => {
    // console.log('image local', this.state.productImage1);
    // console.log('imge upload', imageUrl1);

    if (
      this.state.productName.length == 0 ||
      this.state.productPrice.length == 0 ||
      this.state.productDescription.length == 0
    ) {
      alert('Bạn phải nhập đầy đủ thông tin');
    } else {
      if (
        this.state.productImage1 == null ||
        this.state.productImage1 == null ||
        this.state.productImage1 == null
      ) {
        alert('Bạn phải đăng đủ ba ảnh');
      } else {
        Alert.alert(
          'Thông báo',
          'Đăng thông tin sản phẩm ?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                if (
                  this.state.productName == null ||
                  this.state.productPrice == null
                ) {
                  alert('Bạn phải nhập đầy đủ thông tin');
                } else {
                  const imageUrl1 = await this.uploadImage(
                    this.state.productImage1,
                  );
                  const imageUrl2 = await this.uploadImage(
                    this.state.productImage2,
                  );
                  const imageUrl3 = await this.uploadImage(
                    this.state.productImage3,
                  );

                  productRef.ref('Products').push({
                    name: this.state.productName,
                    description: this.state.productDescription,
                    price: this.state.productPrice,
                    imageUrl1: imageUrl1,
                    imageUrl2: imageUrl2,
                    imageUrl3: imageUrl3,
                    soLuong: this.state.soLuong,
                    soLuongBanDau: this.state.soLuong,
                    createAt: new Date().toISOString(),
                    timeUpdate: '',
                    location: this.state.location,
                    idUser: this.props.userId,
                    userName: this.props.userName,
                    category: this.state.productCategory,
                    status: this.state.productStatus,
                    userAvatar: this.props.userPhoto,
                  });

                  this.setState({
                    productName: null,
                    productDescription: null,
                    productPrice: null,
                    productImage1: null,
                    productImage2: null,
                    productImage3: null,
                    soLuong: null,
                    productCreateAt: null,
                    productDescription: null,
                  });
                  this.props.navigation.navigate('Home');
                  alert('Tạo sản phẩm thành công');
                }
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  takeImage = (productImage) => {
    if (productImage == 'productImage1' && !!this.state.productImage1) {
      return;
    } else if (productImage == 'productImage2' && !!this.state.productImage2) {
      return;
    } else if (productImage == 'productImage3' && !!this.state.productImage3) {
      return;
    }
    // launchImageLibrary(options, (response) => {
    //   if (productImage == 'productImage1') {
    //     this.setState({productImage1: response.uri});
    //   } else if (productImage == 'productImage2') {
    //     this.setState({productImage2: response.uri});
    //   } else if (productImage == 'productImage3') {
    //     this.setState({productImage3: response.uri});
    //   }
    // });
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (productImage == 'productImage1') {
    //     this.setState({productImage1: response.uri});
    //   } else if (productImage == 'productImage2') {
    //     this.setState({productImage2: response.uri});
    //   } else if (productImage == 'productImage3') {
    //     this.setState({productImage3: response.uri});
    //   }
    // });
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

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Tạo sản phẩm của bạn</Text>
        <Text style={{marginLeft: 20}}>Bạn phải đăng đủ ba ảnh</Text>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 3, marginLeft: 20}}>
            <Text>Tên sản phẩm</Text>
            <TextInput
              placeholder="..."
              style={styles.input}
              onChangeText={(productName) => this.setState({productName})}
              value={this.state.productName}></TextInput>
          </View>
          <View style={{flex: 2, marginRight: 20, marginLeft: 10}}>
            <Text>Đơn giá (VNĐ)</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="..."
              style={styles.input}
              onChangeText={(productPrice) => this.setState({productPrice})}
              value={this.state.productPrice}></TextInput>
          </View>
        </View>
        <View style={{marginRight: 20, marginLeft: 20, marginTop: 10}}>
          <Text>Mô tả sản phẩm:</Text>
          <TextInput
            placeholder="..."
            style={{
              textAlignVertical: 'top',
              borderWidth: 1,
              borderColor: '#3399ff',
              borderRadius: 10,
              marginTop: 10,
            }}
            numberOfLines={3}
            onChangeText={(productDescription) =>
              this.setState({productDescription})
            }
            value={this.state.productDescription}></TextInput>
        </View>
        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20}}>
          <Text>Chọn địa điểm</Text>
          <RNPickerSelect
            onValueChange={(location) => this.setState({location})}
            items={CITIES}
            useNativeAndroidPickerStyle={true}
            placeholder={{
              label: this.state.location,
              value: this.state.location,
            }}
            value={this.state.location}
          />
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={{flex: 3, marginLeft: 20}}>
            <Text>Danh mục</Text>
            <RNPickerSelect
              onValueChange={(productCategory) =>
                this.setState({productCategory})
              }
              items={category}
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: this.state.productCategory,
                value: this.state.productCategory,
              }}
              value={this.state.productCategory}
            />
          </View>
          <View style={{flex: 3, marginRight: 20}}>
            <Text>Tình trạng</Text>
            <RNPickerSelect
              onValueChange={(productStatus) => this.setState({productStatus})}
              items={status}
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: this.state.productCategory,
                value: this.state.productStatus,
              }}
              value={this.state.productStatus}
            />
          </View>
        </View>
        <View style={{flex: 2, marginRight: 20, marginLeft: 20}}>
          <Text>Số lượng</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="..."
            style={styles.input}
            onChangeText={(text) => this.setState({soLuong: text})}
            value={this.state.soLuong}></TextInput>
        </View>
        {this.state.isUploading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addNewproduct()}>
            <Text style={styles.textbutton}>Tạo sản phẩm</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, null)(CameraScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 20,
  },
  imageUrl: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginRight: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
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
  icon: {
    height: 50,
    width: 50,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  choose: {
    padding: 15,
    borderColor: '#d9d9d9',
    borderWidth: 0.5,
    margin: 20,
    borderRadius: 10,
  },
  textBtn: {
    color: '#000000',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  textbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
