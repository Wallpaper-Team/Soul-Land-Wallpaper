import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import StackEditProduct from './StackEditProduct';

const UserTopNavigator = createMaterialTopTabNavigator(
  {
    Listing: {
      screen: StackEditProduct,
      navigationOptions: {
        tabBarLabel: 'Danh mục',
      },
    },
    Following: {
      screen: FollowingScreen,
      navigationOptions: {
        tabBarLabel: 'Đang theo dõi',
      },
    },
    Followers: {
      screen: FollowersScreen,
      navigationOptions: {
        tabBarLabel: 'Người theo dõi',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#D4AF37',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 10,
      },
    },
  },
);

export default createAppContainer(UserTopNavigator);
