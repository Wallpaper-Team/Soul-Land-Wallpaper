import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FlatListItem from '../Components/FlatListItem';
import HomeScreen from '../screens/HomeScreen';
import ItemDetailHome from '../screens/ItemDetailHome';

const StackItemDetail = createStackNavigator({
  List: {
    screen: HomeScreen,
  },
  Detail: {
    screen: ItemDetailHome,
  },
});

export default createAppContainer(StackItemDetail);
