import {View, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GlobalStyles} from '../../GlobalStyles';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login Page');
    }, 3000);
  }, []);

  return (
    <View style={GlobalStyles.splash}>
      <Image
        source={require('./images/splash.png')}
        style={GlobalStyles.splashImage}
      />
    </View>
  );
};

export default Splash;
