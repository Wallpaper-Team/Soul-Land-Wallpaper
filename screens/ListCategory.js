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
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import {RecipeCard} from './AppStyles';

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      clickLikeItem: false,
      searchKey: '',
      category: '',
    };
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('category');
    this.setState({category: category});
    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('category')
      .equalTo(category)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl1
          });
        });
        this.setState({
          data: li,
          isLoading: false,
        });
      });
  }

  render() {
    return (
     
        <View >
            <Text style={{marginLeft: 20, marginTop: 10, fontSize: 20, fontWeight: 'bold', color: 'red'}}>{this.state.category}</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.data}
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
                  <Text style={styles.categoryCard}>{item.price} VND</Text>
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

export default connect(mapStateToProps, null)(ListCategory);

const styles = StyleSheet.create({
  containerCard: RecipeCard.container,
  photoCard: RecipeCard.photo,
  titleCard: RecipeCard.title,
  categoryCard: RecipeCard.category,
});

