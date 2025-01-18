import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from "./api/axiosInstance.js";
import { Link } from 'expo-router';

const CreateOrderScreen = () => {
  const [formData, setFormData] = useState({
    partyName: '',
    itemName: '',
    quantity: '',
    partyName: '',
    selectedProcess: '',
    description: '',
    dateofcom: '',
    priority: '',
  });
  const [processList, setProcessList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = async (field, value) => {
    if(field=='selectedProcess'){
      try{
        const response = await axiosInstance.get("/customapi/itemlist.php?name="+value);
        console.log(response)
        if(response.status == 200){
          const result = await response.data;
          setItemList(result.data);
          setLoading(false);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
        Alert.alert('Error', `Failed to fetch locations: ${err.message}`);
      }
    }
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  
  useEffect(() => {
    // Fetch all locations
    const fetchProcess = async () => {
      try {
        console.log("sawood");
        const response = await axiosInstance.get("/customapi/processlist.php");
        console.log(response);
        if(response.status == 200){
          const result = await response.data;
          if (result.status === "success") {
            setProcessList(result.data);
            setLoading(false);
          } else {
            throw new Error(result.message);
          }
        }else{
          Alert.alert('Error', 'Something went wrong. Please check your network try again.');
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
        Alert.alert('Error', `Failed to fetch locations: ${err.message}`);
      }
    };

    fetchProcess();
  }, []);

  const handleSubmit = async () => {
    console.log("formData", formData);
    try {
      const response = await axiosInstance.post("/customapi/addorder.php", formData);
      if (response.status === 200) {
        Alert.alert("Success", "User added successfully");
        setFormData({
          partyName: '',
          itemName: '',
          quantity: '',
          partyName: '',
          selectedProcess: '',
          description: '',
          dateofcom: '',
          priority: '',
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
      {/* Header */}
      <View style={styles.header}>
        <Link href="..">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        </Link>
        <Text style={styles.headerText}>Create Order</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Input Fields */}
      <Text style={styles.label}>Party name</Text>
      <TextInput
        style={styles.input}
        value={formData.partyName}
        onChangeText={(text) => handleInputChange('partyName', text)}
      />

      <Text style={styles.label}>Item name</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={formData.itemName}
          onValueChange={(itemValue) => handleInputChange('itemName', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Item" value="" />
          {itemList.map((group) => (
            <Picker.Item key={group.name} label={group.name} value={group.name} />
          ))}
        </Picker>
      </View>
      {/*<TextInput
        style={styles.input}
        value={formData.itemName}
        onChangeText={(text) => handleInputChange('itemName', text)}
      />*/}

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={formData.quantity}
        onChangeText={(text) => handleInputChange('quantity', text)}
        keyboardType="numeric" 
        maxLength={10}
      />

      <Text style={styles.label}>Select Process</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={formData.selectedProcess}
          onValueChange={(itemValue) => handleInputChange('selectedProcess', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Process" value="" />
          {processList.map((group) => (
            <Picker.Item key={group.id} label={group.name} value={group.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        multiline
        value={formData.description}
        onChangeText={(text) => handleInputChange('description', text)}
        placeholder="Write a description."
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Date of completion</Text>
      <TextInput
        style={styles.input}
        value={formData.dateofcom}
        onChangeText={(text) => handleInputChange('dateofcom', text)}
      />

      <Text style={styles.label}>Priority</Text>
      <TextInput
        style={styles.input}
        value={formData.priority}
        onChangeText={(text) => handleInputChange('priority', text)}
      />

      {/* Add Order Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#F08E69',
    backgroundColor: '#F6EFE9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000',
    marginBottom: 15,
  },
  dropdownContainer: {
    height: 40,
    borderColor: '#F08E69',
    backgroundColor: '#F6EFE9',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 15,
  },
  picker: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#F08E69',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default CreateOrderScreen;
