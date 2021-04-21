import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';

const StackChat = createStackNavigator(
  {
    ChatRooms: ChatRoomsScreen,
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

export default createAppContainer(StackChat);
