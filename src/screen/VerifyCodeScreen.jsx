import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { VerifyOtp } from "../api/VerifyOtp";
import { useNavigation } from '@react-navigation/native';

const VerifyCodeScreen = (props) => {
  const navigation = useNavigation();
  let { email } = props.route.params;

  const [timer, setTimer] = useState(153); // Timer in seconds (e.g., 2:33 = 153 seconds)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start the countdown when the component is mounted
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown); // Stop the countdown when the timer reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Clean up interval on component unmount
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically focus the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const isButtonDisabled = otp.some(digit => digit === ""); // Check if any field is empty

  const ResendApiCall = async () => {
    const code = otp.join("");
    try {
      const response = await ResendApi(email);
      if (response.success) {
        setMessage("Code resent successfully! Please check your inbox.");
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyNo = async () => {
    const code = otp.join("");
    try {
      const response = await VerifyOtp(email, code);
      if (response.success) {
        navigation.navigate("OTPVerified");
      } else {
        navigation.navigate("ErrorScreens");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Image
          source={require("../assets/OTPImage.png")}
          style={styles.image}
        />
      </View>
      <View style={{ padding: 25 }}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.description}>
          Check your Email Inbox we have sent you the code at john******om
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
            />
          ))}
        </View>
        <Text style={styles.timer}>({formatTime(timer)})</Text>
        <TouchableOpacity>
          <Text style={styles.resendTexts}>
            Did not receive the code?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ResendApiCall} >
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.verifyButton, { backgroundColor: isButtonDisabled ? "#ccc" : "#314FA4" }]} // Button color changes
          onPress={handleVerifyNo}
          disabled={isButtonDisabled} // Disable button when not all OTP fields are filled
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  illustration: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginLeft: 5,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 18,
    width: 50,
    height: 50,
  },
  timer: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
  },
  resendTexts: {
    fontSize: 16,
    color: "#454545",
    marginBottom: 15,
  },
  resendText: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 15,
  },
  verifyButton: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    padding: 7,
  },
});

export default VerifyCodeScreen;
