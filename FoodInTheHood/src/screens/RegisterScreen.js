import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/config';
import {GlobalStyles} from '../../GlobalStyles';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userdata => {
        Alert.alert('Success', 'You are now registered.');
        navigation.replace('Login Page');
      })
      .catch(error => {

        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };
  return (
    <View style={GlobalStyles.main}>
      <Text style={GlobalStyles.heading}>Register</Text>
      <View>
        <TextInput
          style={GlobalStyles.inputField}
          value={email}
          placeholder="Email Address"
          onChangeText={Email => setEmail(Email)}
        />
        <TextInput
          style={GlobalStyles.inputField}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={Password => setPassword(Password)}
        />
        <TouchableOpacity
          style={GlobalStyles.submitButton}
          onPress={handleSubmit}>
          <Text style={GlobalStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={GlobalStyles.bottomText}>Already have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login Page')}>
          <Text style={GlobalStyles.bottomText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
