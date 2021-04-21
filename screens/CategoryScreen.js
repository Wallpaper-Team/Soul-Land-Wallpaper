import React from 'react';
import { TouchableOpacity } from 'react-native';
import {FlatList, Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';


const categories = [
  {
    label: 'Thời trang',
    value: 'Thời trang',
    image:
      'https://cdn.gumac.vn//image/01/thang-9-2019/bst-thg-9-2019/anhbia060920191601356149.jpg',
    id: 1,
  },
  {
    label: 'Điện thoại',
    value: 'Điện thoại',
    image:
      'https://file1.dangcongsan.vn/data/0/images/2020/09/21/ctvbandoc/dienthoai.jpg',
    id: 2,
  },
  {
    label: 'Đồ gia dụng',
    value: 'Đồ gia dụng',
    image:
      'https://www.sapo.vn/blog/wp-content/uploads/2018/01/the-gioi-do-gia-dung-min.jpg',
    id: 3,
  },
  {
    label: 'Bàn ghế',
    value: 'Bàn ghế',
    image:
      'https://kdtvn.com/wp-content/uploads/2019/12/sofa-chu-u-sang-trong.jpg',
    id: 4,
  },
  {
    label: 'Máy móc văn phòng',
    value: 'Máy móc văn phòng',
    image:
      'https://anhoatech.vn/Uploads/logos/14102019/News/201014144751-thiet-bi-van-phong-chinh-hang.jpg',
    id: 5,
  },
  {
    label: 'Đồ gỗ',
    value: 'Đồ gỗ',
    image:
      'https://noithathoaphat.info.vn/wp-content/uploads/2017/06/ban-ghe-go-thong-01.jpg',
    id: 6,
  },
  {
    label: 'Đồ điện tử',
    value: 'Đồ điện tử',
    image:
      'https://nguonthanhly.com/wp-content/uploads/2019/01/mua-ban-thanh-ly-thiet-bi-dien-tu-dien-gia-dung-gia-re-tphcm-nguonthanhly.jpg',
    id: 7,
  },
  {
    label: 'Điều hòa - Ti vi - Tủ lạnh',
    value: 'Điều hòa - Ti vi - Tủ lạnh',
    image:
      'https://dienmaythienphu.vn/wp-content/uploads/2021/02/dien-lanh.jpg',
    id: 7,
  },
];



export default class CategoryScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={({item}) => (
            <TouchableOpacity
             
              onPress={() =>
                this.props.navigation.navigate('Listcateogory', {
                  category: item.label,
                })
              }>
              <View style={styles.categoriesItemContainer}>
                <Image
                  style={styles.categoriesPhoto}
                  source={{uri: item.image}}
                />
                <Text style={styles.categoriesName}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8,
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
});