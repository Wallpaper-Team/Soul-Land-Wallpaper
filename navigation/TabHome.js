import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import StackCreateProduct from './StackCreateProduct';
import StackLike from './StackLike';
import StackProductDetail from './StackProductDetail';
import StackUser from './StackUser';
import ChatsTopNavigation from '../navigation/ChatsTopNavigation';

const TabHome = createBottomTabNavigator(
  {
    Home: StackProductDetail,
    Like: StackLike,
    Camera: StackCreateProduct,
    Chat: ChatsTopNavigation,
    User: StackUser,
  },

  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor, size}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Home') {
          return <Entypo name="home" size={30} color={tintColor} />;
        } else if (routeName === 'Like') {
          return <Entypo name="heart" size={30} color={tintColor} />;
        } else if (routeName === 'Camera') {
          return <Entypo name="circle-with-plus" size={30} color={tintColor} />;
        } else if (routeName === 'Chat') {
          return <Ionicons name="chatbox" size={30} color={tintColor} />;
        } else if (routeName === 'User') {
          return <FontAwesome name="user-circle" size={30} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
);

export default createAppContainer(TabHome);
