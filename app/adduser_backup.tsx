import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileForm = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add User</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Enter your address" />

        <Text style={styles.label}>Phone number</Text>
        <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Enter your username" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />

        <Text style={styles.label}>Designation</Text>
        <TextInput style={styles.input} placeholder="Enter your designation" />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton}>
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
