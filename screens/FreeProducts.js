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

class FreeProducts extends React.Component {
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
    firebaseApp
      .database()
      .ref(`Products/`)
      .orderByChild('price')
      .equalTo('0')
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl1,
         
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
      <>
        <>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color="#000" />
          )}
        </>
      
          <View>
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
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(FreeProducts);

const styles = StyleSheet.create({
  containerCard: RecipeCard.container,
  photoCard: RecipeCard.photo,
  titleCard: RecipeCard.title,
  categoryCard: RecipeCard.category,
});
