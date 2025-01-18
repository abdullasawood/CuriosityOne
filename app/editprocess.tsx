import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditProcessScreen = () => {
  const [processName, setProcessName] = useState('');
  const processSteps = [
    'Choose the Paper',
    'Design the Initials/Logo/Details',
    'Send the Design to a Printer',
    'Pick Up Your Printed Paper',
    'Send to fold the Paper Into an Envelope',
    'Send the Envelopes to customers',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Process</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Process</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#F08E69"
          value={processName}
          onChangeText={(text) => setProcessName(text)}
        />
      </View>

      {/* Process Steps */}
      <FlatList
        data={processSteps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stepContainer}>
            <Ionicons name="swap-vertical" size={18} color="#333" style={styles.icon} />
            <Text style={styles.stepText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.stepsList}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#F08E69" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="cart-outline" size={24} color="#F08E69" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={24} color="#F08E69" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="document-text-outline" size={24} color="#F08E69" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#F08E69',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#333',
  },
  stepsList: {
    paddingBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#F4F4F4',
  },
  navButton: {
    alignItems: 'center',
  },
});

export default EditProcessScreen;
