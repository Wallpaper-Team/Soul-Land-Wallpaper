import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

export default class ModalBuyItem extends React.Component {
  showAddModal = () => {
    this.refs.modalBuyItem.open();
  };

  render() {
    const {visible, onCloseModal, onChangeAmount, item} = this.props;
    return (
      <Modal
        ref={'modalBuyItem'}
        backdropPressToClose={false}
        style={styles.modal}
        position="center"
        backdrop={true}
        isOpen={visible}>
        <Text style={styles.textName}>Iphone x</Text>
        <Text style={styles.text}>12 $</Text>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    borderRadius: 10,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 280,
  },
  containerView: {
    width: 350,
    marginTop: 20,
    marginLeft: 30,
    height: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    margin: 20,
    borderRadius: 10,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3897f1',
    marginLeft: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 15,
  },
  clickConfirm: {
    backgroundColor: '#3897f1',
    borderColor: '#3897f1',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    margin: 20,
  },
  textConfirm: {
    color: '#ffffff',
    margin: 5,
  },
  button: {
    margin: 20,
    backgroundColor: '#3399ff',
    height: 40,
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
});
