import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class ButtonChat extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.textBtn}>Chat</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textBtn: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginBtn: {
    width: '45%',
    backgroundColor: '#00cc66',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
  },
});
