import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  GlobalStylesheet,
  FlatList,
  Image,
  View,
  Alert,
  Button,
} from 'react-native';
import {List} from 'react-native-paper';
import MainPage from './MainPage';

import {SafeAreaView} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';
import {db} from '../firebase/config';
import {ref, push, update} from 'firebase/database';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const RestaurantDetail = ({route, navigation}) => {
  const {id} = route.params;

  const [restaurant, setRestaurant] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const price = 200;

  useEffect(() => {
    fetch('https://api.npoint.io/c1336d3f8d08ae53247f')
      .then(res => res.json())
      .then(data => filterData(data));

    const filterData = Data => {
      const filteredData = Data.filter(item => {
        return item.Restaurant_ID == id;
      });
      setRestaurant(filteredData);
    };
  }, []);

  // const addItem = data => {
  //   const getItem = data.filter(i => {
  //     return i.Cuisines == cuisine;
  //   });
  //   setCart(getItem);
  // };

  const CartData = (name, Cuisines, amount) => {
    const Restaurant = name.Name;
    const Item = Cuisines.Item;
    const Price = amount.Price;
    console.log('Item:', Item);
    try {
      const key = push(ref(db, '/CartData/')).key;
      const data = {Key: key, Restaurant, Item, Price};
      const updates = {};
      updates['/CartData/' + key] = data;
      update(ref(db), updates);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={restaurant}
          renderItem={({item}) => (
            <SafeAreaView
              style={GlobalStyles.card}
              // onStartShouldSetResponder={() => {
              //   setIsVisible(true);
              //   Alert.alert('added to cart');
              //   CartData(
              //     // {Name: item.Restaurant_Name},
              //     {Item: item.Cuisines},
              //     // {Price: price},
              //   );
              // }}>
            >
              <Image
                source={require('./images/home.jpg')}
                style={GlobalStyles.listImage}
              />
              <Text style={GlobalStyles.name1}>{item.Restaurant_Name}</Text>
              <Text style={GlobalStyles.name}>City : {item.City}</Text>
              <Text style={GlobalStyles.name}>Cuisines : {item.Cuisines}</Text>

              <TouchableOpacity
                style={GlobalStyles.submitButton}
                onPress={() => {
                  setIsVisible(true);

                  {
                    CartData(
                      {Name: item.Restaurant_Name},
                      {Cuisine: item.Cuisines},
                      {Price: price},
                    );
                  }
                }}>
                <Text style={GlobalStyles.buttonText}>Add To Cart</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={GlobalStyles.submitButton}
        onPress={() => {
          setIsVisible(true);

          {
            CartData(
              {Name: item.Restaurant_Name},
              {Cuisine: item.Cuisines},
              {Price: price},
            );
          }
        }}>
        <Text style={GlobalStyles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>

      {isVisible && (
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Text style={GlobalStyles.buttonText}>Go To Cart</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
