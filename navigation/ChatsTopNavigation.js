import Entypo from 'react-native-vector-icons/Entypo';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import StackChat from './StackChat';
import StackChatBuy from './StackChatBuy';
import StackNotify from './StackNotify';

const ChatsTopNavigation = createMaterialTopTabNavigator(
  {
    Sell: {
      screen: StackChat,
      navigationOptions: {
        tabBarLabel: 'Bán',
        
      },
    },
    Buy: {
      screen: StackChatBuy,
      navigationOptions: {
        tabBarLabel: 'Mua',
      },
    },
    Notify: {
      screen: StackNotify,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        
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
        fontSize: 16,
       
      },
    },
  },
);

export default createAppContainer(ChatsTopNavigation);
