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
import {ref, onValue, push, update, remove} from 'firebase/database';
import {GlobalStyles} from '../../GlobalStyles';

const PaymentScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);

  function goTo() {
    navigation.navigate('Order History');
  }

  const handler = () => {
    onValue(ref(db, '/CartData/'), querySnapshot => {
      let Data = Object.values(querySnapshot.val() || {});
      setOrderData(Data);
    });

    orderData.forEach(data => {
      push(ref(db, '/OrderHistory/'), {
        Item: data.Item,
        Key: data.Item,
        // Order_Time: new Date().toLocaleString(),
        // Status: 'Order Placed',
      });
    });
    setIsVisible(true);
  };
  

  function combined() {
    goTo();
    handler();
  }
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
        <TouchableOpacity style={GlobalStyles.submitButton} onPress={handler}>
          <Text style={GlobalStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={GlobalStyles.BottomButtonView}>
        {isVisible && (
          <TouchableOpacity style={GlobalStyles.submitButton} onPress={goTo}>
            <Text style={GlobalStyles.buttonText}>Go To Order History</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;
