// GIT COMMANDS
// git add -A
// git commit -m "commit-message (replace this by your commit message)"
// git push -u origin master

// Build apk run without metro
// react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
// ./gradlew assembleDebug

// Fix bug ps1
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned

import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import Articles from './screens/Articles';
import ChartScreen from './screens/ChartScreen';
import ManagerBuy from './screens/ManagerBuy';
import NotificationScreen from './screens/NotificationScreen';
import OrderScreen from './screens/OrderScreen';
import RatingProduct from './screens/RatingProduct';
import TestScreen from './screens/TestScreen';

import authReducer from './store/reducers/auth';
import chatsReducer from './store/reducers/chats';
import notificationsReducer from './store/reducers/notifications';
import usersReducer from './store/reducers/users';

const rootReducer = combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
    //<TestScreen/>
    //<ChartScreen/>
  );
};

export default App;
