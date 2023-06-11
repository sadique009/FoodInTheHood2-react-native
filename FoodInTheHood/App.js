import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MapScreen from './src/screens/MapScreen';
import {SettingScreen} from './src/screens/SettingScreen';
import Splash from './src/screens/Splash';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {RestaurantDetail} from './src/screens/RestaurantDetail';
import OrderHistory from './src/screens/OrderHistory';
import PaymentScreen from './src/screens/PaymentScreen';
import MainPage from './src/screens/MainPage';
import {CartPage} from './src/screens/CartPage';
import TrackOrder from './src/screens/TrackOrder';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function App({navigation}) {
  const Stack = createStackNavigator();
  // const Tab = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'skyblue',
            },
          }}
          cardShadowEnabled="true"
          initialRouteName="Splash"
          component={Splash}>
          <Stack.Screen
            options={{headerLeft: () => null}}
            name="Login Page"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerMode: 'none'}}
            name="Splash"
            component={Splash}
          />
          <Stack.Screen name="Register Page" component={RegisterScreen} />
          <Stack.Screen
            options={{headerLeft: () => null}}
            name="Main Page"
            component={MainPage}
          />
          <Stack.Screen
            name="Restaurant Detail Page"
            component={RestaurantDetail}
          />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="Maps" component={MapScreen} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Order History" component={OrderHistory} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Track Order" component={TrackOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
