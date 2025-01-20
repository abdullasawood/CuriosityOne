import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from "./api/axiosInstance.js";
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; // Import Picker for the dropdown

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    locationgroup: '',
  });
  const [locationGroups, setLocationGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Fetch location groups from API
  useEffect(() => {
    const fetchLocationGroups = async () => {
      try {
        const response = await axiosInstance.get("/customapi/getlocationgroup.php");
        console.log(response)
        if (response.status === 200) {
          setLocationGroups(response.data); // Assume the API returns an array of location groups
        } else {
          Alert.alert('Error', 'Failed to fetch location groups.');
        }
      } catch (error) {
        console.error('Error fetching location groups:', error);
        Alert.alert('Error', 'Failed to fetch location groups.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationGroups();
  }, []);

  const handleSubmit = async () => {
    console.log("formData", formData);
    try {
      const response = await axiosInstance.post("/customapi/addlocation.php", formData);
      if (response.status === 200) {
        Alert.alert("Success", "User added successfully");
        setFormData({
          location: '',
          locationgroup: '',
        });
      } else {
        Alert.alert('Error', 'Something went wrong while trying to add user. Please try again.');
      }
      console.log("response: ", response);
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
        <Text style={styles.headerTitle}>Add Location</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />

        <Text style={styles.label}>Location Group</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#F08E69" />
        ) : (
          <Picker
            selectedValue={formData.locationgroup}
            onValueChange={(itemValue) => handleInputChange('locationgroup', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a Location Group" value="" />
            {locationGroups.map((group) => (
              <Picker.Item key={group.id} label={group.name} value={group.id} />
            ))}
          </Picker>
        )}

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
  picker: {
    backgroundColor: 'rgba(240, 142, 105, 0.1)',
    borderColor: 'rgba(240, 142, 105, 0.8)',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    height: 40,
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
