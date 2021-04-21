import React, {useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneNumberInput = (props) => {
  const [value, setValue] = useState('');
  const phoneInput = useRef(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="VN"
            layout="first"
            onChangeText={(text) => {
              const contryCode = phoneInput.current?.getCallingCode() || '';
              props.onChangeText('+' + contryCode + text);
              setValue(text);
            }}
            countryPickerProps={{withAlphaFilter: true}}
            placeholder= 'Sô điện thoại'
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhoneNumberInput;
