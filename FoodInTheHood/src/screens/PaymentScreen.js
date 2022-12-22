import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  Button,
  TouchableOpacity,
  View,
  Text,
  GlobalStylesheet,
} from 'react-native';
import {db} from '../firebase/config';
import {ref, onValue, push, remove} from 'firebase/database';
import {GlobalStyles} from '../../GlobalStyles';

const PaymentScreen = ({navigation}) => {
  const [isVisible, setIsVible] = useState(false);
  const [CartData, setCartData] = useState([]);
  const handleOrderPlaced = () => {
    Alert.alert(
      'Confirmation',
      'Your order has been successfully placed. Thanks for using our service.',
    );
    onValue(ref(db, '/CartData/'), querySnapshot => {
      let Data = Object.values(querySnapshot.val() || {});
      setCartData(Data);
    });
    push(ref(db, '/OrderHistory/'), {
      CartData,
      Order_Time: new Date().toLocaleString(),
    });
    setIsVible(true);
    console.log('Current Date:', new Date().toLocaleString());
  };

  return (
    <>
      <SafeAreaView>
        <Text
          style={{
            margin: 20,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Hurray! Your payment was succesful.
        </Text>
        {/* <Button title="Place Order" onPress={() => handleOrderPlaced()} /> */}
      </SafeAreaView>
      <SafeAreaView style={GlobalStyles.BottomButtonView}>
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={() => navigation.navigate('Order History')}>
          <Text style={GlobalStyles.buttonText}>Track Order</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;
