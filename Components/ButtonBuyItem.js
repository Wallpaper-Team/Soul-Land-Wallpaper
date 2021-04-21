import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class ButtonBuyItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.loginBtn} onPress={this.props.onPress}>
        <Text style={styles.textBtn}>Buy now</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  textBtn: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '45%',
    backgroundColor: '#fb5b5a',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
