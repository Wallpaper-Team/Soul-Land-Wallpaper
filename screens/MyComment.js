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
  TextInput,
} from 'react-native';
import {firebaseApp} from '../Components/FirebaseConfig';
import {connect} from 'react-redux';
import moment from 'moment';
import {Card, Icon} from 'react-native-elements';


class MyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUser: '',
      createdAt: '',
      userName: '',
      comment: '',
      idProduct: '',
      productImage: '',
      productName: '',
      productPrice: '',
      productDescription: '',
      myComment: '',
      eventId: '',
      cmtDisplay: '',
      isCmt: false,
      cmtCreate: '',
    };
  }

  componentDidMount() {
    const avatarUser = this.props.navigation.getParam('avatarUser');
    const createdAt = this.props.navigation.getParam('createdAt');
    const eventId = this.props.navigation.getParam('eventId');
    const userName = this.props.navigation.getParam('userName');
    const image = this.props.navigation.getParam('image');
    const idProduct = this.props.navigation.getParam('idProduct');
    const productName = this.props.navigation.getParam('productName');
    const productPrice = this.props.navigation.getParam('productPrice');
    const productDescription = this.props.navigation.getParam(
      'productDescription',
    );
    const comment = this.props.navigation.getParam('comment');

    this.setState({
      avatarUser: avatarUser,
      eventId: eventId,
      userName: userName,
      productImage: image,
      idProduct: idProduct,
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      comment: comment,
      createdAt: createdAt
    });

    //lay cmt cua nguoi ban
    firebaseApp
      .database()
      .ref(`Comments/${eventId}`)
      .on('value', (snapshot) => {
        this.setState({
          cmtDisplay: snapshot.child('myComment').val(),
          cmtCreate: snapshot.child('createAtCmtMyProduct').val(),
        });
      });
  }

  postComment = () => {
    if (this.state.myComment != null) {
      // const newRef = firebaseApp.database().ref('Comments').push();
      firebaseApp.database().ref(`Comments/${this.state.eventId}`).update({
        //  nameUserProduct: this.props.userName,
        //  idUserProduct: this.props.userId,
        createAtCmtMyProduct: new Date().toISOString(),
        myComment: this.state.myComment,
      });
      this.setState({myComment: null, isCmt: true
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Title>
            {this.state.productName} - {this.state.productPrice} VND
          </Card.Title>
          <Card.Divider />
          <Card.Image
            resizeMode="cover"
            source={{
              uri: this.state.productImage,
            }}></Card.Image>
          <Text style={{marginBottom: 10, marginTop: 10}}>
            {this.state.productDescription}
          </Text>
        </Card>
        <ScrollView>
          {/* <View style={[styles.card, styles.profileCard]}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.state.productImage,
              }}
            />
            <Text style={styles.name}>
              {this.state.productName} - {this.state.productPrice} VND
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.description}>
              {this.state.productDescription}
            </Text>
          </View> */}
          <View style={styles.containerItem}>
            <Image style={styles.image} source={{uri: this.state.avatarUser}} />

            <View style={styles.contentCmt}>
              <View style={styles.contentHeadercmt}>
                <Text style={styles.nameusercmt}>{this.state.userName}</Text>
                <Text style={styles.timecmt}>
                  {moment(new Date(this.state.createdAt)).fromNow()}
                </Text>
              </View>
              <Text rkType="primary3 mediumLine">{this.state.comment}</Text>
            </View>
          </View>

          {this.state.cmtDisplay == '' ? null : (
            <View style={styles.containerItem2}>
              <Image
                style={styles.image}
                source={{uri: this.props.userPhoto}}
              />
              <View style={styles.contentCmt}>
                <View style={styles.contentHeadercmt}>
                  <Text style={styles.nameusercmt}>{this.props.userName}</Text>
                  <Text style={styles.timecmt}>
                    {' '}
                    {moment(new Date(this.state.cmtCreate)).fromNow()}
                  </Text>
                </View>
                <Text rkType="primary3 mediumLine">
                  {this.state.cmtDisplay}
                </Text>
              </View>
            </View>
          )}

          {/* binh luan cua ban */}
          <View style={styles.footer}>
            <View style={styles.inputContainercmt}>
              <TextInput
                style={styles.inputscmt}
                placeholder="Bình luận..."
                underlineColorAndroid="transparent"
                value={this.state.myComment}
                onChangeText={(text) => this.setState({myComment: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.postComment()}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
                }}
                style={styles.iconSend}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(MyComment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    height: 100,
  },
  profileCard: {
    height: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  containerItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  containerItem2: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  contentCmt: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 45,
    height: 45,
    borderRadius: 50,
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
