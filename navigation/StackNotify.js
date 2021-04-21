import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ItemDetail from '../screens/ItemDetail';
import LikeScreen from '../screens/LikeScreen';
import MyComment from '../screens/MyComment';
import NotificationScreen from '../screens/NotificationScreen';

const StackNotify = createStackNavigator({
  AllNotify: {
    screen: NotificationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  myCmt: {
    screen: MyComment,
    navigationOptions: {
      headerShown: true,
      title: 'Bình luận của bạn'
    },
  },
});

export default createAppContainer(StackNotify);
