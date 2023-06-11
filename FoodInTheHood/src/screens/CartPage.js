import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {db} from '../firebase/config';
import {ref, onValue, remove} from 'firebase/database';
import {GlobalStyles} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';

export const CartPage = ({navigation}) => {
  const [cartData, setCartData] = useState([]);

  const fetchData = () => {
    onValue(ref(db, '/CartData/'), querySnapshot => {
      let Data = Object.values(querySnapshot.val() || {});
      setCartData(Data);
    });
  };

  const removeItem = key => {
    remove(ref(db, '/CartData/' + key));
  };

  const removeAll = Data => {
    remove(ref(db, '/CartData/' + Data));
  };
  function combined() {
    payment();
    removeAll();
  }

  const payment = () => {
    var options = {
      description: 'Order bill',
      image: '',
      currency: 'INR',
      key: 'rzp_test_ihyN942As43mJi',
      amount: '200',
      name: 'FoodInTheHood',
      prefill: {
        email: 'msn@gmail.com',
        contact: '1000000000',
        name: 'annonymous',
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('Success:', data.razorpay_payment_id);
        navigation.navigate('Payment');
      })
      .catch(error => {
        console.log('Error:', error.description);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !cartData.length ? (
    <>
      <Text
        style={{
          margin: 15,
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 'bold',

        }}>
        Your cart is empty...
      </Text>
    </>
  ) : (
    <>
      <View style={GlobalStyles.main}>
        <Image
          source={require('./images/cart.png')}
          style={GlobalStyles.profileImage}
        />
        <Text style={GlobalStyles.name1}>Your Cart Items</Text>

        <FlatList
          data={cartData}
          renderItem={({item}) => (
            <View style={GlobalStyles.card}>
              <Icon
                name="delete"
                size={35}
                color="red"
                style={GlobalStyles.icon}
                onPress={() => removeItem(item.Key)}
              />
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {item.Item}
              </Text>
              {/* <Text style={GlobalStyles.name}>{item.Restaurant}</Text> */}
            </View>
          )}
        />
      </View>

      <SafeAreaView>
        <TouchableOpacity style={GlobalStyles.submitButton} onPress={payment}>
          <Text style={GlobalStyles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );

  // alternate code

  // if (cartData.length === 0) {
  //   return (
  //     <>
  //       <Text
  //         style={{
  //           margin: 15,
  //           textAlign: 'center',
  //           fontSize: 30,
  //           fontWeight: 'bold',
  //         }}>
  //         Your cart is empty...
  //       </Text>
  //     </>
  //   );
  // } else if (cartData.length === 1) {
  //   return (
  //     <>
  //       <View style={GlobalStyles.main}>
  //         <Image
  //           source={require('./images/cart.png')}
  //           style={GlobalStyles.profileImage}
  //         />
  //         <Text style={GlobalStyles.name1}>Your Cart Items</Text>

  //         <FlatList
  //           data={cartData}
  //           renderItem={({item}) => (
  //             <View style={GlobalStyles.card}>
  //               <Icon
  //                 name="delete"
  //                 size={35}
  //                 color="red"
  //                 style={GlobalStyles.icon}
  //                 onPress={() => removeItem(item.Key)}
  //               />
  //               <Text
  //                 style={{
  //                   margin: 10,
  //                   textAlign: 'center',
  //                   fontSize: 15,
  //                   fontWeight: 'bold',
  //                 }}>
  //                 {item.Item}
  //               </Text>
  //               {/* <Text style={GlobalStyles.name}>{item.Restaurant}</Text> */}
  //             </View>
  //           )}
  //         />
  //       </View>

  //       <SafeAreaView>
  //         <TouchableOpacity style={GlobalStyles.submitButton} onPress={payment}>
  //           <Text style={GlobalStyles.buttonText}>Checkout</Text>
  //         </TouchableOpacity>
  //       </SafeAreaView>
  //     </>
  //   );
  // } else {
  //   return (
  //     <View>
  //       <Text
  //         tyle={{
  //           margin: 15,
  //           textAlign: 'center',
  //           fontSize: 30,
  //           fontWeight: 'bold',
  //         }}>
  //         Your cart already has dishes from some other restaurant. Please remove
  //         them to proceed further.
  //       </Text>
  //     </View>
  //   );
  // }
};
