import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import {RecipeCard} from './AppStyles';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';

const images = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
];

class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      clickLikeItem: false,
      searchKey: '',
    };
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('Products')
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl1,
            isLike: false,
          });
        });
        this.setState({
          data: li,
          isLoading: false,
        });
      });
  }

  filterProduct() {
    const list = this.state.data.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(this.state.searchKey.toLowerCase()) !==
        -1
      );
    });
    return list;
  }

  chooseLocal(val) {
    if (val == 'Phân loại') {
      this.props.navigation.navigate('Category');
    } else if (val == 'Khu vực') {
    } else if (val == 'Gía 0 đồng') {
      this.props.navigation.navigate('Free');
    }
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
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Icon name="search" style={styles.inputIcon} />
              <TextInput
                style={styles.inputs}
                placeholder="Tìm kiếm"
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.setState({searchKey: text})}
              />
            </View>
          </View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={() => this.props.navigation.navigate('Category')}>
              <Text style={styles.shareBtnText}>Phân loại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareBtn}
              onPress={() => this.props.navigation.navigate('Free')}>
              <Text style={styles.shareBtnText}>Giá 0 đồng</Text>
            </TouchableOpacity>
          </View>
          {/* <ButtonToggleGroup
            highlightTextColor={'red'}
            inactiveBackgroundColor={'tomato'}
            inactiveTextColor={'tomato'}
            values={['Phân loại', 'Gía 0 đồng']}
            onSelect={(val) => this.chooseLocal(val)}
          /> */}

          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.filterProduct()}
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
                    source={{uri: item.imageUrl}}
                  />
                  <Text style={styles.titleCard}>{item.name}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name="shoppingcart" size={24} color="red" />
                    <Text style={styles.categoryCard}>{item.price} VND</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.key}`}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(LocalScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shareBtn: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderColor: '#ffffff',
    borderWidth: 0.5,
    width: '50%',
    paddingTop: 10,
    paddingBottom: 10,
    
  },
  shareBtnText: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 5,
  },
  addToCarContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  
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
