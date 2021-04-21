import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const StartUpScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('$userAccount');

        if (!userData) {
          props.navigation.navigate('Auth');
          return;
        }
        const transData = JSON.parse(userData);
        const {email, password} = transData;
        props.navigation.navigate('Auth', {email: email, password: password});
      } catch (err) {
        console.log(err.message);
      }
    };
    setIsLoading(true);
    tryLogin().then(setIsLoading(false));
  }, [setIsLoading]);

  return (
    <View style={styles.screen}>
      {isLoading && <ActivityIndicator size="large" color="white" />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartUpScreen;
