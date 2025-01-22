import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import SignupScreen from './src/screen/SignupScreen';
import VerifyCodeScreen from './src/screen/VerifyCodeScreen';
import LoginScreen from './src/screen/LoginScreen';
import OTPVerifiedScreen from './src/screen/OTPVerifiedScreen';
import ErrorScreen from './src/screen/ErrorScreen';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';
import OTPForgotPassword from './src/screen/OTPForgotPassword';
import ResetPassword from './src/screen/ResetPassword';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
          headerShown: false
      }}>
      <Stack.Screen name={"HOME"} component={HomeScreen} />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"SIGNUP"} component={SignupScreen} />
      <Stack.Screen name={"VerifyCode"} component={VerifyCodeScreen} />
      <Stack.Screen name={"OTPVerified"} component={OTPVerifiedScreen} />
      <Stack.Screen name={"ErrorScreens"} component={ErrorScreen} />
      <Stack.Screen name={"ForgotPassword"} component={ForgotPasswordScreen} />
      <Stack.Screen name={"OTPForgotPasswords"} component={OTPForgotPassword} />
      <Stack.Screen name={"ResetPasswords"} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})