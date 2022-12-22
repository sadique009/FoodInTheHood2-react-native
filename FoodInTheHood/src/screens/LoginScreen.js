import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Stylesheet,
  TextInput,
  Alert,
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/config';
import {GlobalStyles} from '../../GlobalStyles';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userdata => {
        // const user = userdata.user;

        navigation.replace('Main Page');
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };
  return (
    <View style={GlobalStyles.main}>
      <Text style={GlobalStyles.heading}>Login</Text>
      <View>
        <TextInput
          style={GlobalStyles.inputField}
          value={email}
          placeholder="Email Address"
          activeUnderlineColor="green"
          onChangeText={Email => setEmail(Email)}
          mode="flat"
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
          <Text style={GlobalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register Page')}>
          <Text style={GlobalStyles.bottomText}>
            Don't have account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
