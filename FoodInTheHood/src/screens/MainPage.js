import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, Image, Button} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles} from '../../GlobalStyles';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MainPage({navigation}) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData('https://api.npoint.io/c1336d3f8d08ae53247f');
    // .then(res => res.json())
    // .then(data => setRestaurantList(data));
  }, []);

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setRestaurantList(json);
      setFilteredList(json);
    } catch (err) {
      console.log(err);
    }
  };

  // const locationFilter = () => {
  //   const result = restaurantList.filter(item => {
  //     return item.City.toLowerCase().includes(restaurantList.toLowerCase());
  //   });
  //   setFilteredList(result);
  // };

  const filterFunction = text => {
    if (text) {
      const newData = restaurantList.filter(item => {
        const itemData = item.City ? item.City.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredList(newData);
      setSearch(text);
    } else {
      setFilteredList(restaurantList);
      setSearch(text);
    }
  };

  // let id;
  // const selectedRestaurant = id => {
  //   Alert.alert('Id:', id);
  // };

  return (
    <>
      <View style={GlobalStyles.main}>
        <TextInput
          multiline
          value={restaurantList}
          placeholder="Search Restaurant by City"
          style={GlobalStyles.Searchbar}
          onChangeText={loc => filterFunction(loc)}
        />

        <View style={GlobalStyles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings-applications" size={60} color="black" />
            <Text style={GlobalStyles.text1}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Icon name="map" size={60} color="black" />
            <Text style={GlobalStyles.text1}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={60} color="black" />
            <Text style={GlobalStyles.text1}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Order History')}>
            <Icon name="history" size={60} color="black" />
            <Text style={GlobalStyles.text1}>Orders</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredList}
          renderItem={({item}) => (
            <View style={GlobalStyles.card}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Restaurant Detail Page', {
                    id: item.Restaurant_ID,
                  })
                }>
                <Image
                  source={require('./images/home.jpg')}
                  style={GlobalStyles.listImage}
                />
                <View>
                  <Text style={GlobalStyles.name1}>{item.Restaurant_Name}</Text>
                  <Text style={GlobalStyles.name}>City : {item.City}</Text>
                  <Text style={GlobalStyles.name}>
                    Rating : ({item.Aggregate_rating})
                  </Text>
                  <Text style={GlobalStyles.name}>
                    Cuisines : {item.Cuisines}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
}
