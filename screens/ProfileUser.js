import {firebaseApp} from '../Components/FirebaseConfig';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {RecipeCard} from './AppStyles';

const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameProfile: '',
      userAvatarProfile: '',
      userIdProfile: '',
      listProduct: {},
      countProduct: 0,
      selectScreen: '',
      isFollowed: '',
      keyFollwed: '',
    };
  }

  componentDidMount() {
    const userNameProfile = this.props.navigation.getParam('userName');
    const userAvatarProfile = this.props.navigation.getParam('userAvatar');
    const userIdProfile = this.props.navigation.getParam('userId');
    this.setState({
      userNameProfile: userNameProfile,
      userAvatarProfile: userAvatarProfile,
      userIdProfile: userIdProfile,
    });

    //lít danh sach
    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('idUser')
      .equalTo(userIdProfile)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            productName: child.val().name,
            productDescription: child.val().description,
            productPrice: child.val().price,
            productImage: child.val().imageUrl1,
            productCategory: child.val().category,
            location: child.val().location,
            createAt: child.val().createAt,
            sold: child.val().sold,
          });
        });
        this.setState({
          listProduct: li,
          countProduct: li.length,
        });
      });

    //tinh so hang ban duọc

    //check follow
    const key = this.props.userId + '_' + userIdProfile;
    this.setState({keyFollwed: key});
    firebaseApp
      .database()
      .ref('Follows/')
      .orderByChild('myUserid_userId')
      .equalTo(key)
      .once('value', (snapshot) => {
        this.setState({isFollowed: snapshot.child('isFollowing').val()});
        //this.state.isFollowed = snapshot.child('isFollowing').val();
      });
  }

  clickFollowing = () => {};

  render() {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{uri: this.state.userAvatarProfile}}
            />
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.name}>{this.state.userNameProfile}</Text>
                {this.props.userId == this.state.userIdProfile ? null : (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => this.clickFollowing()}>
                    {this.state.isFollowed ? (
                      <Text style={styles.followButtonText}>Bỏ theo dõi</Text>
                    ) : (
                      <Text style={styles.followButtonText}>Theo dõi</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.nametxt}>
                  Sản phẩm {this.state.countProduct}
                </Text>
                <Text style={styles.nametxt}>Đã bán 2</Text>
                <Text style={styles.nametxt}>Người theo dõi 100</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={this.state.listProduct}
          renderItem={({item}) => (
            <TouchableOpacity
              underlayColor="rgba(73,182,77,0.9)"
              onPress={() =>
                this.props.navigation.navigate('Detail', {
                  idProduct: item.key,
                })
              }>
              <View style={styles.container}>
                <Image style={styles.photo} source={{uri: item.productImage}} />
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={{color: 'grey'}}>{item.productPrice} VND</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.key}`}
        /> */}

        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.listProduct}
          renderItem={({item}) => (
            <TouchableOpacity
              underlayColor="rgba(73,182,77,0.9)"
              onPress={() =>
                this.props.navigation.navigate('Detail', {
                  idProduct: item.key,
                })
              }>
              <View style={styles.containerCard}>
                <Image
                  style={styles.photoCard}
                  source={{uri: item.productImage}}
                />
                <Text style={styles.titleCard}>{item.productName}</Text>
                <View style={{flexDirection: 'row'}}>
                  {/* <AntDesign name="shoppingcart" size={24} color="red" /> */}
                  <Text style={styles.categoryCard}>
                    {item.productPrice} VND
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.key}`}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ProfileUser);

const styles = StyleSheet.create({
  containerCard: RecipeCard.container,
  photoCard: RecipeCard.photo,
  titleCard: RecipeCard.title,
  categoryCard: RecipeCard.category,
  formContent: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
  header: {
    flexDirection: 'column',
  },
  headerContent: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  followButton: {
    marginTop: 10,
    height: 30,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#ffffff',
  },
  name: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  nametxt: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 20,
    marginTop: 10,
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 130,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
