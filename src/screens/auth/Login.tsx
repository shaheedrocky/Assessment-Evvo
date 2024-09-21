import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/common/Layout';
import {LogoURL} from '../../components/utils';
import CustomInput from '../../components/common/CustomInput';
import Spacer from '../../components/common/Spacer';
import axios from 'axios';
import { store } from '../../store/store';
import { setUser } from '../../store/Slice/UserSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({email: '', password: ''});

  const handleLogin = () => {
    let hasError = false;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Clear previous errors before new checks
    setError({email: '', password: ''});

    // Check email and password fields together
    if (!email || !password) {
      setError({
        email: !email ? 'Please fill email field' : '',
        password: !password ? 'Please fill password field' : '',
      });
      hasError = true;
    } else {
      // Validate email format
      if (!emailRegex.test(email)) {
        setError(prev => ({...prev, email: 'Invalid email format'}));
        hasError = true;
      }
      // Validate password length
      if (password.length < 8) {
        setError(prev => ({
          ...prev,
          password: 'Password too short, must be at least 8 characters',
        }));
        hasError = true;
      }
    }

    if (!hasError) {
      LoginApi();
    }
  };

  const LoginApi = async () => {
    try {
      const {data} = await axios.post(
        'http://yrg-198744627.ap-south-1.elb.amazonaws.com/api/login-api/',
        {
          email: email,
          password: password,
        },
      );
      store.dispatch(setUser(data))
      console.log('Response: ' + JSON.stringify(data));
    } catch (error) {
      console.log('Error from Login: ', error);
    }
  };

  return (
    <Layout>
      <Image source={{uri: LogoURL}} className="h-24 w-24 object-cover" />
      <Text className="text-black font-bold text-3xl mt-4">Welcome!</Text>
      <Text className="text-black font-bold text-3xl">
        Login with your account.
      </Text>
      <Text className="text-[#b1b1b1] font-normal text-lg mt-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing eli, sed do
      </Text>

      <Spacer height={30} />
      <CustomInput
        placeholder="Enter your email ID"
        onChangeText={val => setEmail(val)}
        value={email}
        error={error.email}
      />
      <Spacer height={20} />

      <CustomInput
        placeholder="Enter your Password"
        onChangeText={val => setPassword(val)}
        value={password}
        error={error.password}
      />

      <Text className="text-black font-semibold my-4 text-[15px]">
        Forgot Password?
      </Text>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#b1b1b1]/60 p-4 rounded">
        <Text className="text-gray-500 font-semibold text-lg">Login</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default Login;
