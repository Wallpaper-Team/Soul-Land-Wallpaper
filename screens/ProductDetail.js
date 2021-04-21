import database from '@react-native-firebase/database';
import {isNull} from 'lodash';
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
  Modal,
  Pressable,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import * as helper from '../database/database-helper';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ListItem, Avatar} from 'react-native-elements';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productImage2: '',
      productImage3: '',
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
      soLuong: '',
      rating: '',
      modalVisible: false,
      priceOffer: '',
    };
  }

  postNotification(type, key) {
    const newRef = database().ref('Notifications').push();
    switch (type) {
      case 'like':
        newRef.set({
          uid1: this.props.userId,
          userName: this.props.userName,
          uid2: this.state.idUser,
          content: `${this.props.userName} đã thích sản phẩm ${this.state.productName} của bạn`,
          createdAt: new Date().toISOString(),
          avatarUser: this.props.userPhoto,
          attachment: this.state.productImage1,
          idProduct: this.state.idProduct,
          productName: this.state.productName,
          productPrice: this.state.productPrice,
          productDescription: this.state.productDescription,
          eventId: key,
          type: 'like',
        });
        break;
      case 'comment':
        newRef.set({
          uid1: this.props.userId,
          userName: this.props.userName,
          uid2: this.state.idUser,
          content: `${this.props.userName} đã bình luận về sản phẩm ${this.state.productName}: ${this.state.comment}`,
          createdAt: new Date().toISOString(),
          avatarUser: this.props.userPhoto,
          attachment: this.state.productImage1,
          idProduct: this.state.idProduct,
          productName: this.state.productName,
          productPrice: this.state.productPrice,
          productDescription: this.state.productDescription,
          comment: this.state.comment,
          eventId: key,
          type: 'comment',
        });
        break;
      case 'offer':
        break;
      case 'follow':
        newRef.set({});
        break;
      default:
        break;
    }
  }

  postComment() {
    if (this.state.comment != null) {
      const newRef = firebaseApp.database().ref('Comments').push();
      newRef.set({
        idProduct: this.state.idProduct,
        idUser: this.props.userId,
        nameUser: this.props.userName,
        content: this.state.comment,
        createAt: new Date().toISOString(),
        avatarUser: this.props.userPhoto,
        createAtCmtMyProduct: '',
        myComment: '',
      });
      this.setState({comment: null});
      this.postNotification('comment', newRef.key);
    }
  }
  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    this.setState({idProduct: idProduct});
    //read info product
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .on('value', (snapshot) => {
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
        this.state.soLuong = snapshot.child('soLuong').val();
      });

    this._checkLikeState(idProduct, this.props.userId);
    const temp = [];
    temp.push(this.state.productImage1);
    temp.push(this.state.productImage2);
    temp.push(this.state.productImage3);

    this.setState({listImage: temp});
    //load comment
    firebaseApp
      .database()
      .ref('Comments/')
      .orderByChild('idProduct')
      .equalTo(idProduct)
      .on('value', (snapshot) => {
        const temp = [];
        snapshot.forEach((child) => {
          temp.push({
            key: child.key,
            idProduct: child.val().idProduct,
            idUser: child.val().idUser,
            nameUser: child.val().nameUser,
            content: child.val().content,
            createAt: child.val().createAt,
            avatarUser: child.val().avatarUser,
            myComment: child.val().myComment,
            createAtCmtMyProduct: child.val().createAtCmtMyProduct,
          });
          this.setState({listComment: temp});
        });
      });

    //lay rating
    firebaseApp
      .database()
      .ref('Ratings')
      .orderByChild('idProduct')
      .equalTo(idProduct)
      .on('value', (snapshot) => {
        var rating = 0;
        snapshot.forEach((child) => {
          rating += child.val().rating;
        });
        this.setState({rating: rating / 2});
      });

    // this.setState({rating: rating})
  }

  _checkLikeState = (idProduct, userId) => {
    const key = idProduct + '_' + userId;
    database()
      .ref(`Likes/`)
      .orderByChild('idProduct_uid')
      .equalTo(key)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            this.setState({isLike: item.val().isLiked});
          });
        }
      });
  };

  _toggleLikeState = (idProduct, userId) => {
    const key = idProduct + '_' + userId;
    database()
      .ref('Likes')
      .orderByChild('idProduct_uid')
      .equalTo(key)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            //update isLiked state on realtime database
            database()
              .ref(`Likes/${item.key}/isLiked`)
              .transaction((state) => !state);
          });
        } else {
          const newRef = database().ref('Likes').push();
          newRef.set({
            idProduct_uid: key,
            idProduct: idProduct,
            uid: userId,
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productImage1: this.state.productImage1,
            productCategory: this.state.productCategory,
            isLiked: true,
          });
          this.postNotification('like', newRef.key);
        }
      });
  };

  __setImageSelected = (image) => {
    this.setState({selectedImage: image});
  };

  __renderImages = () => {
    return (
      <View style={styles.smallImagesContainer}>
        {this.state.listImage.map((prop, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                this.__setImageSelected(prop);
              }}>
              <Image style={styles.smallImage} source={{uri: prop}} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  sendMessage = async () => {
    const myId = this.props.userId;
    const shopId = this.state.idUser;
    const idProduct = this.state.idProduct;
    const chatRoomId = await helper.lookUpChatRoomWithUserIds(myId, shopId);
    this.props.navigation.navigate('ChatRoom', {
      uid: shopId,
      chatRoomId: chatRoomId,
      idProduct: idProduct,
      title: this.state.userName,
    });
  };

  // gui gia de nghi cho nguoi ban
  makeOfferPrice = () => {
    if (this.state.productPrice == '') {
      alert('Giá đề nghị phải cao hơn giá sản phẩm.');
    } else if (this.state.priceOffer <= this.state.productPrice) {
      alert('Giá đề nghị phải cao hơn giá sản phẩm.');
    } else {
      const newRef = firebaseApp.database().ref('Offers').push();
      const newRef2 = firebaseApp.database().ref('Notifications').push();
      newRef.set({
        idProduct: this.state.idProduct,
        idUser: this.props.userId,
        nameUser: this.props.userName,
        createAt: new Date().toISOString(),
        avatarUser: this.props.userPhoto,
        priceOffer: this.state.priceOffer,
      });
      newRef2.set({
        idProduct: this.state.idProduct,
        attachment: this.state.productImage1,
        uid1: this.props.userId,
        nameUser: this.props.userName,
        uid2: this.state.idUser,
        createdAt: new Date().toISOString(),
        avatarUser: this.props.userPhoto,
        priceOffer: this.state.priceOffer,
        content: `${this.props.userName} đã đề nghị giá sản phẩm ${this.state.productName}: ${this.state.priceOffer} VND`,
        type: 'offer',
        productName: this.state.productName,
        productPrice: this.state.productPrice,
        productDescription: this.state.productDescription,
      });
      this.setState({modalVisible: false});
      alert('Bạn đã đề nghị giá tới người bán.');
    }
  };

  render() {
    // console.log('iumages', this.state.listImage);
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
          <View style={styles.card}>
            <SliderBox
              images={this.state.listImage}
              sliderBoxHeight={300}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
              resizeMode="contain"
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={10}
              autoplay
              circleLoop
            />
            <View style={styles.cardHeader}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.name}>{this.state.productName} </Text>

                <Text style={styles.namePrice}>
                  {this.state.productPrice} VND
                </Text>
              </View>

              {this.state.idUser !== this.props.userId ? (
                <TouchableOpacity
                  onPress={() =>
                    this._toggleLikeState(
                      this.state.idProduct,
                      this.props.userId,
                    )
                  }>
                  {this.state.isLike ? (
                    <FontAwesome name="heart" size={24} color="red" />
                  ) : (
                    <Feather name="heart" size={24} color="red" />
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
            {this.state.soLuong == 0 ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'red',
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                {' '}
                Đã bán hết
              </Text>
            ) : this.state.idUser !== this.props.userId ? (
              <View style={styles.addToCarContainer}>
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() => this.setState({modalVisible: true})}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.shareBtnText}>Đề nghị giá</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() => this.sendMessage()}>
                  <View style={{flexDirection: 'row'}}>
                    <Entypo name="message" size={20} color="#ffffff" />
                    <Text style={styles.shareBtnText}>Nhắn tin</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() =>
                    this.props.navigation.navigate('Order', {
                      idProduct: this.state.idProduct,
                      productName: this.state.productName,
                      productImage: this.state.productImage1,
                      productPrice: this.state.productPrice,
                      productDescription: this.state.productDescription,
                      idUserSell: this.state.idUser,
                      soLuong: this.state.soLuong,
                    })
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome
                      name="shopping-cart"
                      size={20}
                      color="#ffffff"
                    />
                    <Text style={styles.shareBtnText}>Mua hàng</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('UserProfile', {
                userName: this.state.userName,
                userAvatar: this.state.userAvatar,
                userId: this.state.idUser,
              })
            }>
            <View>
              <ListItem>
                <Avatar
                  rounded
                  source={{uri: this.state.userAvatar}}
                  size="medium"
                />
                <ListItem.Content>
                  <ListItem.Title>{this.state.userName}</ListItem.Title>
                  {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.card}
            onPress={() =>
              this.props.navigation.navigate('UserProfile', {
                userName: this.state.userName,
                userAvatar: this.state.userAvatar,
                userId: this.state.idUser,
              })
            }>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: this.state.userAvatar}}
                style={styles.image}
              />
              <Text style={styles.username}>{this.state.userName}</Text>
            </View>
          </TouchableOpacity> */}

          <View style={styles.card}>
            <View style={styles.cardHeader2}>
              <Text style={styles.cardTitle}>
                Đánh giá : {this.state.rating}{' '}
                {<FontAwesome name="star" size={24} color="red" />}
              </Text>
              <Text style={styles.cardTitle}>
                Phân loại: {this.state.productCategory}{' '}
              </Text>
              <Text style={styles.cardTitle}>
                Số lượng: {this.state.soLuong}{' '}
              </Text>
              <Text style={styles.cardTitle}>
                Tình trạng: {this.state.productStatus}{' '}
              </Text>
              <Text style={styles.cardTitle}>
                Vị trí: {this.state.location}{' '}
              </Text>
              <Text style={styles.cardTitle}>Mô tả: </Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>
                {this.state.productDescription}
              </Text>
            </View>

            {/* text cmt */}

            {this.state.idUser !== this.props.userId ? (
              <View style={styles.footer}>
                <View style={styles.inputContainercmt}>
                  <TextInput
                    style={styles.inputscmt}
                    placeholder="Bình luận..."
                    underlineColorAndroid="transparent"
                    value={this.state.comment}
                    onChangeText={(text) => this.setState({comment: text})}
                  />
                </View>

                <TouchableOpacity
                  style={styles.btnSend}
                  onPress={() => this.postComment()}>
                  <Image
                    source={{
                      uri:
                        'https://img.icons8.com/small/75/ffffff/filled-sent.png',
                    }}
                    style={styles.iconSend}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          {/* danh sach binh luan */}
          <View>
            <Text style={{fontSize: 15, marginTop: 10, marginLeft: 20}}>
              Bình luận sản phẩm
            </Text>
            <FlatList
              style={styles.root}
              data={this.state.listComment}
              extraData={this.state}
              ItemSeparatorComponent={() => {
                return <View style={styles.separatorcmt} />;
              }}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.containerItem}>
                      <Image
                        style={styles.image}
                        source={{uri: item.avatarUser}}
                      />

                      <View style={styles.contentCmt}>
                        <View style={styles.contentHeadercmt}>
                          <Text style={styles.nameusercmt}>
                            {item.nameUser}
                          </Text>
                          <Text style={styles.timecmt}>{item.createAt}</Text>
                        </View>
                        <Text rkType="primary3 mediumLine">{item.content}</Text>
                      </View>
                    </View>
                    {/* binh luan cua shop */}
                    {item.myComment == '' ? null : (
                      <View style={styles.containerItem2}>
                        <Image
                          style={styles.image}
                          source={{uri: this.state.userAvatar}}
                        />
                        <View style={styles.contentCmt}>
                          <View style={styles.contentHeadercmt}>
                            <Text style={styles.nameusercmt}>
                              {' '}
                              {this.state.userName}
                            </Text>
                            <Text style={styles.timecmt}>
                              {' '}
                              {item.createAtCmtMyProduct}
                            </Text>
                          </View>
                          <Text rkType="primary3 mediumLine">
                            {item.myComment}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modalVisible: !modalVisible});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: false})}>
                <AntDesign name="closecircle" size={24} color="red" />
              </TouchableOpacity>

              <Text style={styles.modalText}>Đề nghị giá</Text>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  margin: 12,
                  borderWidth: 1,
                  borderColor: '#bfbfbf',
                  borderRadius: 5,
                }}
                onChangeText={(text) => this.setState({priceOffer: text})}
                value={(text) => this.setState({priceOffer: text})}
                placeholder="...VNĐ"
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.makeOfferPrice()}>
                <Text style={styles.textStyle}>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ProductDetail);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'tomato',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  shareBtn: {
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderColor: '#ffffff',
    borderWidth: 0.5,
  },
  shareBtnText: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 5,
  },
  addToCarContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainercmt: {
    borderColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputscmt: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  content: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  smallImagesContainer: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  btnColor: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 3,
  },
  contentColors: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    color: '#696969',
    fontWeight: 'bold',
  },
  namePrice: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#696969',
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

  /******** card **************/
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardHeader2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: 'tomato',
    fontSize: 15,
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  username: {
    marginTop: 20,
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  containerItem: {
    paddingRight: 10,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containerItem2: {
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 50,
    backgroundColor: '#e6e6e6',
  },
  contentCmt: {
    marginLeft: 10,
    flex: 1,
  },
  contentHeadercmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 5,
  },
  separatorcmt: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  imagecmt: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  timecmt: {
    fontSize: 11,
    color: '#808080',
  },
  nameusercmt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//   },
//   card: {
//     height: 100,
//     backgroundColor: '#ffffff',
//     marginTop: 10,
//   },
//   image: {
//     marginTop: 10,
//     marginLeft: 20,
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   title: {
//     marginTop: 20,
//     marginLeft: 20,
//     color: '#000000',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   price: {
//     marginLeft: 20,
//     color: '#000000',
//   },
//   containerCmt: {
//     backgroundColor: '#FFF',
//     paddingTop: 20,

//   },
//   containerInput: {
//     backgroundColor: '#FFF',
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderColor: '#EEE',
//     alignItems: 'center',
//     paddingLeft: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     fontSize: 15,
//   },
//   button: {
//     height: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inactive: {
//     color: '#CCC',
//   },
//   text: {
//     color: '#3F51B5',
//     fontWeight: 'bold',
//     fontFamily: 'Avenir',
//     textAlign: 'center',
//   },
//   cmtBox: {
//     flexDirection: 'row',
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginLeft: 5,
//     paddingTop: 10,
//     width: 40,
//   },
//   contentContainer: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderColor: '#EEE',
//     padding: 5,
//     flexDirection: 'column'
//   },
//   avatar: {
//     borderWidth: 1,
//     borderColor: '#EEE',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//   },
//   text: {
//     color: '#000',
//     fontFamily: 'Avenir',
//     fontSize: 14,
//   },
//   name: {
//     fontWeight: 'bold',
//   },
//   created: {
//     color: '#BBB',

//   },
// });
