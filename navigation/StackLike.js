import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ItemDetail from '../screens/ItemDetail';
import LikeScreen from '../screens/LikeScreen';

const StackLike = createStackNavigator(
  {
    List: {
      screen: LikeScreen,
      navigationOptions: {
        headerShown: true,
      },
    },
    Detail: {
      screen: ItemDetail,
    },
  },
  {
    headerMode: 'Favorite',
    navigationOptions: {
      headerShown: true,
    },
  },
);

export default createAppContainer(StackLike);
