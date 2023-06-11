import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';

export default function TrackOrder({navigation}) {
  const [orderStatus, setOrderStatus] = useState(
    'Congratulations! Order has been placed!',
  );
  const [isVisible, setIsVisible] = useState(false);
  const setStatus = () => {
    setTimeout(() => {
      setOrderStatus('Wow! Your order has been dispatched!');
    }, 4000);
    setTimeout(() => {
      setOrderStatus('Superb! Your order is delivered!');
    }, 10000);
  };

  return (
    <>
      <View>
        <Text
          style={{
            margin: 20,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Welcome to Order Tracking Section...
        </Text>
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={() => {
            setStatus(), setIsVisible(true);
          }}>
          <Text style={GlobalStyles.buttonText}>Track</Text>
        </TouchableOpacity>
        {isVisible && (
          <View>
            <Text
              style={{
                marginTop: 30,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Tracking your order....
            </Text>
            <Text
              style={{
                margin: 15,
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'maroon',
              }}>
              {orderStatus}
            </Text>
          </View>
        )}
      </View>
      <SafeAreaView>
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={() => {
            navigation.navigate('Main Page');
          }}>
          <Text style={GlobalStyles.buttonText}>Go Back To Main Page</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
