import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ErrorScreen = () => {
  const handleRetry = () => {
    console.log('Retrying...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/noverfiedotp.png')}
          style={styles.image}
         resizeMode="contain"
        />
      </View>

      {/* Text Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Something went wrong!</Text>
        <Text style={styles.description}>
          Taking too much time, Please check your internet connection.
        </Text>
        <TouchableOpacity onPress={handleRetry}>
          <Text style={styles.linkText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  contentContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default ErrorScreen;
