import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import {RecipeCard} from './AppStyles';

const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;
class ListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const userId = this.props.userId;
    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('idUser')
      .equalTo(userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            productName: child.val().name,
            productDescription: child.val().description,
            productPrice: child.val().price,
            productImage: child.val().imageUrl1,
            location: child.val().location,
            createAt: child.val().createAt,
          });
        });

        this.setState({data: li, isLoading: true});
      });
  }

  selectProductEdit = (key) => {
    Alert.alert(
      'Sửa thông tin sản phẩm',
      '',
      [
        {
          text: 'Xóa sản phẩm',
          onPress: () => {
            Alert.alert(
              'Cảnh báo',
              'Bạn có chắc muốn xóa không?',
              [
                {
                  text: 'Không',
                  onPress: () => console.log('Cancel'),
                  style: 'cancel',
                },
                {
                  text: 'Có',
                  onPress: () => {
                    firebaseApp.database().ref(`Products/${key}`).remove();
                    this.setState({
                      isLoading: true,
                    });
                    alert('Bạn đã xóa thành công');
                  },
                },
              ],
              {cancelable: false},
            );
          },
        },
        {
          text: 'Sửa thông tin',
          onPress: () => {
            this.props.navigation.navigate('Edit', {
                key: key
            })
          },
        },
      ],
      {cancelable: true},
      {
        onDismiss: () => {
          console.log('Dismissed');
        },
      },
    );
  };

  render() {
    return (
      <View style = {{backgroundColor: '#ffffff', flex: 1}}>
        {this.state.isLoading == false ? (
          <ActivityIndicator size="large" />
        ) : (
          // <FlatList
          //   vertical
          //   showsVerticalScrollIndicator={false}
          //   numColumns={3}
          //   data={this.state.data}
          //   renderItem={({item}) => (
          //     <TouchableOpacity
          //       underlayColor="rgba(73,182,77,0.9)"
          //       onPress={() => this.selectProductEdit(item.key)}>
          //       <View style={styles.container}>
          //         <Image
          //           style={styles.photo}
          //           source={{uri: item.productImage}}
          //         />
          //         <Text style={styles.title}>{item.productName}</Text>
          //         <Text style={{color: 'grey'}}>{item.productPrice} VND</Text>
          //       </View>
          //     </TouchableOpacity>
          //   )}
          //   keyExtractor={(item) => `${item.key}`}
          // />
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                underlayColor="rgba(73,182,77,0.9)"
                onPress={() =>
                  this.selectProductEdit(item.key)}
                >
                <View style={styles.containerCard}>
                  <Image
                    style={styles.photoCard}
                    source={{uri: item.productImage}}
                  />
                  <Text style={styles.titleCard}>{item.productName}</Text>
                  <Text style={styles.categoryCard}>
                    {item.productPrice} VND
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.key}`}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ListingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerCard: RecipeCard.container,
  photoCard: RecipeCard.photo,
  titleCard: RecipeCard.title,
  categoryCard: RecipeCard.category,
  formContent: {
    flexDirection: 'row',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#d9d9d9',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
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
