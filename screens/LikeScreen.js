import database from '@react-native-firebase/database';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';


class LikeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLike: '',
      key: '',
      recommendation: [],
    };
  }

  componentDidMount() {
    database()
      .ref('Likes')
      .orderByChild('uid')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const li = [];
        const likedCategories = [];
        snapshot.forEach((child) => {
          if (child.val().isLiked) {
            li.push({
              key: child.key,
              productName: child.val().productName,
              productDescription: child.val().productDescription,
              productPrice: child.val().productDescription,
              productImage1: child.val().productImage1,
              isLiked: child.val().isLiked,
            });
            if (likedCategories.indexOf(child.val().productCategory) == -1)
              likedCategories.push(child.val().productCategory);
          }
        });
        this.setState({
          data: li,
        });
        //recommend
        this.setState({
          recommendation: [],
        });
        likedCategories.map((category) => {
          const list = [];
          database()
            .ref('Products')
            .orderByChild('category')
            .equalTo(category)
            .limitToFirst(3)
            .on('value', (snapshot) => {
              snapshot.forEach((child) => {
                list.push({
                  key: child.key,
                  productName: child.val().name,
                  productDescription: child.val().description,
                  productPrice: child.val().price,
                  productImage1: child.val().imageUrl1,
                  isLiked: false,
                });
              });
              this.setState({
                recommendation: this.state.recommendation.concat(list),
              });
            });
        });
      });
  }

  render() {
    return (
      <ScrollView>
        <SectionItem title="Các sản phẩm đã thích" data={this.state.data} />
        <SectionItem title="Có thể bạn thích" data={this.state.recommendation} />
      </ScrollView>
    );
  }
}

const SectionItem = (props) => {
  const clickLike = (key) => {
    database().ref(`Likes/${key}`).update({
      isLiked: false,
    });
  };
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.textHeader}>{props.title}</Text>
      </View>
      <FlatList
        enableEmptySections={true}
        data={props.data}
        keyExtractor={(item) => {
          return item.key;
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Không có sản phẩm nào</Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.box}>
              <Image style={styles.image} source={{uri: item.productImage1}} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text
                  style={styles.description}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.productDescription}
                </Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() => {
                      clickLike(item.key);
                    }}>
                    {item.isLiked && (
                      <Image
                        style={styles.icon}
                        source={require('../assets/icons/heart(1).png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(LikeScreen);

const styles = StyleSheet.create({
  screen: {flex: 1},
  header: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#1E90FF',
  },
  message: {
    backgroundColor: '#228B22',
  },
});
