import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ChartScreen from '../screens/ChartScreen';
import EditProduct from '../screens/EditProduct';
import EditProfileUser from '../screens/EditProfileUser';
import FindFriendScreen from '../screens/FindFriendScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import FriendProfile from '../screens/FriendProfile';
import ListtingScreen from '../screens/ListtingScreen';
import UserScreen from '../screens/UserScreen';

import StackBuy from './StackBuy';

import StackSell from './StackSell';

const StackUser = createStackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
  Profile: {
    screen: EditProfileUser,
  },
  Find: {
    screen: FindFriendScreen,
    navigationOptions: {
      title: 'Tìm kiếm bạn bè',
    },
  },
  Sell: {
    screen: StackSell,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
  Buy: {
    screen: StackBuy,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
  Followers: {
    screen: FollowersScreen,
    navigationOptions: {
      title: 'Người theo dõi',
    },
  },
  Following: {
    screen: FollowingScreen,
    navigationOptions: {
      title: 'Đang theo dõi',
    },
  },
  List: {
    screen: ListtingScreen,
    navigationOptions: {
      title: 'Danh mục sản phẩm',
    },
  },
  Active: {
    screen: ChartScreen,
  },
  Edit: {
    screen: EditProduct,
    navigationOptions: {
      title: 'Sửa thông tin sản phẩm',
    },
  },
  ProfileFriend: {
    screen: FriendProfile,
    navigationOptions: {
      title: 'Shop',
    },
  },
});

export default createAppContainer(StackUser);
