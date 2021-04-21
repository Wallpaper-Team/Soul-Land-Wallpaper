import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class CardItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.onPress}>
        <Image
          source={require('../assets/icons/iphonex.jpg')}
          style={styles.image}
        />
        <View style={{marginTop: 10}}>
          <Text style={styles.title}>{this.props.nameItem}</Text>
          <Text style={styles.price}>{this.props.priceItem}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 5,
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 100,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
