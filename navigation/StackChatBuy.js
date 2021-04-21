import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ChatRoomsScreenBuy from '../screens/ChatRoomsScreenBuy';
import ChatScreen from '../screens/ChatScreen';

const StackChatBuy = createStackNavigator(
  {
    ChatRooms: ChatRoomsScreenBuy,
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  {
    defaultNavigationOptions: {
      title: 'Chat',
      headerShown: false,
    },
  },
);

export default createAppContainer(StackChatBuy);
