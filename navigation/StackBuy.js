import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BuyConfirm from '../screens/BuyConfirm';
import ItemDetail from '../screens/ItemDetail';
import LikeScreen from '../screens/LikeScreen';
import ManagerBuy from '../screens/ManagerBuy';
import ManagerSell from '../screens/ManagerSell';
import RatingProduct from '../screens/RatingProduct';
import SellDetail from '../screens/SellDetail';

const StackSell = createStackNavigator({
  ManagerBuy: {
    screen: ManagerBuy,
    navigationOptions: {
      headerShown: true,
      title: 'Quản lý đơn mua',
    },
  },
  BuyDetail: {
    screen: BuyConfirm,
    navigationOptions: {
      headerShown: true,
      title: 'Chi tiết đơn hàng mua',
    },
  },
  Rating: {
    screen: RatingProduct,
    navigationOptions: {
      headerShown: true,
      title: 'Đánh giá sản phẩm',
    },
  },
});

export default createAppContainer(StackSell);
