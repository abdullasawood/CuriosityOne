import React, { useState } from "react";
import { useRootNavigationState, Redirect, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'


const LoginScreen = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const login = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("uname", username.trim());
      urlencoded.append("pwd", pwd.trim());

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded.toString(), // Properly serialize the body
        redirect: "follow",
      };

      const response = await fetch("https://curiousflip.com/suitecrm/customapi/login.php", requestOptions);
      const data = await response.json();

      if (data.status === "success") {
        console.log("setting homepage" + data);
        await AsyncStorage.setItem("homePage", JSON.stringify(data));
        setShouldRedirect(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // if (shouldRedirect) {
  //   return <Redirect href={'/'} />;
  // }

  const [activeTab, setActiveTab] = useState("Email");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    // <LinearGradient
    //   colors={["#d8eefe", "#fbc2eb"]}
    //   style={styles.container}
    // >
    <View style={[styles.container, { backgroundColor: '#d8eefe' }]}>
    {shouldRedirect && <Redirect href={'/'} />}
      <View style={styles.header}>
        <Text style={styles.title}>Login Account</Text>
        <Text style={styles.welcomeText}>Hi, welcome to ..........</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Email" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Email")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Email" && styles.activeTabText,
            ]}
          >
            Username and Password
          </Text>
           
        </TouchableOpacity>
        {/*<TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Phone Number" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Phone Number")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Phone Number" && styles.activeTabText,
            ]}
          >
            Phone Number
          </Text>
        </TouchableOpacity>*/}
      </View>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={
          activeTab === "Email"
            ? "Enter Email"
            : "Enter Phone Number"
        }
        keyboardType={
          activeTab === "Phone Number" ? "phone-pad" : "default"
        }
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input, styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible}
          value={pwd}
          onChangeText={setPwd}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Request OTP Button */}
      <TouchableOpacity style={styles.requestOtpButton} onPress={login}>
        <Text style={styles.requestOtpText}>Submit</Text>
      </TouchableOpacity>


      {/* Or Sign In with Google */}
      {/*<View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or sign in with Google</Text>
        <View style={styles.line} />
      </View>*/}

      {/* Google Button */}
      {/*<TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>*/}

      {/* Footer */}
      {/*<Text style={styles.footerText}>
        Not yet registered?{" "}
        <Text style={styles.createAccount}>Create an account</Text>
      </Text>*/}
    {/*</LinearGradient>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  welcomeText: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tab: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
  },
  activeTab: {
    backgroundColor: "#FFA07A",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordInput: {
    width:290,
    height: 50,
  },
  requestOtpButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  requestOtpText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#000",
    fontSize: 14,
  },
  googleButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    color: "#000",
  },
  createAccount: {
    color: "#4682B4",
    fontWeight: "bold",
  },
  iconContainer: {
    padding: 5,
  },
});

export default LoginScreen;
