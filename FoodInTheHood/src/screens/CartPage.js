import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  GlobalStylesheet,
  Image,
  FlatList,
  Button,
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

  const Checkout = () => {
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
        // console.log('Success:', data.razorpay_payment_id);
        navigation.navigate('Payment');
      })
      .catch(error => {
        console.log('Error:', error.description);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View style={GlobalStyles.main}>
        <Image
          source={require('./images/cart.png')}
          style={GlobalStyles.profileImage}
        />
        <Text style={GlobalStyles.name1}>Your Cart Items</Text>

        <SafeAreaView>
          <FlatList
            // contentContainerStyle={{marginBottom: 50, paddingTop: 8}}
            data={cartData}
            renderItem={({item}) => (
              <SafeAreaView style={GlobalStyles.card}>
                <Icon
                  name="highlight-remove"
                  size={25}
                  style={GlobalStyles.icon}
                  onPress={() => removeItem(item.Key)}
                />
                <Text>{item.Item}</Text>
                <Text style={GlobalStyles.name}>
                  Restaurant: {item.Restaurant}
                </Text>
                <Text>Rs.{item.Price}</Text>
              </SafeAreaView>
            )}
          />
        </SafeAreaView>
        {/* <SafeAreaView>
          <TouchableOpacity
            style={GlobalStyles.submitButton}
            onPress={Checkout}>
            <Text style={GlobalStyles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </SafeAreaView> */}
      </View>

      <SafeAreaView>
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={Checkout}
          //   setIsVisible(true);

          //   CartData(
          //     // {Name: item.Restaurant_Name},
          //     {Cuisine: item.Cuisines},
          //     // {Price: price},
          //   );
          // }}>
        >
          <Text style={GlobalStyles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
