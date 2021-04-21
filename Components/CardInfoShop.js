import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardInfoShop = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/icons/avatar.png')}
          style={styles.image}
        />
        <Text style={styles.title}>{userName}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        <Text>List</Text>
        <Text>Sold</Text>
        <Text>Rating</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardInfoShop;

const styles = StyleSheet.create({
  card: {
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
