import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from "./api/axiosInstance.js";
import { Link } from 'expo-router';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    designation: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleSubmit = async () => {
    console.log("formData", formData);
    // const apiUrl = 'https://curiousflip.com/suitecrm/customapi/adduser.php';
    const apiUrl = 'https://curiousflip.com/suitecrm';
    try {
      const response = await axiosInstance.post("/index.php?entryPoint=adduser", formData);
      if(response.status == 200){
        Alert.alert("Success", "User added successfully");
        // Clear the form after successful submission
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          designation: '',
          description: '',
        });
      }else{
        Alert.alert('Error', 'Something went wrong while trying to add user. Please try again.');
      }
      console.log("response: ", response)
      console.log("Server Response:", response.data);
      console.log(response.ok);
      console.log(response.status)
      
    } catch (error) {
      Alert.alert('Error', 'Failed to add user. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="..">
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Add User</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />

        <Text style={styles.label}>Designation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your designation"
          value={formData.designation}
          onChangeText={(text) => handleInputChange('designation', text)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(240, 142, 105, 0.1)',
    borderColor: 'rgba(240, 142, 105, 0.8)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#F08E69',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileForm;
