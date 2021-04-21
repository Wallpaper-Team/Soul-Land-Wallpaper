import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import CardInfoShop from '../Components/CardInfoShop';
import ModalBuyItem from '../Components/ModalBuyItem';
export default class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree', // Network image
        // Local image
      ],
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            currentImageEmitter={(index) =>
              console.warn(`current pos is: ${index}`)
            }
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            Iphone X - 12$
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <ButtonBuyItem
              onPress={() => this.refs.modalBuyItem.showAddModal()}
            />
            <ButtonChat />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              padding: 5,
              borderRadius: 10,
              backgroundColor: '#ffffff',
            }}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla
            </Text>
          </View>
          <CardInfoShop />
          <ModalBuyItem ref={'modalBuyItem'} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
