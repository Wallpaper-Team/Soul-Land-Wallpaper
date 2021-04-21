import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import CITIES from '../constants/Cities';

class EditProfileUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userName}></TextInput>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userEmail}
          readonly></TextInput>
        <Text style={styles.title}>Phone</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userPhone}></TextInput>
        <Text style={styles.title}>Select location</Text>
        <View style={{marginLeft: 20}}>
          <RNPickerSelect
            onValueChange={(value) => this.setState({location: value})}
            items={CITIES}
            placeholder={{
              label: 'Select a city...',
              value: this.state.location,
            }}
            value={this.state.location}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(EditProfileUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  title: {
    marginLeft: 20,
    marginTop: 10,
  },
  location: {
    fontSize: 15,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
