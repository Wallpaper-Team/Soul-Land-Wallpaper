import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from '../screens/CameraScreen';
import CategoryScreen from '../screens/CategoryScreen';

const StackCreateProduct = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    Category: {
      screen: CategoryScreen,
    },
  },
  {
    headerMode: 'Camera',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackCreateProduct);
