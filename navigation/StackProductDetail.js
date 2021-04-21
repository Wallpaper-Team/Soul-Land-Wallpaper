import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CategoryScreen from '../screens/CategoryScreen';
import ChatScreen from '../screens/ChatScreen';
import FreeProducts from '../screens/FreeProducts';
import HomeScreen from '../screens/HomeScreen';
import ListCategory from '../screens/ListCategory';
import OrderScreen from '../screens/OrderScreen';
import OrderSuccess from '../screens/OrderSuccess';

import ProductDetail from '../screens/ProductDetail';
import ProfileUser from '../screens/ProfileUser';

const StackProductDetail = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Detail: {
    screen: ProductDetail,
    navigationOptions: {
      title: 'Thông tin sản phẩm',
    },
  },
  UserProfile: {
    screen: ProfileUser,
    navigationOptions: {
      title: 'Thông tin',
    },
  },
  ChatRoom: {
    screen: ChatScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      headerShown: true,
      title: 'Phân loại',
    },
  },
  Listcateogory: {
    screen: ListCategory,
    navigationOptions: {
      headerShown: true,
      title: 'Danh mục',
    },
  },

  Order: {
    screen: OrderScreen,
    navigationOptions: {
      headerShown: true,
      title: 'Đặt hàng',
    },
  },
  OrderSuccess: {
    screen: OrderSuccess,
    navigationOptions: {
      headerShown: false,
      title: 'Đặt hàng',
    },
  },
  Free: {
    screen: FreeProducts,
    navigationOptions: {
   
      title: 'Mặt hàng giá 0 đồng',
    },
  },
});

export default createAppContainer(StackProductDetail);
