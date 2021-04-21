import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import AppNavigator from './AppNavigator';

const NavigationContainer = (props) => {
  const navRef = useRef();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token === null) {
      navRef.current.dispatch(
        NavigationActions.navigate({routeName: 'Startup'}),
      );
    }
  }, [token]);

  return <AppNavigator ref={navRef} />;
};

export default NavigationContainer;
