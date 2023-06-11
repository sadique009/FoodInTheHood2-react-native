import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {Stylesheet} from 'react-native';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/config';
import {GlobalStyles} from '../../GlobalStyles';

export const SettingScreen = ({navigation, email}) => {
  const signout = () => {
    // mref.child(FirebaseAuth.getInstance().currentUser.uid).remove();
    signOut(auth)
      .then(() => {
        navigation.replace('Login Page');
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };
  return (
    <View style={GlobalStyles.main}>
      <Image
        source={require('./images/profile_pic.jpg')}
        style={GlobalStyles.profileImage}
      />
      <Text style={GlobalStyles.name1}>Your Profile</Text>
      <View style={GlobalStyles.desc}>
        <Text style={GlobalStyles.name}>Name : Annonymous</Text>
        <Text style={GlobalStyles.name}>E-mail id : msn@gmail.com {email}</Text>
        <Text style={GlobalStyles.name}>Address : xyz street</Text>
      </View>

      <TouchableOpacity
        style={GlobalStyles.submitButton}
        onPress={() => signout()}>
        <Text style={GlobalStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
