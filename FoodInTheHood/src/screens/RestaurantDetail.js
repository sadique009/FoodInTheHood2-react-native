import React, {useState, useEffect} from 'react';
import {Text, FlatList, Image} from 'react-native';

import {SafeAreaView} from 'react-native';
import {GlobalStyles} from '../../GlobalStyles';
import {db} from '../firebase/config';
import {ref, push, update} from 'firebase/database';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

export const RestaurantDetail = ({route, navigation}) => {
  const {id} = route.params;

  const [restaurant, setRestaurant] = useState([]);

  const [showButton, setShowButton] = useState(false);

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

  const CartData = Cuisines => {
    const Item = Cuisines.Item;

    console.log('Item:', Item);
    try {
      const key = push(ref(db, '/CartData/')).key;
      const data = {Key: key, Item};
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
            <SafeAreaView style={GlobalStyles.card}>
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
                  setShowButton(true);

                  {
                    CartData({Item: item.Cuisines});
                  }
                }}>
                <Text style={GlobalStyles.buttonText}>Add To Cart</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        />
      </SafeAreaView>

      {showButton && (
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
