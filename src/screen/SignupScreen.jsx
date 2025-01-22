import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import { RegisterUser } from '../api/RegisterUser';
// checkbox-passive

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value || isFocused ? 1 : 0);

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
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10], // Adjust the label position
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // Adjust the font size
    }),
    color: isFocused ? '#6200EA' : '#757575',
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

const SignupScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();
  
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const isFormValid =
      firstName && lastName && isValidEmail(email) && password && isChecked;
  
    const handleSignup = async () => {
      try {
        const response = await RegisterUser(firstName, lastName, email, password);
        console.log('API Response:', response);
        if (response.success) {
          Alert.alert('Success', 'Account created successfully!');
          navigation.navigate('VerifyCode', { email: email });
        } else {
          Alert.alert('Error', response.message || 'Signup failed');
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', error.message || 'An error occurred');
      }
    };
  
    return (
      <View style={styles.container}>
        {/* Header Image */}
        <View style={styles.header}>
          <Image
            source={require('../assets/Signupimage.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
  
        {/* Form */}
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.formContainer}>
          <FloatingLabelInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FloatingLabelInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <FloatingLabelInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
         <View style={styles.checkboxContainer}>
  <TouchableOpacity
    onPress={() => setIsChecked(!isChecked)}
    style={styles.checkboxTouchable} // Add padding to increase touch area
    accessibilityLabel="Agree to Terms and Conditions"
    accessible={true}
  >
    <Icon
      name={isChecked ? 'checkbox-active' : 'checkbox-passive'}
      size={20}
      color={isChecked ? '#314FA4' : '#757575'} // Use different colors for checked/unchecked
    />
  </TouchableOpacity>
  <Text style={styles.checkboxText}>
    By clicking here you agree to our{' '}
    <Text style={styles.termsText}>Terms & Conditions</Text>
  </Text>
</View>

  
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
  
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  
  

  

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  checkboxTouchable: {
  padding: 5, // Add padding for a better touchable area
  marginRight: 8, // Space between icon and text
},

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBF0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#757575',
    flex: 1, // Ensures checkbox text wraps correctly
  },
  termsText: {
    color: '#6200EA',
    textDecorationLine: 'underline',
  },
  formContainer: {
    flex: 2,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginLeft: 30,
    marginRight: 100,
  },
  inputContainer: {
  marginBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#E0E0E0',
  position: 'relative',
},
input: {
  height: 40,
  fontSize: 16,
  color: '#000',
  paddingHorizontal: 10,
},

  button: {
    backgroundColor: '#314FA4',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
  },
  loginText: {
    color: '#6200EA',
    fontWeight: 'bold',
  },
});
