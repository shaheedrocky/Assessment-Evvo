import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../../../screens/auth/Login';
import Home from '../../../screens/Home';
import {useSelector} from 'react-redux';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const User = useSelector(state => state?.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!User ? (
          <Stack.Screen name="login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
