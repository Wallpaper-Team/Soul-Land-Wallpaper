import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ItemDetail from '../screens/ItemDetail';
import LikeScreen from '../screens/LikeScreen';
import ManagerSell from '../screens/ManagerSell';
import SellDetail from '../screens/SellDetail';

const StackSell = createStackNavigator(
  {
    Manager: {
      screen: ManagerSell,
      navigationOptions: {
        headerShown: true,
        title: 'Quản lý đơn hàng',
      },
    },
    SellDetail: {
      screen: SellDetail,
      navigationOptions: {
        headerShown: true,
        title: 'Chi tiết đơn hàng',
      },
    },
  }
);

export default createAppContainer(StackSell);
