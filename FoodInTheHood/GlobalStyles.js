import React from 'react';
import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {fontWeight: 'bold', fontSize: 24, color: '#282A3A', padding: 8},
  inputField: {
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid',
    width: 350,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  desc: {
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    margin: 25,
  },

  name1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 4,
  },
  splashImage: {
    width: 400,
    height: 500,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
  text1: {
    color: 'black',
    // alignSelf: 'center',
    textAlign: 'center',
  },
  listImage: {
    width: 400,
    height: 200,
    alignSelf: 'center',
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
    margin: 45,
    padding: 20,
  },
  submitButton: {
    margin: 8,
    backgroundColor: 'black',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 14,
    borderRadius: 10,
    width: 250,
    elevation: 6,
  },
  bottomText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Searchbar: {
    alignSelf: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'gray',
    width: 450,
    borderRadius: 10,
    marginTop: 60,
    padding: 10,
    marginBottom: 30,
  },
  card: {
    // borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    margin: 12,
    backgroundColor: 'white',
    elevation: 15,
  },
  buttonText: {fontWeight: 'bold', fontSize: 18, color: 'white'},
});
export {GlobalStyles};
