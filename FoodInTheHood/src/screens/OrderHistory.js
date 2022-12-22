import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';
const OrderHistory = ({navigation}) => {
  return (
    <View>
      <Text
        style={{
          margin: 25,
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
        }}>
        Your Past Orders
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
