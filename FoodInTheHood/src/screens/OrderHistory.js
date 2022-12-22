import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';
const OrderHistory = ({navigation}) => {
  const [status, setStatus] = useState('Fetching the status of your order...');

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      Alert.alert('Yay!', 'Your order is ready');
    }, 3000);
    return () => clearTimeout(timeout1);
  }, []);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      Alert.alert('Congratulations', 'Your order is dispatched');
    }, 6000);
    setStatus('Thank you for ordering!');
    return () => clearTimeout(timeout2);
  }, []);

  return (
    <View>
      <Text
        style={{
          margin: 25,
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
        }}>
        {status}
      </Text>
      <TouchableOpacity
        style={GlobalStyles.submitButton}
        onPress={() => {
          navigation.navigate('Main Page');
        }}>
        <Text style={GlobalStyles.buttonText}>Go To Main Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderHistory;
