import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProduct from '../screens/EditProduct';
import ListtingScreen from '../screens/ListtingScreen';

const StackEditProduct = createStackNavigator({
  List: {
    screen: ListtingScreen,
    navigationOptions: {
      headerShown: false,
     
    },
  },
  Edit: {
    screen: EditProduct,
    navigationOptions: {
      title: 'Sửa thông tin sản phẩm',
    },
  },
});

export default createAppContainer(StackEditProduct);
