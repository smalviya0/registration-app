import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { ResetPasswordApi } from '../api/ResetPasswordApi';
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
      outputRange: [18, -10],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], 
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

const ResetPassword = (props) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('OTPForgotPasswords');
  };

  const { email, code } = props?.route?.params || {};

  const handleSubmit = async () => {
    if (!password || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== newPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await ResetPasswordApi(email, code, password);
      if (response?.success) {
        Alert.alert('Success', 'Password reset successfully!');
        navigation.navigate('HOME');
      } else {
        Alert.alert('Error', response?.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
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

    
      <Text style={styles.title}>Reset Password?</Text>

     
      <Text style={styles.description}>
      Your new password must be different from previous used password, contain at least 8 letters.
      </Text>

      <FloatingLabelInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <FloatingLabelInput
        label="Confirm Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Confirm</Text>
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
    marginRight: 150
  },
  description: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 20,
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

export default ResetPassword;
