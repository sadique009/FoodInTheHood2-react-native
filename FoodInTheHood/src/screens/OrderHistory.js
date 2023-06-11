import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';

import {db} from '../firebase/config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ref, onValue, remove} from 'firebase/database';
const OrderHistory = ({navigation}) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // const [status, setStatus] = useState('Fetching the status of your order...');

  //

  useEffect(() => {
    onValue(ref(db, '/OrderHistory/'), querySnapshot => {
      let Data = Object.values(querySnapshot.val() || {});
      setOrderHistory(Data);
      console.log('Status:', Data.Status);
    });
    setOrderStatus('Order Placed');
  }, []);

  const removeItem = Data => {
    remove(ref(db, '/OrderHistory/' + Data));
  };

  return (
    <SafeAreaView>
      <FlatList
        data={orderHistory}
        renderItem={({item}) => (
          <SafeAreaView style={GlobalStyles.card}>
            {/* <Icon
              name="delete"
              size={35}
              color="red"
              style={GlobalStyles.icon}
              onPress={() => removeItem(item.Key)}
            /> */}
            <Text
              style={{
                margin: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.Item}
            </Text>

            <TouchableOpacity
              style={GlobalStyles.submitButton}
              onPress={() => {
                // setIsVisible(true), setStatus();
                navigation.navigate('Track Order');
                {
                  () => removeItem;
                }
              }}>
              <Text style={GlobalStyles.buttonText}>Track Order</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
};

export default OrderHistory;
