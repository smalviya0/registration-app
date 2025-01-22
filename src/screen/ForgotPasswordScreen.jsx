import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { ForgotPasswordAnotherApi } from '../api/ForgotPasswordAnotherApi';
import { useNavigation } from '@react-navigation/native';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 15,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10], // Adjust label position
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // Adjust font size
    }),
    color: isFocused ? '#6200EA' : '#757575',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleSubmit = async () => {
      try {
        navigation.navigate('OTPForgotPasswords',{email: email } );
        const response = await ForgotPasswordAnotherApi(email);
        console.log('API Response:', response);
        if (response.success) {
          Alert.alert('Success', 'Account created successfully!');
        } else {
          Alert.alert('Error', response.message || 'Signup failed');
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', error);
      }
    };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleLogin}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Forgotpassword.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Forgot Password?</Text>

      {/* Description */}
      <Text style={styles.description}>
        Enter your registered email ID, we will share a verification code.
      </Text>

      {/* Email Input */}
      <FloatingLabelInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 30,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 22,
    color: '#000',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    height: 50,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3949AB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
