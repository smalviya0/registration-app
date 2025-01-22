import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const OTPVerifiedScreen = () => {
  const handleContinue = () => {
    alert('Navigate to App');
  };

  return (
    <View style={styles.container}>
      {/* Illustration Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/otpverified.png')} // Replace with the actual illustration URL or import it locally
          style={styles.image}
        />
      </View>

      {/* Text Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>OTP is verified...</Text>
        <Text style={styles.description}>
          Happy to say everything went smoothly. Start with Tradesmen for a great experience...
        </Text>
        <TouchableOpacity style={styles.linkContainer} onPress={handleContinue}>
          <Text style={styles.linkText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    backgroundColor: '#FFF9E9',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  contentContainer: {
    backgroundColor: '#FFF',
    marginTop: 30,
    padding: 20,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default OTPVerifiedScreen;
